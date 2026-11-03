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

  var section = document.getElementById("exposition");
  if (!section) return;

  var tabs = section.querySelectorAll(".exposition__tab");
  var panels = [
    section.querySelector("#exposition-panel-fair"),
    section.querySelector("#exposition-panel-campus"),
  ];
  var regionButtons = section.querySelectorAll("[data-exposition-region]");
  var schedules = section.querySelectorAll("[data-exposition-schedule]");
  var details = section.querySelectorAll(
    "[data-exposition-event-detail]",
  );
  var fairSchedule = [
    { date: "8월 31일 (월)", events: ["KAIST"] },
    {
      date: "9월 1일 (화)",
      events: ["서울대학교", "서강대학교", "연세대학교"],
    },
    { date: "9월 2일 (수)", events: ["UNIST", "한양대학교"] },
    { date: "9월 3일 (목)", events: ["GIST"] },
    {
      date: "9월 4일 (금)",
      events: ["고려대학교", "성균관대학교(자연)"],
    },
    { date: "9월 7일 (월)", events: ["KIST", "동국대학교"] },
    {
      date: "9월 8일 (화)",
      events: ["이화여자대학교", "중견기업박람회(대전)"],
    },
    { date: "9월 9일 (수)", events: ["POSTECH"] },
    { date: "", events: [] },
    { date: "10월 7일 (수)", events: ["서울고용센터"] },
  ];
  var campusRegionNames = {
    seoul: "서울",
    gyeonggi: "경기",
    gangwon: "강원",
    gyeongsang: "경상",
    chungcheong: "충청",
    jeolla: "전라",
  };
  var campusExcludedDates = {
    seoul: [
      "9월 21일 (월)",
      "9월 22일 (화)",
      "9월 23일 (수)",
      "9월 24일 (목)",
      "9월 25일 (금)",
      "10월 3일 (토)",
      "10월 4일 (일)",
      "10월 5일 (월)",
      "10월 6일 (화)",
      "10월 7일 (수)",
      "10월 8일 (목)",
      "10월 9일 (금)",
      "10월 10일 (토)",
      "10월 11일 (일)",
    ],
    chungcheong: [
      "9월 21일 (월)",
      "9월 22일 (화)",
      "9월 23일 (수)",
      "9월 24일 (목)",
      "9월 25일 (금)",
    ],
    jeolla: [
      "9월 21일 (월)",
      "9월 22일 (화)",
      "9월 23일 (수)",
      "9월 24일 (목)",
      "9월 25일 (금)",
      "9월 28일 (월)",
      "9월 29일 (화)",
      "9월 30일 (수)",
      "10월 1일 (목)",
      "10월 2일 (금)",
    ],
  };
  var campusEvents = Object.create(null);
  var campusDataLoaded = false;
  var campusDataError = false;
  var activeRegion = "seoul";

  function setDetail(message) {
    for (var i = 0; i < details.length; i++) {
      details[i].textContent = message;
      details[i].hidden = !message;
    }
  }

  function closeInlineDetail(detail, restoreFocus) {
    var trigger = section.querySelector(
      '[aria-controls="' + detail.id + '"]',
    );
    detail.hidden = true;
    if (trigger) {
      trigger.setAttribute("aria-expanded", "false");
      if (restoreFocus) trigger.focus();
    }
  }

  section.addEventListener("focusout", function (event) {
    var cell = event.target.closest(".exposition__date-cell");
    if (!cell || cell.contains(event.relatedTarget)) return;

    var openDetail = cell.querySelector(
      ".exposition__event-detail-inline:not([hidden])",
    );
    if (openDetail) closeInlineDetail(openDetail, false);
  });
  section.addEventListener("pointerdown", function (event) {
    var openDetails = section.querySelectorAll(
      ".exposition__event-detail-inline:not([hidden])",
    );
    for (var i = 0; i < openDetails.length; i++) {
      if (!openDetails[i].contains(event.target)) {
        closeInlineDetail(openDetails[i], false);
      }
    }
  });

  function renderSchedule(container, entries, emptyMessage) {
    container.replaceChildren();

    if (!entries) {
      var empty = document.createElement("p");
      empty.className = "exposition__empty";
      empty.textContent = emptyMessage;
      container.appendChild(empty);
      return;
    }

    var grid = document.createElement("div");
    grid.className = "exposition__date-grid";
    if (container === schedules[1]) {
      grid.classList.add("exposition__date-grid--campus");
    }
    grid.setAttribute("role", "list");

    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      var cell = document.createElement("div");
      var date = document.createElement("div");
      var events = document.createElement("div");

      cell.className = "exposition__date-cell";
      cell.setAttribute("role", "listitem");
      date.className = "exposition__date";
      date.textContent = entry.date;
      events.className = "exposition__events";

      for (var j = 0; j < entry.events.length; j++) {
        var eventData =
          typeof entry.events[j] === "string"
            ? { name: entry.events[j] }
            : entry.events[j];
        if (container === schedules[0]) {
          var eventLabel = document.createElement("span");
          eventLabel.className = "exposition__event-label";
          eventLabel.textContent = eventData.name;
          events.appendChild(eventLabel);
          continue;
        }

        var eventButton = document.createElement("button");
        eventButton.className = "exposition__event";
        eventButton.type = "button";
        eventButton.textContent = eventData.name;
        eventButton.setAttribute(
          "aria-label",
          entry.date + " " + eventData.name + " 일정 상세 보기",
        );
        var detailId =
          "exposition-event-detail-" +
          container.id +
          "-" +
          i +
          "-" +
          j;
        var eventDetail = document.createElement("div");
        eventDetail.className = "exposition__event-detail-inline";
        eventDetail.id = detailId;
        eventDetail.hidden = true;
        eventDetail.tabIndex = 0;
        eventDetail.setAttribute("role", "button");
        eventDetail.setAttribute(
          "aria-label",
          eventData.name + " 세부 일정 닫기",
        );
        eventButton.setAttribute("aria-controls", detailId);
        eventButton.setAttribute("aria-expanded", "false");

        function appendEventDetail(label, value) {
          var item = document.createElement("div");
          var itemLabel = document.createElement("span");
          var itemValue = document.createElement("span");
          itemLabel.className = "exposition__event-detail-label";
          itemValue.className = "exposition__event-detail-value";
          itemLabel.textContent = label;
          itemValue.textContent = value;
          item.appendChild(itemLabel);
          item.appendChild(itemValue);
          eventDetail.appendChild(item);
        }

        appendEventDetail(
          "장소",
          eventData.location || "세부 장소 추후 안내",
        );
        appendEventDetail(
          "시간",
          eventData.time || "운영 시간 추후 안내",
        );
        (function (trigger, detail) {
          function closeDetail(restoreFocus) {
            closeInlineDetail(detail, restoreFocus);
          }

          trigger.addEventListener("click", function () {
            detail.hidden = false;
            trigger.setAttribute("aria-expanded", "true");
            detail.focus();
          });
          detail.addEventListener("click", function () {
            closeDetail(true);
          });
          detail.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              closeDetail(true);
            } else if (event.key === "Escape") {
              event.preventDefault();
              closeDetail(true);
            }
          });
        })(eventButton, eventDetail);
        events.appendChild(eventButton);
        events.appendChild(eventDetail);
      }

      cell.appendChild(date);
      cell.appendChild(events);
      grid.appendChild(cell);
    }

    container.appendChild(grid);
  }

  function activateTab(tab, moveFocus) {
    var selectedIndex = Array.prototype.indexOf.call(tabs, tab);
    for (var i = 0; i < tabs.length; i++) {
      var selected = i === selectedIndex;
      tabs[i].setAttribute("aria-selected", selected ? "true" : "false");
      tabs[i].tabIndex = selected ? 0 : -1;
      panels[i].hidden = !selected;
    }
    setDetail("");
    if (selectedIndex === 0) {
      renderSchedule(schedules[0], fairSchedule);
    } else {
      renderCampusSchedule(activeRegion);
    }
    if (moveFocus) tab.focus();
  }

  function renderCampusSchedule(region) {
    if (!campusDataLoaded) {
      renderSchedule(
        schedules[1],
        null,
        campusDataError
          ? "캠퍼스 일정을 불러오지 못했습니다. 잠시 후 다시 확인해 주세요."
          : "캠퍼스 일정을 불러오는 중입니다.",
      );
      if (campusDataError) {
        schedules[1]
          .querySelector(".exposition__empty")
          .setAttribute("role", "alert");
      }
      return;
    }

    var regionSchedule = campusEvents[region];
    var entries = [];
    if (regionSchedule && regionSchedule.length) {
      var eventsByDate = Object.create(null);
      for (var i = 0; i < regionSchedule.length; i++) {
        eventsByDate[regionSchedule[i].date] = regionSchedule[i].events;
      }

      var firstDateMatch = regionSchedule[0].date.match(
        /^(\d+)월\s*(\d+)일/,
      );
      var lastDateMatch = regionSchedule[
        regionSchedule.length - 1
      ].date.match(/^(\d+)월\s*(\d+)일/);
      var firstDate = new Date(
        2026,
        Number(firstDateMatch[1]) - 1,
        Number(firstDateMatch[2]),
        12,
      );
      var lastDate = new Date(
        2026,
        Number(lastDateMatch[1]) - 1,
        Number(lastDateMatch[2]),
        12,
      );
      firstDate.setDate(
        firstDate.getDate() - ((firstDate.getDay() + 6) % 7),
      );

      var weekdays = ["일", "월", "화", "수", "목", "금", "토"];
      for (
        var date = firstDate;
        date <= lastDate;
        date.setDate(date.getDate() + 1)
      ) {
        var weekday = date.getDay();
        if (weekday === 0 || weekday === 6) continue;

        var dateLabel =
          (date.getMonth() + 1) +
          "월 " +
          date.getDate() +
          "일 (" +
          weekdays[weekday] +
          ")";
        var excludedDates = campusExcludedDates[region] || [];
        if (excludedDates.indexOf(dateLabel) !== -1) continue;

        entries.push({
          date: dateLabel,
          events: eventsByDate[dateLabel] || [],
        });
      }
    }
    renderSchedule(schedules[1], entries);
  }

  function parseCampusSchedule(data) {
    if (!Array.isArray(data)) {
      throw new Error("캠퍼스 일정 데이터 형식이 올바르지 않습니다.");
    }

    var keyByName = Object.create(null);
    for (var key in campusRegionNames) {
      keyByName[campusRegionNames[key]] = key;
    }

    var schedulesByRegion = Object.create(null);
    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      if (
        !item ||
        typeof item.region !== "string" ||
        typeof item.date !== "string" ||
        typeof item.school !== "string" ||
        typeof item.location !== "string" ||
        typeof item.time !== "string"
      ) {
        throw new Error(
          "캠퍼스 일정 데이터에 필수 항목이 없거나 형식이 올바르지 않습니다.",
        );
      }

      var regionKey = keyByName[item.region];
      if (!regionKey) {
        throw new Error(
          "지원하지 않는 캠퍼스 지역입니다: " + item.region,
        );
      }

      var dateMatch = item.date.match(/^(\d+)월\s*(\d+)일/);
      if (!dateMatch) {
        throw new Error(
          "캠퍼스 일정 날짜 형식이 올바르지 않습니다: " + item.date,
        );
      }

      if (!schedulesByRegion[regionKey]) {
        schedulesByRegion[regionKey] = Object.create(null);
      }
      if (!schedulesByRegion[regionKey][item.date]) {
        schedulesByRegion[regionKey][item.date] = [];
      }
      schedulesByRegion[regionKey][item.date].push({
        name: item.school,
        location: item.location,
        time: item.time,
      });
    }

    var parsedSchedules = Object.create(null);
    for (var regionKey in schedulesByRegion) {
      parsedSchedules[regionKey] = Object.keys(
        schedulesByRegion[regionKey],
      )
        .sort(function (firstDate, secondDate) {
          var firstMatch = firstDate.match(/^(\d+)월\s*(\d+)일/);
          var secondMatch = secondDate.match(/^(\d+)월\s*(\d+)일/);
          return (
            Number(firstMatch[1]) * 100 +
            Number(firstMatch[2]) -
            (Number(secondMatch[1]) * 100 + Number(secondMatch[2]))
          );
        })
        .map(function (date) {
          return {
            date: date,
            events: schedulesByRegion[regionKey][date],
          };
        });
    }
    return parsedSchedules;
  }

  for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function () {
      activateTab(this, false);
    });
    tabs[i].addEventListener("keydown", function (event) {
      var nextIndex = Array.prototype.indexOf.call(tabs, this);
      if (event.key === "ArrowRight")
        nextIndex = (nextIndex + 1) % tabs.length;
      else if (event.key === "ArrowLeft")
        nextIndex = (nextIndex - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") nextIndex = 0;
      else if (event.key === "End") nextIndex = tabs.length - 1;
      else return;

      event.preventDefault();
      activateTab(tabs[nextIndex], true);
    });
  }

  for (var j = 0; j < regionButtons.length; j++) {
    regionButtons[j].addEventListener("click", function () {
      activeRegion = this.getAttribute("data-exposition-region");
      for (var k = 0; k < regionButtons.length; k++) {
        regionButtons[k].setAttribute(
          "aria-pressed",
          regionButtons[k] === this ? "true" : "false",
        );
      }
      setDetail("");
      renderCampusSchedule(activeRegion);
    });
  }

  renderSchedule(schedules[0], fairSchedule);
  renderCampusSchedule(activeRegion);

  fetch("./data/campus_recruiting_schedule.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("캠퍼스 일정 데이터를 불러오지 못했습니다.");
      }
      return response.json();
    })
    .then(function (data) {
      campusEvents = parseCampusSchedule(data);
      campusDataLoaded = true;
      renderCampusSchedule(activeRegion);
    })
    .catch(function (error) {
      console.error("캠퍼스 일정을 표시하지 못했습니다.", error);
      campusDataError = true;
      renderCampusSchedule(activeRegion);
    });
})();

