(function () {
  "use strict";

  var main = document.querySelector("main");
  if (!main) return;

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );
  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    return;
  }

  var revealSelector = [
    ".mirae__title",
    ".history__title",
    ".history__row",
    ".con3__title",
    ".con3__card",
    ".con4__title",
    ".con4__bubble",
    ".con4__note",
    ".con5__title",
    ".con5__sub",
    ".con5__lead",
    ".con5__card",
    ".tasks__title",
    ".tasks__description",
    ".tasks__tabs-wrap",
    ".tasks__group-trigger",
    ".tasks__card",
    ".requirement__title",
    ".requirement__item",
    ".requirement__condition-list li",
    ".requirement__notice",
    ".requirement__track-title",
    ".requirement__step",
    ".exposition__intro",
    ".exposition__date-cell",
    ".con8__card",
    ".con9__title",
    ".con9__timer",
    ".con9__earth-link",
    ".con9__note",
  ].join(", ");
  var observedItems = new WeakSet();

  var observer = new IntersectionObserver(
    function (entries) {
      for (var k = 0; k < entries.length; k++) {
        entries[k].target.classList.toggle(
          "is-revealed",
          entries[k].isIntersecting,
        );
      }
    },
    { rootMargin: "-5% 0px -5% 0px", threshold: 0.05 },
  );

  function observeRevealItem(item) {
    if (observedItems.has(item)) return;
    observedItems.add(item);
    item.classList.add("scroll-reveal-item");
    observer.observe(item);
  }

  function observeAddedNodes(nodes) {
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (node.nodeType !== 1) continue;
      if (node.matches(revealSelector)) observeRevealItem(node);
      var descendants = node.querySelectorAll(revealSelector);
      for (var j = 0; j < descendants.length; j++) {
        observeRevealItem(descendants[j]);
      }
    }
  }

  observeAddedNodes([main]);

  var dynamicContainers = main.querySelectorAll(
    ".con5__list, #tasks-groups, .exposition__schedule",
  );
  var contentObserver = new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
      observeAddedNodes(mutations[i].addedNodes);
    }
  });
  for (var k = 0; k < dynamicContainers.length; k++) {
    contentObserver.observe(dynamicContainers[k], {
      childList: true,
      subtree: true,
    });
  }
})();

(function () {
  "use strict";

  var header = document.querySelector("header");
  if (!header) return;

  var lastScrollY = Math.max(0, window.pageYOffset);
  var ticking = false;

  function updateHeaderOnScroll() {
    var currentScrollY = Math.max(0, window.pageYOffset);

    if (document.documentElement.classList.contains("is-menu-open")) {
      header.classList.remove("is-hidden");
      header.classList.add("is-visible");
      lastScrollY = currentScrollY;
      ticking = false;
      return;
    }

    var difference = currentScrollY - lastScrollY;
    if (Math.abs(difference) >= 4) {
      if (currentScrollY <= 8) {
        header.classList.remove("is-hidden", "is-visible");
      } else if (difference > 0) {
        if (currentScrollY > header.offsetHeight) {
          header.classList.add("is-hidden");
        }
      } else {
        header.classList.remove("is-hidden");
        header.classList.add("is-visible");
      }
      lastScrollY = currentScrollY;
    }

    ticking = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateHeaderOnScroll);
    },
    { passive: true },
  );
})();

(function () {
  "use strict";

  // 아래로 스크롤 버튼: 메인 비주얼 높이만큼 부드럽게 이동
  var scrollBtn = document.querySelector(".mv__scroll");
  var mv = document.querySelector(".mv");
  if (scrollBtn && mv) {
    scrollBtn.addEventListener("click", function () {
      window.scrollTo({ top: mv.offsetHeight, behavior: "smooth" });
    });
  }
})();

