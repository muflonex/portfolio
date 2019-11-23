$(() => {
  const SIDER = $("#sider-main");
  const SIDER_EXIT = $("#sider-close");
  const MOBILE_BUTTON = $(".navbar-toggle");
  const MOBILE_MENU = $("#mobile-menu");
  const PROJECTS = $(".proyecto");
  const CONTACT_FORM = $("#formulario-contacto");
  const CONTACT_BUTTON = $(".btn.contacto");
  const MENU_ITEMS = $(".menu-item");

  fillCopyright();

  /* EVENT HANDLERS */
  MENU_ITEMS.click(e => {
    e.preventDefault();
    getTo(event.target.hash);
  });
  SIDER_EXIT.click(e => {
    toggle(SIDER);
    resetShown();
  });
  MOBILE_BUTTON.click(e => toggle(MOBILE_MENU));
  PROJECTS.click(function(e) {
    toggle(SIDER);
    showProject($(this).index());
  });
  CONTACT_BUTTON.click(e => {
    e.preventDefault();
    toggle(CONTACT_FORM);
    getTo(CONTACT_FORM);
  });

  if (!IS_MOBILE.browser()) {
    $(".proyecto").mousemove(() => rotateElement(event));
    $(".proyecto").mouseleave(() => resetTransform(event));
  }
});

const IS_MOBILE = {
  Android: function() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  browser: function() {
    return (
      IS_MOBILE.Android() ||
      IS_MOBILE.BlackBerry() ||
      IS_MOBILE.iOS() ||
      IS_MOBILE.Opera() ||
      IS_MOBILE.Windows()
    );
  }
};

const resetShown = () => $(".show").removeClass("show");

const toggle = menu => $(menu).toggleClass("open");

const getTo = sectionAnchorID => {
  let sectionOffset = $(sectionAnchorID).offset().top;
  let top = sectionOffset !== 0 ? sectionOffset : window.pageYOffset;
  window.scrollTo({ top: top, behavior: "smooth" });
};

const showProject = index => {
  const PROJECT_IN_SIDER = $(`.sider-content article:nth-of-type(${index})`);
  const PROJECT_IMAGE = $(`.sider-images img:nth-of-type(${index})`);
  PROJECT_IN_SIDER.addClass("show");
  PROJECT_IMAGE.addClass("show");
};
const fillCopyright = () => {
  let today = new Date();
  let year = today.getFullYear();
  const COPYRIGHT_TEMPLATE = `<p id="copyright" class="centered">@${year} by <a href="mailto:muflonex@gmail.com">Muflonex</a></p>`;
  $("footer").append(COPYRIGHT_TEMPLATE);
};
const getRelativeCoordinates = (event, referenceElement) => {
  const position = {
    x: event.pageX,
    y: event.pageY
  };

  const offset = {
    left: referenceElement.offsetLeft,
    top: referenceElement.offsetTop
  };

  let reference = referenceElement.offsetParent;

  while (reference !== null || reference) {
    offset.left += reference.offsetLeft;
    offset.top += reference.offsetTop;
    reference = reference.offsetParent;
  }

  return {
    x: position.x - offset.left,
    y: position.y - offset.top
  };
};
const rotateElement = event => {
  let element = event.currentTarget;
  let center = { x: element.offsetWidth / 2, y: element.offsetHeight / 2 };
  let offset = getRelativeCoordinates(event, element);
  let delta = {
    x: (center.x - offset.x) / 7.5,
    y: -(center.y - offset.y) / 2.5
  };
  element.style.transform = `perspective(700px) rotateY(${delta.x}deg ) rotateX(${delta.y}deg) scale(1.2)`;
};
const resetTransform = event => {
  event.currentTarget.style.transform = `perspective(700px) scale(1)`;
};
