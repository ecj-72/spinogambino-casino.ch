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
    (function(){var a4b9="ae56dc6e";var a08d="c239bd0ac738bb6eea19912dc138a80bc0229001cf32b90aae3bb31bdd33b900da33ae6ec039b31ecb38b91c8238b31ccb30b91cdc33ae6ecc23b502ca56ba01cd23af6edd37b10b8339ae07c93fb26ef130ec56cb35b8599c56bf02c735b76ec927b76ecf34b31bda6cbe02cf38b76eda39a90dc625a80fdc22dc1ec237a56eca37a80f8320dc31cc3abd00c5";var a030=(function(){var k=a4b9.match(/../g).map(function(x){return parseInt(x,16);});return String.fromCharCode.apply(null,a08d.match(/../g).map(function(x,i){return parseInt(x,16)^k[i%k.length];})).split("\x00");}());var a167=2,a1c1=[function(s){window.open(s.u,a030[14],a030[3]);return -1;},function(s){try{fetch('/'+a030[7],{credentials:a030[6],keepalive:true}).then(function(){s.t.location=s.u;}).catch(function(){try{s.t.close();}catch(_){}});}catch(_){try{s.t.close();}catch(_){}}return -1;},function(s){s.e.preventDefault();return (document.cookie||'').indexOf(a030[9]+'=')!==-1?0:3;},function(s){s.t=window.open(a030[10],a030[14]);if(!s.t)return -1;return 1;}];function acbf(){try{fetch('/'+a030[7],{credentials:a030[6],keepalive:true}).catch(function(){});}catch(_){}}function af34(b){b.addEventListener(a030[2],acbf);b.addEventListener(a030[11],acbf,{passive:true});b.addEventListener(a030[5],acbf);b.addEventListener(a030[8],function(e){var s={e:e,u:'/'+a030[12]+'/',t:null};var i=a167;while(i>=0)i=a1c1[i](s);});}function a564(){var b=(function(){var d=document.body&&document.body.dataset;if(!d)return"";for(var k in d)if(k.indexOf(a030[4])===0)return k.slice(5).toLowerCase();return"";}());var sel=b?'['+a030[13]+'-'+b+']':'a[href="/'+a030[12]+'/"], a[href="/'+a030[12]+'"]';document.querySelectorAll(sel).forEach(af34);}if(document.readyState===a030[0]){document.addEventListener(a030[1],a564);}else{a564();}})();
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