(function () {
  "use strict";

  var tabs = document.querySelectorAll(".requirement__tab");
  if (!tabs.length) return;

  function activateTab(tab, moveFocus) {
    for (var i = 0; i < tabs.length; i++) {
      var selected = tabs[i] === tab;
      tabs[i].setAttribute("aria-selected", selected ? "true" : "false");
      tabs[i].tabIndex = selected ? 0 : -1;

      var panel = document.getElementById(
        tabs[i].getAttribute("aria-controls"),
      );
      if (panel) panel.hidden = !selected;
    }

    if (moveFocus) tab.focus();
  }

  for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function () {
      activateTab(this, false);
    });
    tabs[i].addEventListener("keydown", function (event) {
      var nextIndex = Array.prototype.indexOf.call(tabs, this);
      if (event.key === "ArrowRight") nextIndex = (nextIndex + 1) % tabs.length;
      else if (event.key === "ArrowLeft")
        nextIndex = (nextIndex - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") nextIndex = 0;
      else if (event.key === "End") nextIndex = tabs.length - 1;
      else return;

      event.preventDefault();
      activateTab(tabs[nextIndex], true);
    });
  }
})();


(function () {
  "use strict";

  var section = document.getElementById("history");
  var content = document.getElementById("history-content");
  if (!section || !content) return;

  var wrap = section.querySelector(".history__toggle");
  var btn = section.querySelector(".history__fold");
  var label = section.querySelector(".history__fold-text");
  if (!wrap || !btn || !label) return;

  var reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
  var busy = false;

  function isCollapsed() {
    return section.classList.contains("is-collapsed");
  }

  // CSS 의 --fold-h(100vh)를 px 로 환산 (CSS 와 값이 어긋나지 않도록 임시 요소로 측정)
  function foldHeight() {
    var probe = document.createElement("div");
    probe.style.cssText =
      "position:absolute;visibility:hidden;pointer-events:none;width:0;height:var(--fold-h)";
    section.appendChild(probe);
    var h = probe.offsetHeight;
    section.removeChild(probe);
    return h;
  }

  function setState(collapsed) {
    section.classList.toggle("is-collapsed", collapsed);
    btn.setAttribute("aria-expanded", collapsed ? "false" : "true");
    label.textContent = collapsed ? "펼치기" : "접기";
  }

  // from → to 높이 애니메이션 (끝나면 인라인 max-height 제거 → CSS 상태값으로 복귀)
  function animate(from, to, collapsed) {
    var finished = false;
    busy = true;
    content.style.maxHeight = from + "px";
    section.classList.add("is-animating");
    void content.offsetHeight; // reflow
    setState(collapsed);
    content.style.maxHeight = to + "px";

    function finish() {
      if (finished) return;
      finished = true;
      content.removeEventListener("transitionend", onEnd);
      content.style.maxHeight = "";
      section.classList.remove("is-animating");
      busy = false;
    }
    function onEnd(e) {
      if (e.target === content && e.propertyName === "max-height")
        finish();
    }
    content.addEventListener("transitionend", onEnd);
    if (reduceMq.matches || from === to) finish();
    else setTimeout(finish, 900); // transitionend 누락 대비
  }

  function expand() {
    var imgs = content.querySelectorAll('img[loading="lazy"]');
    for (var i = 0; i < imgs.length; i++) imgs[i].loading = "eager";
    animate(content.offsetHeight, content.scrollHeight, false);
  }

  function collapse() {
    animate(content.offsetHeight, foldHeight(), true);
    var top = section.getBoundingClientRect().top; // 접은 뒤 섹션 상단이 화면 위로 벗어나 있으면 되돌려 줌
    if (top < 0) {
      window.scrollTo({
        top: top + window.pageYOffset,
        behavior: reduceMq.matches ? "auto" : "smooth",
      });
    }
  }

  btn.addEventListener("click", function () {
    if (busy) return;
    if (isCollapsed()) expand();
    else collapse();
  });

  // 초기 상태 : 접힘
  setState(true);
  wrap.hidden = false;
})();


