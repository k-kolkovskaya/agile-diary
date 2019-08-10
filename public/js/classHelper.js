function addClass(className, elements) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.add(className);
  }
}

function removeClass(className, elements) {
  elements.forEach(function(element) {
    element.classList.remove(className);
  });
}

function toggleClassName() {
  let mode = this.dataset.mode;
  let elements = document.querySelectorAll(`.${mode}__item`);
  removeClass("active", elements);
  addClass("active", [this]);
}

function ClassHelper() {}
ClassHelper.addClass = addClass;
ClassHelper.removeClass = removeClass;
ClassHelper.toggleClassName = toggleClassName;

export { ClassHelper };
