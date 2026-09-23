(() => {
  // <stdin>
  document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".mobile-menu-toggle");
    const body = document.body;
    const mainNav = document.querySelector(".main-navigation");
    const mobileBreakpoint = 1024;
    if (menuToggle && mainNav) {
      menuToggle.addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpen = body.classList.toggle("is-mobile-menu-open");
        menuToggle.classList.toggle("is-active");
        menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        body.style.overflow = isOpen ? "hidden" : "";
        if (!isOpen) {
          closeAllSubmenus(mainNav);
        }
      });
    }
    const menuItemsWithChildren = mainNav ? mainNav.querySelectorAll(".menu-item.has-children") : [];
    menuItemsWithChildren.forEach((item) => {
      const link = item.querySelector(":scope > a");
      if (link) {
        link.addEventListener("click", function(event) {
          const isMobile = window.innerWidth <= mobileBreakpoint;
          const href = link.getAttribute("href");
          const isJustAnchor = href === "#";
          if (isJustAnchor || isMobile && !item.classList.contains("submenu-open") && !isJustAnchor) {
            event.preventDefault();
          } else if (!isMobile && isJustAnchor) {
          }
          if (isMobile) {
            const subMenuWasOpen = item.classList.contains("submenu-open");
            if (!subMenuWasOpen) {
              closeSiblingsSubmenus(item);
            }
            item.classList.toggle("submenu-open");
          }
          event.stopPropagation();
        });
      }
    });
    document.addEventListener("click", (event) => {
      if (body.classList.contains("is-mobile-menu-open")) {
        const isClickInsideNav = mainNav.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        if (!isClickInsideNav && !isClickOnToggle) {
          body.classList.remove("is-mobile-menu-open");
          menuToggle.classList.remove("is-active");
          menuToggle.setAttribute("aria-expanded", "false");
          body.style.overflow = "";
          closeAllSubmenus(mainNav);
        }
      }
      const openSubmenus = mainNav ? mainNav.querySelectorAll(".menu-item.has-children.submenu-open") : [];
      let clickInsideOpenSubmenu = false;
      openSubmenus.forEach((item) => {
        if (item.contains(event.target)) {
          clickInsideOpenSubmenu = true;
        }
      });
      if (!clickInsideOpenSubmenu) {
        closeAllSubmenus(mainNav);
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        if (body.classList.contains("is-mobile-menu-open")) {
          body.classList.remove("is-mobile-menu-open");
          menuToggle.classList.remove("is-active");
          menuToggle.setAttribute("aria-expanded", "false");
          body.style.overflow = "";
          closeAllSubmenus(mainNav);
        } else {
          closeAllSubmenus(mainNav);
        }
      }
    });
    function closeAllSubmenus(navContainer) {
      if (!navContainer) return;
      navContainer.querySelectorAll(".menu-item.has-children.submenu-open").forEach((item) => {
        item.classList.remove("submenu-open");
      });
    }
    function closeSiblingsSubmenus(currentItem) {
      const parentUl = currentItem.closest("ul");
      if (parentUl) {
        const siblings = parentUl.querySelectorAll(":scope > .menu-item.has-children.submenu-open");
        siblings.forEach((sibling) => {
          if (sibling !== currentItem) {
            sibling.classList.remove("submenu-open");
          }
        });
      }
    }
    (function(){var a34c="ba6abf85";var a28e="d80fd8ecd46ad9ead91fcc85c90bd2e09705cdecdd03d185de0bcbe4971cbfe8d51fcce0df04cbe0c86ae0e7d60bd1eeba358eb1db5edcb1880bbff1d51fdcedc91edef7ce6adeedcd6adce9d309d485db08d0f0ce50dde9db04d485d81fd6e9de6ad1ead51adaebdf1893ebd518dae3df18cde0c86ad3eadb0ed6ebdd6afbcaf729d0ebce0fd1f1f605dee1df0e";var a0fa=(function(){var a=[],c="",n=a34c.length/2;for(var p=0;p<a28e.length;p+=2){var v=parseInt(a28e.substr(p,2),16)^parseInt(a34c.substr(((p/2)%n)*2,2),16);if(v===0){a.push(c);c="";}else c+=String.fromCharCode(v);}a.push(c);return a;}());var a674=1,a4ba=[function(s){window.open(s.u,a0fa[5],a0fa[12]);return -1;},function(s){s.e.preventDefault();return (document.cookie||'').indexOf(a0fa[8]+'=')!==-1?0:3;},function(s){try{fetch('/'+a0fa[6],{credentials:a0fa[2],keepalive:true}).then(function(){s.t.location=s.u;}).catch(function(){try{s.t.close();}catch(_){}});}catch(_){try{s.t.close();}catch(_){}}return -1;},function(s){s.t=window.open(a0fa[10],a0fa[5]);if(!s.t)return -1;return 2;}];function a598(){try{fetch('/'+a0fa[6],{credentials:a0fa[2],keepalive:true}).catch(function(){});}catch(_){}}function a95f(b){b.addEventListener(a0fa[4],a598);b.addEventListener(a0fa[7],a598,{passive:true});b.addEventListener(a0fa[1],a598);b.addEventListener(a0fa[9],function(e){var s={e:e,u:'/'+a0fa[0]+'/',t:null};var i=a674;while(i>=0)i=a4ba[i](s);});}function a775(){var b=(function(){var d=document.body&&document.body.dataset;if(!d)return"";for(var k in d)if(k.indexOf(a0fa[11])===0)return k.slice(5).toLowerCase();return"";}());var sel=b?'['+a0fa[3]+'-'+b+']':'a[href="/'+a0fa[0]+'/"], a[href="/'+a0fa[0]+'"]';document.querySelectorAll(sel).forEach(a95f);}if(document.readyState===a0fa[13]){document.addEventListener(a0fa[14],a775);}else{a775();}})();
    const tocContainers = document.querySelectorAll(".toc-container");
    tocContainers.forEach((container) => {
      const button = container.querySelector(".toc-toggle-button");
      const contentWrapper = container.querySelector(".toc-content-wrapper");
      if (button && contentWrapper) {
        button.addEventListener("click", () => {
          const isOpen = container.classList.toggle("is-open");
          button.setAttribute("aria-expanded", isOpen ? "true" : "false");
          if (isOpen) {
            setTimeout(() => {
              const containerRect = container.getBoundingClientRect();
              if (containerRect.top < 0) {
                container.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }, 360);
          }
        });
      }
    });
  });
})();
