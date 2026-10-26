// Builds an in-page heading list from the article and highlights the section
// in view. The theme page nav stays off (nav_enabled: false).
(function () {
  var READING_LINE = 96;
  var HASH_BAND_ABOVE = 48;
  var HASH_BAND_BELOW = 160;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  function init() {
    if (document.querySelector(".toc-sidebar")) return;

    var article = document.querySelector("#main-content main") || document.getElementById("main-content");
    if (!article) return;

    var tree = buildTree(article.querySelectorAll("h2, h3"));
    if (!tree.length) return;

    var flat = flatten(tree);
    var nav = render(tree);
    var main = document.getElementById("main-content");
    var layout = document.createElement("div");
    layout.className = "toc-layout";
    main.parentNode.insertBefore(layout, main);
    layout.appendChild(nav);
    layout.appendChild(main);

    var links = new Map();
    var anchors = nav.querySelectorAll("a[href^='#']");
    for (var i = 0; i < anchors.length; i++) {
      links.set(decodeHash(anchors[i].getAttribute("href")), anchors[i]);
    }

    var toggle = nav.querySelector(".toc-sidebar-toggle");
    var nested = nav.querySelector(".toc-sidebar-nested");
    if (toggle && nested) {
      toggle.addEventListener("click", function () {
        setExpanded(toggle.getAttribute("aria-expanded") !== "true");
      });
    }

    var activeId = null;
    var pinnedId = null;
    var pinTimer = 0;
    // Keep a URL hash highlighted until the reader scrolls by hand. After that,
    // the reading line decides, including near the end of the page.
    var stickToHash = true;

    function setExpanded(open) {
      if (!toggle || !nested) return;
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Hide glossary entries" : "Show glossary entries");
      nested.hidden = !open;
    }

    function setActive(id) {
      if (!links.has(id) || activeId === id) return;
      activeId = id;
      links.forEach(function (link, linkId) {
        if (linkId === id) {
          link.classList.add("is-active");
          link.setAttribute("aria-current", "location");
        } else {
          link.classList.remove("is-active");
          link.removeAttribute("aria-current");
        }
      });
      var link = links.get(id);
      if (link.closest(".toc-sidebar-nested")) setExpanded(true);
      reveal(link);
    }

    function reveal(link) {
      var navRect = nav.getBoundingClientRect();
      if (!navRect.height) return;
      var linkRect = link.getBoundingClientRect();
      if (linkRect.top < navRect.top) {
        nav.scrollTop -= navRect.top - linkRect.top;
      } else if (linkRect.bottom > navRect.bottom) {
        nav.scrollTop += linkRect.bottom - navRect.bottom;
      }
    }

    function pin(id) {
      pinnedId = id;
      setActive(id);
      window.clearTimeout(pinTimer);
      pinTimer = window.setTimeout(function () {
        pinnedId = null;
        sync();
      }, 1200);
    }

    function clearPin() {
      if (!pinnedId) return;
      pinnedId = null;
      window.clearTimeout(pinTimer);
    }

    function releaseToScrollspy() {
      stickToHash = false;
      clearPin();
    }

    links.forEach(function (link, id) {
      link.addEventListener("click", function (event) {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        pin(id);
      });
    });

    function headingNearTop(id) {
      var el = document.getElementById(id);
      if (!el) return false;
      var top = el.getBoundingClientRect().top;
      return top > -HASH_BAND_ABOVE && top < HASH_BAND_BELOW;
    }

    // Headings near the end of the page never reach the top reading line,
    // because there is not enough content below them. Slide the line downward
    // over the last stretch of scroll so those sections can still become current.
    function activationLine() {
      var doc = document.scrollingElement || document.documentElement;
      var maxScroll = doc.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return READING_LINE;
      var remaining = maxScroll - window.scrollY;
      var range = Math.min(420, maxScroll);
      if (remaining >= range) return READING_LINE;
      var progress = 1 - remaining / range;
      var deep = Math.min(window.innerHeight * 0.85, 760);
      return READING_LINE + (deep - READING_LINE) * progress;
    }

    function sectionAtLine() {
      var line = activationLine();
      var current = null;
      var firstOnScreen = null;
      for (var n = 0; n < flat.length; n++) {
        var top = flat[n].getBoundingClientRect().top;
        if (top <= line) current = flat[n].id;
        else if (!firstOnScreen && top < window.innerHeight) firstOnScreen = flat[n].id;
      }
      return current || firstOnScreen;
    }

    function sync() {
      if (pinnedId && links.has(pinnedId)) {
        if (headingNearTop(pinnedId)) {
          window.clearTimeout(pinTimer);
          var arrived = pinnedId;
          pinnedId = null;
          setActive(arrived);
          return;
        }
        setActive(pinnedId);
        return;
      }

      var hashed = hashId();
      if (stickToHash && hashed && links.has(hashed) && headingNearTop(hashed)) {
        setActive(hashed);
        return;
      }

      var current = sectionAtLine();
      if (current) setActive(current);
    }

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(sync, {
        root: null,
        // Fire as headings cross the upper reading band. sync() decides which
        // section is current; the scroll listener covers hash jumps that skip
        // this band entirely.
        rootMargin: "-" + READING_LINE + "px 0px -45% 0px",
        threshold: [0, 1]
      });
      flat.forEach(function (el) {
        observer.observe(el);
      });
    }

    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        sync();
      });
    }, { passive: true });

    window.addEventListener("resize", sync);
    window.addEventListener("hashchange", function () {
      var id = hashId();
      if (pinnedId && id && id !== pinnedId) clearPin();
      stickToHash = true;
      sync();
    });
    window.addEventListener("popstate", function () {
      clearPin();
      stickToHash = true;
      sync();
    });
    window.addEventListener("wheel", function (event) {
      if (event.target && event.target.closest && event.target.closest(".toc-sidebar")) return;
      releaseToScrollspy();
    }, { passive: true });
    window.addEventListener("touchmove", releaseToScrollspy, { passive: true });
    window.addEventListener("keydown", function (event) {
      if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "PageDown" ||
          event.key === "PageUp" || event.key === "Home" || event.key === "End" || event.key === " ") {
        releaseToScrollspy();
      }
    });
    window.addEventListener("load", sync);

    sync();
    requestAnimationFrame(function () {
      requestAnimationFrame(sync);
    });
  }

  function hashId() {
    return decodeHash(location.hash);
  }

  function decodeHash(value) {
    var raw = (value || "").replace(/^#/, "");
    if (!raw) return "";
    try {
      return decodeURIComponent(raw);
    } catch (error) {
      return raw;
    }
  }

  function headingText(node) {
    var clone = node.cloneNode(true);
    var anchors = clone.querySelectorAll(".anchor-heading");
    for (var i = 0; i < anchors.length; i++) anchors[i].remove();
    return (clone.textContent || "").replace(/\s+/g, " ").trim();
  }

  function isContents(node, text) {
    return node.id === "contents" || text.toLowerCase() === "contents";
  }

  function isGlossary(node, text) {
    return node.id === "glossary" || text.toLowerCase() === "glossary";
  }

  function buildTree(nodes) {
    var items = [];
    var current = null;
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (!node.id) continue;
      var text = headingText(node);
      if (!text) continue;
      if (node.tagName === "H2") {
        if (isContents(node, text)) {
          current = null;
          continue;
        }
        current = {
          id: node.id,
          text: text,
          el: node,
          glossary: isGlossary(node, text),
          children: []
        };
        items.push(current);
      } else if (current && current.glossary) {
        current.children.push({ id: node.id, text: text, el: node });
      }
    }
    return items;
  }

  function flatten(items) {
    var out = [];
    items.forEach(function (item) {
      out.push(item.el);
      item.children.forEach(function (child) {
        out.push(child.el);
      });
    });
    return out;
  }

  function render(items) {
    var nav = document.createElement("nav");
    nav.className = "toc-sidebar";
    nav.setAttribute("aria-label", "On this page");

    var label = document.createElement("p");
    label.className = "toc-sidebar-label";
    label.textContent = "On this page";
    nav.appendChild(label);

    var list = document.createElement("ul");
    list.className = "toc-sidebar-list";
    items.forEach(function (item) {
      list.appendChild(renderItem(item));
    });
    nav.appendChild(list);
    return nav;
  }

  function renderItem(item) {
    var li = document.createElement("li");
    li.className = "toc-sidebar-item";
    if (!item.children.length) {
      li.appendChild(makeLink(item));
      return li;
    }

    var row = document.createElement("div");
    row.className = "toc-sidebar-row";
    row.appendChild(makeLink(item));

    var button = document.createElement("button");
    button.type = "button";
    button.className = "toc-sidebar-toggle";
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", "toc-glossary-entries");
    button.setAttribute("aria-label", "Show glossary entries");
    var chevron = document.createElement("span");
    chevron.className = "toc-sidebar-chevron";
    chevron.setAttribute("aria-hidden", "true");
    button.appendChild(chevron);
    row.appendChild(button);
    li.appendChild(row);

    var nested = document.createElement("ul");
    nested.className = "toc-sidebar-nested";
    nested.id = "toc-glossary-entries";
    nested.hidden = true;
    item.children.forEach(function (child) {
      var childLi = document.createElement("li");
      childLi.className = "toc-sidebar-item";
      childLi.appendChild(makeLink(child));
      nested.appendChild(childLi);
    });
    li.appendChild(nested);
    return li;
  }

  function makeLink(item) {
    var link = document.createElement("a");
    link.className = "toc-sidebar-link";
    link.href = "#" + item.id;
    link.textContent = item.text;
    return link;
  }
})();