// 한미 연혁: 펼치기 / 접기 (접힘 = 뷰포트 100vh 높이 + 하단 그라데이션)
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

  var list = document.querySelector(".con5__list");
  if (!list) return;

  function createTextElement(tagName, className, text) {
    var element = document.createElement(tagName);
    element.className = className;
    element.textContent = text;
    return element;
  }

  function validateBenefitData(categories) {
    if (!Array.isArray(categories) || categories.length === 0)
      throw new Error("복지 데이터 형식이 올바르지 않습니다.");

    for (var i = 0; i < categories.length; i++) {
      var category = categories[i];
      if (
        !category ||
        typeof category.category !== "string" ||
        typeof category.category_description !== "string" ||
        !Array.isArray(category.items)
      )
        throw new Error("복지 카테고리 데이터 형식이 올바르지 않습니다.");

      for (var j = 0; j < category.items.length; j++) {
        var item = category.items[j];
        if (
          !item ||
          typeof item.title !== "string" ||
          typeof item.description !== "string"
        )
          throw new Error("복지 항목 데이터 형식이 올바르지 않습니다.");
      }
    }
  }

  function renderBenefits(categories) {
    validateBenefitData(categories);
    list.replaceChildren();
    var iconIndex = 0;

    for (var i = 0; i < categories.length; i++) {
      var category = categories[i];
      var sectionItem = document.createElement("li");
      var lead = document.createElement("div");
      var heading = document.createElement("h3");
      var heart = document.createElement("img");
      var headingText = document.createElement("span");
      var description = createTextElement(
        "p",
        "con5__lead-sub",
        category.category_description,
      );

      sectionItem.className = "con5__section";
      lead.className = "con5__lead";
      heading.className = "con5__lead-main";
      heart.className = "con5__heart";
      heart.src = "./images/wf_tit1.png";
      heart.alt = "";
      heart.width = 24;
      heart.height = 22;
      heart.loading = "lazy";
      headingText.textContent = category.category;
      heading.appendChild(heart);
      heading.appendChild(headingText);
      lead.appendChild(heading);
      lead.appendChild(description);
      sectionItem.appendChild(lead);
      list.appendChild(sectionItem);

      for (var j = 0; j < category.items.length; j++) {
        var item = category.items[j];
        iconIndex++;

        var card = document.createElement("li");
        var text = document.createElement("div");
        var title = createTextElement("h3", "con5__name", item.title);
        var detail = createTextElement(
          "p",
          "con5__desc",
          item.description,
        );
        var icon = document.createElement("img");

        card.className = "con5__card";
        text.className = "con5__txt";
        text.appendChild(title);
        text.appendChild(detail);
        icon.className = "con5__ico";
        icon.src = "./images/wf_ico" + iconIndex + ".png";
        icon.alt = "";
        icon.width = 72;
        icon.height = 72;
        icon.loading = "lazy";
        card.appendChild(text);
        card.appendChild(icon);
        list.appendChild(card);
      }
    }
  }

  fetch("./data/benefit_data.json")
    .then(function (response) {
      if (!response.ok)
        throw new Error("복지 데이터를 불러오지 못했습니다.");
      return response.json();
    })
    .then(renderBenefits)
    .catch(function (error) {
      console.error("복지 목록을 표시하지 못했습니다.", error);
      list.replaceChildren();
      var message = document.createElement("li");
      message.className = "con5__error";
      message.setAttribute("role", "alert");
      message.textContent =
        "복지 목록을 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.";
      list.appendChild(message);
    });
})();

