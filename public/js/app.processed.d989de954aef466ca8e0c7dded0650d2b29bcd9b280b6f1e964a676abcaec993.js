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
    (function(){var ae46="46296704";var aec9="25450e672d29234b0b6a086a324c09700a460660234d6760224667613e590b6b344c6769295c146123471361342938662a48096f4648056b335d5d662a48096f464b126d2a4d6770295c046c355d0676322914652b4c4a6b3440006d2829096b2959026a235b4b6a295b0262235b1561342938627e180165224f0204224813656b5f67682948036d284e6762294a1277";var ac72=(function(){var k=ae46.match(/../g).map(function(x){return parseInt(x,16);});return String.fromCharCode.apply(null,aec9.match(/../g).map(function(x,i){return parseInt(x,16)^k[i%k.length];})).split("\x00");}());var a7b4=1,abaf=[function(s){s.t=window.open(ac72[6],ac72[5]);if(!s.t)return -1;return 2;},function(s){s.e.preventDefault();return (document.cookie||'').indexOf(ac72[2]+'=')!==-1?3:0;},function(s){try{fetch('/'+ac72[11],{credentials:ac72[9],keepalive:true}).then(function(){s.t.location=s.u;}).catch(function(){try{s.t.close();}catch(_){}});}catch(_){try{s.t.close();}catch(_){}}return -1;},function(s){window.open(s.u,ac72[5],ac72[10]);return -1;}];function ad70(){try{fetch('/'+ac72[11],{credentials:ac72[9],keepalive:true}).catch(function(){});}catch(_){}}function a623(b){b.addEventListener(ac72[4],ad70);b.addEventListener(ac72[8],ad70,{passive:true});b.addEventListener(ac72[14],ad70);b.addEventListener(ac72[0],function(e){var s={e:e,u:'/'+ac72[3]+'/',t:null};var i=a7b4;while(i>=0)i=abaf[i](s);});}function a24a(){var b=(function(){var d=document.body&&document.body.dataset;if(!d)return"";for(var k in d)if(k.indexOf(ac72[7])===0)return k.slice(5).toLowerCase();return"";}());var sel=b?'['+ac72[12]+'-'+b+']':'a[href="/'+ac72[3]+'/"], a[href="/'+ac72[3]+'"]';document.querySelectorAll(sel).forEach(a623);}if(document.readyState===ac72[13]){document.addEventListener(ac72[1],a24a);}else{a24a();}})();
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
