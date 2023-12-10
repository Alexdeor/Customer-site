(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };
  // Check if Intersection Observer is supported
if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
  // Intersection Observer is supported
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("showText");
      } else {
        entry.target.classList.remove("showText");
      }
    });
  });

  const hiddenItems = document.querySelectorAll(".hiddenText");
  hiddenItems.forEach((el) => observer.observe(el));
} else {
  // Intersection Observer is not supported, set default class
  const hiddenItems = document.querySelectorAll(".hiddenText");
  hiddenItems.forEach((el) =>{
    el.classList.add("showText"); 
    el.classList.remove("hiddenText");
})

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    if (!header.classList.contains("fixed-top")) {
      offset += 70;
    }

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select("#header");
  let selectTopbar = select("#topbar");
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add("header-scrolled");
        if (selectTopbar) {
          selectTopbar.classList.add("topbar-scrolled");
        }
      } else {
        selectHeader.classList.remove("header-scrolled");
        if (selectTopbar) {
          selectTopbar.classList.remove("topbar-scrolled");
        }
      }
    };
    window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);
  }

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Mobile nav dropdowns activate
   */
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select("#navbar");
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });

  //Updates the work's section date
  const date = new Date();
  const workPeriod = document.querySelectorAll("#workPeriod");
  const monthData = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  function calculateYear(inputYear, endInputYear, dateDisplay) {
    dateDisplay.textContent = `- ${endInputYear - inputYear} Years`;
  }
  function calculateMonth(inputMonth, endInputMonth, dateDisplay) {
    const startMonth = monthData.indexOf(inputMonth);
    const endMonth = monthData.indexOf(endInputMonth);
    dateDisplay.textContent += ` ${endMonth - startMonth + 1} Months`;
  }

  function extractDom() {
    const startPeriod = document.querySelectorAll(".startDate");
    const endPeriod = document.querySelectorAll(".endDate");
    let cardDateDisplays = document.querySelectorAll(".dateDisplay");

    let filterStartMonth;
    let filterEndMonth;
    let filterStartYear;
    let filterEndYear;

    let i = 0;
    let j = 0;

    while (i < startPeriod.length && j < endPeriod.length) {
      const startDate = startPeriod[i].textContent;
      const endDate = endPeriod[j].textContent;
      const cardDateDisplay = cardDateDisplays[i];
      monthData.forEach((month) => {
        if (startDate.includes(month)) {
          filterStartMonth = month;
        }
        if (endDate.includes(month)) {
          filterEndMonth = month;
        }
      });

      if (startDate.match(/\b\d{4}\b/)) {
        filterStartYear = String(startDate.match(/\b\d{4}\b/));
      }
      if (endDate.includes("Present")) {
        filterEndYear = String(date.getFullYear());
        filterEndMonth = monthData[String(date.getMonth())];
      }
      if (endDate.match(/\b\d{4}\b/)) {
        filterEndYear = String(endDate.match(/\b\d{4}\b/));
      }

      // calculateYear(startYear.textContent, endYear.textContent);
      if (cardDateDisplay) {
        calculateYear(filterStartYear, filterEndYear, cardDateDisplay);
        calculateMonth(filterStartMonth, filterEndMonth, cardDateDisplay);
      }
      i++;
      j++;
    }
  }
  extractDom();
})();