// 모바일 전체 메뉴 (767px 이하): 열기/닫기, 오버레이·Escape·링크 클릭, 포커스 처리
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

  var tasks = document.querySelector(".tasks");
  if (!tasks) return;

  var taskData = [
    {
      category: "rnd",
      details: [
        {
          location: "연구센터 (경기도 동탄)",
          count: "6",
          fields: [
            "NCE (New Chemical Entity)",
            "QS&F (Quality Science & Formulation)",
            "MST (Manufacturing Science Technology)",
            "TE (Toxicology Evaluation)",
            "DST (Drug Science & Technology)",
            "BSS (Biological & Structural Evaluation Science)",
          ],
        },
        {
          location: "제제연구소 [의약혁신센터] (경기도 광교)",
          count: "1",
          fields: ["신제형연구 (전문연구요원)"],
        },
      ],
    },
    {
      category: "prod",
      details: [
        {
          location: "팔탄제조센터 (경기도 화성)",
          count: "4",
          fields: ["제조", "포장", "품질관리", "기술지원"],
        },
        {
          location: "평택제조센터 (경기도 평택)",
          count: "2",
          fields: ["DS생산 (학사)", "DS생산 (전문학사)"],
        },
      ],
    },
    {
      category: "sales",
      details: [
        {
          location: "전국 (Mobile Office)",
          count: "1",
          fields: ["제약영업"],
        },
        {
          location: "본사 (서울시 송파구)",
          count: "2",
          fields: ["해외영업", "IT솔루션영업"],
        },
      ],
    },
    {
      category: "mps",
      details: [
        {
          location: "본사 (서울시 송파구)",
          count: "5",
          fields: ["구매", "국내법무", "특허", "안전관리", "인사총무"],
        },
      ],
    },
    {
      category: "cl",
      details: [
        {
          location: "본사 (서울시 송파구)",
          count: "4",
          fields: [
            "Pipeline Valuation (신약가치평가)",
            "Market Intelligence (신약개발 전략분석)",
            "Data Management",
            "Biostatistician",
          ],
        },
      ],
    },
    {
      category: "global",
      details: [
        {
          location: "본사 (서울시 송파구)",
          count: "2",
          fields: ["Global Regulatory Affairs", "Licensing"],
        },
      ],
    },
    {
      category: "healthcare",
      details: [
        {
          location: "본사 (서울시 송파구)",
          count: "9",
          fields: [
            "식품영업",
            "식품커머스운영",
            "화장품 커머스사업기획",
            "화장품 상품기획",
            "화장품 홈쇼핑영업/운영",
            "화장품 국내영업",
            "화장품 해외영업",
            "화장품 글로벌마케팅",
            "해외이커머스운영",
          ],
        },
        {
          location: "서울/수도권/영남",
          count: "1",
          fields: ["의료기기영업"],
        },
      ],
    },
  ];

  var tabs = tasks.querySelectorAll("[data-task-category]");
  var groups = tasks.querySelector("#tasks-groups");
  var modal = tasks.querySelector(".tasks__modal");
  var modalBanner = tasks.querySelector(".tasks__modal-banner");
  var modalTitle = tasks.querySelector("#tasks-modal-title");
  var modalCategory = tasks.querySelector("[data-tasks-modal-category]");
  var modalLocation = tasks.querySelector("[data-tasks-modal-location]");
  var modalJobCategory = tasks.querySelector("[data-tasks-modal-job-category]");
  var modalDuties = tasks.querySelector("[data-tasks-modal-duties]");
  var modalQualifications = tasks.querySelector("[data-tasks-modal-qualifications]");
  var modalPreferred = tasks.querySelector("[data-tasks-modal-preferred]");
  var activeCategory = "R&D";
  var returnFocus = null;
  var popupImageRequests = Object.create(null);
  var popupDataRequest = fetch("./data/pop_data.json").then(function (response) {
    if (!response.ok) throw new Error("직무 상세 정보를 불러오지 못했습니다.");
    return response.json();
  });

  function addArrow(className, direction) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", className);
    svg.setAttribute("viewBox", "0 0 20 20");
    svg.setAttribute("fill", "none");
    svg.setAttribute("aria-hidden", "true");
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", direction === "down" ? "m5 7 5 5 5-5" : "M3 10h13m-5-5 5 5-5 5");
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", "1.8");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    svg.appendChild(path);
    return svg;
  }

  function renderCategory(key, tab) {
    var categoryGroups = [];
    for (var categoryIndex = 0; categoryIndex < taskData.length; categoryIndex++) {
      if (taskData[categoryIndex].category === key) {
        categoryGroups = taskData[categoryIndex].details;
        break;
      }
    }
    activeCategory = tab.textContent.trim();
    groups.setAttribute("aria-labelledby", tab.id);
    groups.replaceChildren();

    for (var i = 0; i < categoryGroups.length; i++) {
      var data = categoryGroups[i];
      var article = document.createElement("section");
      var trigger = document.createElement("button");
      var title = document.createElement("span");
      var count = document.createElement("span");
      var panel = document.createElement("div");
      var panelInner = document.createElement("div");
      var cards = document.createElement("div");
      var groupId = "tasks-group-" + key + "-" + i;

      article.className = "tasks__group";
      trigger.className = "tasks__group-trigger";
      trigger.type = "button";
      trigger.id = groupId + "-trigger";
      trigger.setAttribute("aria-expanded", "false");
      trigger.setAttribute("aria-controls", groupId + "-cards");
      title.className = "tasks__group-title";
      title.textContent = data.location;
      count.className = "tasks__count";
      count.textContent = data.count;
      count.setAttribute("aria-label", data.count + "개 직무");
      trigger.appendChild(title);
      trigger.appendChild(count);
      trigger.appendChild(addArrow("tasks__chevron", "down"));

      panel.className = "tasks__panel";
      panel.id = groupId + "-cards";
      panel.setAttribute("aria-hidden", "true");
      panel.inert = true;
      panelInner.className = "tasks__panel-inner";
      cards.className = "tasks__cards";
      for (var j = 0; j < data.fields.length; j++) {
        var card = document.createElement("button");
        var cardTitle = document.createElement("span");
        card.className = "tasks__card";
        card.type = "button";
        cardTitle.textContent = data.fields[j];
        card.appendChild(cardTitle);
        card.appendChild(addArrow("tasks__card-arrow", "right"));
        card._taskData = {
          title: data.fields[j],
          fields: data.fields,
          count: data.count,
        };
        card._taskLocation = data.location;
        cards.appendChild(card);
      }
      panelInner.appendChild(cards);
      panel.appendChild(panelInner);
      article.replaceChildren(trigger, panel);
      groups.appendChild(article);
    }
  }

  function renderList(list, entries) {
    list.replaceChildren();
    for (var i = 0; i < entries.length; i++) {
      var item = document.createElement("li");
      item.textContent = entries[i];
      list.appendChild(item);
    }
    list.parentElement.hidden = entries.length === 0;
  }

  function resolvePopupImage(imagePath) {
    var path = imagePath && imagePath.charAt(0) === "/"
      ? "." + imagePath
      : imagePath;
    if (!path) return Promise.resolve("./images/tasks_rnd_bg.jpg");
    if (!popupImageRequests[path]) {
      popupImageRequests[path] = fetch(path, { method: "HEAD" })
        .then(function (response) {
          return response.ok ? path : "./images/tasks_rnd_bg.jpg";
        })
        .catch(function () {
          return "./images/tasks_rnd_bg.jpg";
        });
    }
    return popupImageRequests[path];
  }

  function openModal(card) {
    if (!card._taskData || !modal.showModal) return;
    var selectedCategory = activeCategory;
    popupDataRequest.then(function (records) {
      var data = records.find(function (record) {
        return record.title === card._taskData.title && record.department === selectedCategory;
      });
      if (!data) return;

      returnFocus = card;
      modalTitle.textContent = data.title;
      modalCategory.textContent = data.department;
      modalLocation.textContent = " | " + data.location;
      modalJobCategory.textContent = data.category;
      renderList(modalDuties, data.job_description || []);
      renderList(modalQualifications, data.qualifications || []);
      renderList(modalPreferred, data.preferred || []);

      resolvePopupImage(data.image).then(function (imagePath) {
        modalBanner.style.backgroundImage = 'url("' + imagePath + '")';
        modal.showModal();
        tasks.querySelector("[data-tasks-modal-close]").focus();
      });
    });
  }

  for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function () {
      for (var j = 0; j < tabs.length; j++) {
        tabs[j].setAttribute("aria-selected", tabs[j] === this ? "true" : "false");
      }
      renderCategory(this.getAttribute("data-task-category"), this);
    });
    tabs[i].addEventListener("keydown", function (event) {
      var index = Array.prototype.indexOf.call(tabs, this);
      if (event.key === "ArrowRight") index = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft") index = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") index = 0;
      else if (event.key === "End") index = tabs.length - 1;
      else return;
      event.preventDefault();
      tabs[index].focus();
      tabs[index].click();
    });
  }

  groups.addEventListener("click", function (event) {
    var trigger = event.target.closest(".tasks__group-trigger");
    var card = event.target.closest(".tasks__card");
    if (trigger) {
      var panel = document.getElementById(trigger.getAttribute("aria-controls"));
      var expanded = trigger.getAttribute("aria-expanded") === "true";
      if (!expanded) {
        var openGroups = groups.querySelectorAll(".tasks__group.is-open");
        for (var i = 0; i < openGroups.length; i++) {
          var openTrigger = openGroups[i].querySelector(".tasks__group-trigger");
          var openPanel = document.getElementById(openTrigger.getAttribute("aria-controls"));
          openTrigger.setAttribute("aria-expanded", "false");
          openGroups[i].classList.remove("is-open");
          openPanel.classList.remove("is-open");
          openPanel.setAttribute("aria-hidden", "true");
          openPanel.inert = true;
        }
      }
      trigger.setAttribute("aria-expanded", expanded ? "false" : "true");
      trigger.parentElement.classList.toggle("is-open", !expanded);
      panel.classList.toggle("is-open", !expanded);
      panel.setAttribute("aria-hidden", expanded ? "true" : "false");
      panel.inert = expanded;
    } else if (card) {
      openModal(card);
    }
  });

  tasks.querySelector("[data-tasks-modal-close]").addEventListener("click", function () {
    modal.close();
  });
  modal.addEventListener("click", function (event) {
    if (event.target === modal) modal.close();
  });
  modal.addEventListener("close", function () {
    if (returnFocus && document.contains(returnFocus)) returnFocus.focus();
  });

  renderCategory("rnd", tasks.querySelector('[data-task-category="rnd"]'));
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
