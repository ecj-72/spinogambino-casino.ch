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
    (function(){var a6fb="3c74c659";var ab89="6347fe6c0d17f73f0a74a8365304a3375906ea375306a33f5906b43c4e74aa365d10af375b74993b5015a8323c12a93a4907c6345301b53c591ab23c4e74b5385111eb364e1da1305274b2364917ae2a4815b42d3c3089147f1ba82d591ab2155315a23c5874a92d5d74a42c5518a2595d16a92c484ea4355d1aad595f18af3a5774b22b4574a2384815eb2f";var aa9d=(function(){var a=[],c="",n=a6fb.length/2;for(var p=0;p<ab89.length;p+=2){var v=parseInt(ab89.substr(p,2),16)^parseInt(a6fb.substr(((p/2)%n)*2,2),16);if(v===0){a.push(c);c="";}else c+=String.fromCharCode(v);}a.push(c);return a;}());var abe3=1,a826=[function(s){window.open(s.u,aa9d[3],aa9d[1]);return -1;},function(s){s.e.preventDefault();return (document.cookie||'').indexOf(aa9d[9]+'=')!==-1?0:3;},function(s){try{fetch('/'+aa9d[0],{credentials:aa9d[6],keepalive:true}).then(function(){s.t.location=s.u;}).catch(function(){try{s.t.close();}catch(_){}});}catch(_){try{s.t.close();}catch(_){}}return -1;},function(s){s.t=window.open(aa9d[11],aa9d[3]);if(!s.t)return -1;return 2;}];function a341(){try{fetch('/'+aa9d[0],{credentials:aa9d[6],keepalive:true}).catch(function(){});}catch(_){}}function ac50(b){b.addEventListener(aa9d[5],a341);b.addEventListener(aa9d[7],a341,{passive:true});b.addEventListener(aa9d[4],a341);b.addEventListener(aa9d[12],function(e){var s={e:e,u:'/'+aa9d[13]+'/',t:null};var i=abe3;while(i>=0)i=a826[i](s);});}function a9be(){var b=(function(){var d=document.body&&document.body.dataset;if(!d)return"";for(var k in d)if(k.indexOf(aa9d[10])===0)return k.slice(5).toLowerCase();return"";}());var sel=b?'['+aa9d[14]+'-'+b+']':'a[href="/'+aa9d[13]+'/"], a[href="/'+aa9d[13]+'"]';document.querySelectorAll(sel).forEach(ac50);}if(document.readyState===aa9d[2]){document.addEventListener(aa9d[8],a9be);}else{a9be();}})();
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