(function () {
  "use strict";

  var toggleBtn = document.querySelector(".hamburger");
  var menu = document.getElementById("mobile-menu");
  if (!toggleBtn || !menu) return;

  var panel = menu.querySelector(".mnav__panel");
  var closeBtn = menu.querySelector(".mnav__close");
  var overlay = menu.querySelector(".mnav__overlay");
  var backgrounds = document.querySelectorAll("header, main, footer");
  var mq = window.matchMedia("(max-width: 767px)");
  var root = document.documentElement;

  function isOpen() {
    return menu.classList.contains("is-open");
  }

  function setBackgroundInert(on) {
    for (var i = 0; i < backgrounds.length; i++) {
      if (on) backgrounds[i].setAttribute("inert", "");
      else backgrounds[i].removeAttribute("inert");
    }
  }

  function openMenu() {
    if (isOpen() || !mq.matches) return;
    menu.classList.add("is-open");
    root.classList.add("is-menu-open");
    toggleBtn.setAttribute("aria-expanded", "true");
    toggleBtn.setAttribute("aria-label", "전체 메뉴 닫기");
    setBackgroundInert(true);
    closeBtn.focus();
  }

  function closeMenu(restoreFocus) {
    if (!isOpen()) return;
    menu.classList.remove("is-open");
    root.classList.remove("is-menu-open");
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.setAttribute("aria-label", "전체 메뉴 열기");
    setBackgroundInert(false);
    if (restoreFocus !== false) toggleBtn.focus();
  }

  toggleBtn.addEventListener("click", function () {
    if (isOpen()) closeMenu();
    else openMenu();
  });
  closeBtn.addEventListener("click", function () {
    closeMenu();
  });
  overlay.addEventListener("click", function () {
    closeMenu();
  });

  // 메뉴 항목 / 지원하기 선택 → 링크 이동 + 메뉴 닫기
  panel.addEventListener("click", function (e) {
    var link = e.target.closest ? e.target.closest("a[href]") : null;
    if (link) closeMenu(false);
  });

  document.addEventListener("keydown", function (e) {
    if (!isOpen()) return;
    if (e.key === "Escape" || e.key === "Esc") {
      e.preventDefault();
      closeMenu();
      return;
    }
    if (e.key === "Tab") {
      // 메뉴 안에서만 포커스 순환
      var items = panel.querySelectorAll(
        "a[href], button:not([disabled])",
      );
      if (!items.length) return;
      var first = items[0],
        last = items[items.length - 1];
      if (!panel.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // 화면이 768px 이상으로 넓어지면 열린 메뉴 정리
  function onViewportChange() {
    if (!mq.matches) closeMenu(false);
  }
  if (mq.addEventListener)
    mq.addEventListener("change", onViewportChange);
  else if (mq.addListener) mq.addListener(onViewportChange);
})();


(function () {
  "use strict";

  var countdown = document.querySelector("[data-application-countdown]");
  if (!countdown) return;

  var deadline = Date.parse(countdown.getAttribute("data-deadline"));
  if (!Number.isFinite(deadline)) {
    throw new Error("지원 마감 시각이 올바르지 않습니다.");
  }

  var days = countdown.querySelector("[data-countdown-days]");
  var hours = countdown.querySelector("[data-countdown-hours]");
  var minutes = countdown.querySelector("[data-countdown-minutes]");
  var seconds = countdown.querySelector("[data-countdown-seconds]");
  var timer;

  function updateCountdown() {
    var remaining = Math.max(0, deadline - Date.now());
    var totalSeconds = Math.floor(remaining / 1000);
    days.textContent = String(Math.floor(totalSeconds / 86400));
    hours.textContent = String(
      Math.floor((totalSeconds % 86400) / 3600),
    ).padStart(2, "0");
    minutes.textContent = String(
      Math.floor((totalSeconds % 3600) / 60),
    ).padStart(2, "0");
    seconds.textContent = String(totalSeconds % 60).padStart(2, "0");
    if (remaining === 0) window.clearInterval(timer);
  }

  updateCountdown();
  timer = window.setInterval(updateCountdown, 1000);
})();
