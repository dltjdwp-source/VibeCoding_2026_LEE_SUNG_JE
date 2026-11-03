(function () {
  "use strict";

  var toggle = document.getElementById("scroll-motion-toggle");
  var root = document.documentElement;
  var nativeScrollTo = window.scrollTo.bind(window);
  var nativeScrollBy = window.scrollBy.bind(window);
  var reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );
  var targetY = window.scrollY;
  var frame = 0;
  var previousTime = 0;

  function isEnabled() {
    return !toggle.checked && !reducedMotion.matches;
  }

  function maxScrollY() {
    return Math.max(0, root.scrollHeight - window.innerHeight);
  }

  function stopAnimation() {
    if (frame) window.cancelAnimationFrame(frame);
    frame = 0;
    previousTime = 0;
    targetY = window.scrollY;
  }

  function animateFrame(time) {
    frame = 0;
    if (!isEnabled()) {
      targetY = window.scrollY;
      return;
    }

    targetY = Math.max(0, Math.min(targetY, maxScrollY()));
    var elapsed = previousTime ? Math.min((time - previousTime) / 1000, 0.1) : 0;
    previousTime = time;
    var currentY = window.scrollY;
    var distance = targetY - currentY;
    var nextY =
      Math.abs(distance) < 0.5
        ? targetY
        : currentY + distance * (1 - Math.exp(-10 * elapsed));

    nativeScrollTo(window.scrollX, nextY);
    if (Math.abs(targetY - nextY) >= 0.5) {
      frame = window.requestAnimationFrame(animateFrame);
    } else {
      previousTime = 0;
    }
  }

  function scrollToY(y) {
    if (!Number.isFinite(y)) return;
    var nextY = Math.max(0, Math.min(y, maxScrollY()));
    if (!isEnabled()) {
      stopAnimation();
      nativeScrollTo(window.scrollX, nextY);
      return;
    }
    targetY = nextY;
    if (!frame) frame = window.requestAnimationFrame(animateFrame);
  }

  function canScrollInside(target, deltaY) {
    var node =
      target && target.nodeType === 1 ? target : target && target.parentElement;
    while (node && node !== document.body && node !== root) {
      var style = window.getComputedStyle(node);
      var overflowY = style.overflowY;
      if (
        (overflowY === "auto" ||
          overflowY === "scroll" ||
          overflowY === "overlay") &&
        node.scrollHeight > node.clientHeight
      ) {
        var maxY = node.scrollHeight - node.clientHeight;
        if (
          (deltaY < 0 && node.scrollTop > 0) ||
          (deltaY > 0 && node.scrollTop < maxY)
        ) {
          return true;
        }
      }
      node = node.parentElement;
    }
    return false;
  }

  function onWheel(event) {
    if (
      !isEnabled() ||
      root.classList.contains("is-menu-open") ||
      event.ctrlKey ||
      Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
      !event.deltaY ||
      canScrollInside(event.target, event.deltaY)
    ) {
      return;
    }

    var multiplier =
      event.deltaMode === 1
        ? 16
        : event.deltaMode === 2
          ? window.innerHeight
          : 1;
    var currentTarget = frame ? targetY : window.scrollY;
    var nextY = Math.max(
      0,
      Math.min(currentTarget + event.deltaY * multiplier, maxScrollY()),
    );
    if (nextY === currentTarget) return;

    event.preventDefault();
    scrollToY(nextY);
  }

  function isEditable(target) {
    return (
      target.isContentEditable ||
      /^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test(target.tagName)
    );
  }

  function onKeydown(event) {
    if (
      !isEnabled() ||
      root.classList.contains("is-menu-open") ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      isEditable(event.target) ||
      canScrollInside(
        event.target,
        event.key === "ArrowUp" || event.key === "PageUp" ? -1 : 1,
      )
    ) {
      return;
    }

    var step = Math.max(80, window.innerHeight * 0.8);
    var currentTarget = frame ? targetY : window.scrollY;
    var nextY;
    switch (event.key) {
      case "ArrowDown":
        nextY = currentTarget + 60;
        break;
      case "ArrowUp":
        nextY = currentTarget - 60;
        break;
      case "PageDown":
        nextY = currentTarget + step;
        break;
      case "PageUp":
        nextY = currentTarget - step;
        break;
      case " ":
        nextY = currentTarget + (event.shiftKey ? -step : step);
        break;
      case "Home":
        nextY = 0;
        break;
      case "End":
        nextY = maxScrollY();
        break;
      default:
        return;
    }
    event.preventDefault();
    scrollToY(nextY);
  }

  function onAnchorClick(event) {
    if (
      !isEnabled() ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    var link = event.target.closest("a[href]");
    if (!link || link.target || link.hasAttribute("download")) return;

    var href = link.getAttribute("href");
    var destination;
    try {
      destination = new URL(href, window.location.href);
    } catch (error) {
      return;
    }
    if (
      destination.origin !== window.location.origin ||
      destination.pathname !== window.location.pathname ||
      destination.search !== window.location.search
    ) {
      return;
    }

    var target = destination.hash
      ? document.getElementById(
          decodeURIComponent(destination.hash.slice(1)),
        )
      : null;
    if (destination.hash && !target) return;

    event.preventDefault();
    if (destination.href !== window.location.href) {
      window.history.pushState(null, "", destination.href);
    }
    scrollToY(
      target
        ? target.getBoundingClientRect().top + window.scrollY
        : 0,
    );
  }

  window.scrollTo = function (xOrOptions, y) {
    var top =
      typeof xOrOptions === "object" && xOrOptions !== null
        ? xOrOptions.top
        : y;
    if (typeof top !== "number") {
      nativeScrollTo(xOrOptions, y);
      return;
    }
    scrollToY(top);
  };
  window.scrollBy = function (xOrOptions, y) {
    var delta =
      typeof xOrOptions === "object" && xOrOptions !== null
        ? xOrOptions.top
        : y;
    if (typeof delta !== "number") {
      nativeScrollBy(xOrOptions, y);
      return;
    }
    scrollToY((frame ? targetY : window.scrollY) + delta);
  };

  document.addEventListener("wheel", onWheel, { passive: false });
  document.addEventListener("keydown", onKeydown);
  document.addEventListener("click", onAnchorClick);
  toggle.addEventListener("change", stopAnimation);
  reducedMotion.addEventListener("change", stopAnimation);
  window.addEventListener("resize", function () {
    targetY = Math.min(targetY, maxScrollY());
  });
})();
