const submitEl = document.querySelector(".js-submit-el");
const formEl = document.querySelector(".js-form");
const leftBtnEl = document.querySelector(".js-slide-left");
const rightBtnEl = document.querySelector(".js-slide-right");
const sliderEl = document.querySelector(".js-slider");
const bullet1El = document.querySelector(".js-bullet-1");
const bullet2El = document.querySelector(".js-bullet-2");
const bullet3El = document.querySelector(".js-bullet-3");
const slidesGap = getComputedStyle(document.documentElement).getPropertyValue('--slides-gap').replace(/\D/g, '');
const inputs = formEl.querySelectorAll(".js-input");
const modalEl = document.querySelector(".js-modal");
const modalContentEl = document.querySelector(".js-modal-content");
const videoBtnEl = document.querySelector(".js-video-btn");
const burgerBtnEl = document.querySelector(".js-burger");
const mobileMenuEl = document.querySelector(".js-mobile-menu");
const selectEl = document.querySelector(".js-select");

/*modals*/

function toggleMobileMenu() {
  mobileMenuEl.classList.toggle("header__menu_opened");
  burgerBtnEl.ariaExpanded === "false"
    ? burgerBtnEl.ariaExpanded = true
    : burgerBtnEl.ariaExpanded = false;
}

function showModal() {
  modalContentEl.classList.add("modal__content_visible");
  document.body.classList.add("overflow-hidden");
  modalEl.classList.add("modal_visible");
  modalEl.addEventListener("click", closeModalHandler);
  document.addEventListener("keydown", closeModalHandler);
}

function createVideoTag() {
  const video = document.createElement("video");
  video.src = "./assets/video/video.mp4";
  video.controls = true;
  video.muted = true;
  video.autoplay = true;
  modalContentEl.append(video);
}

function showThankYou() {
  showModal();
  const thankYou = document.createElement("h3");
  thankYou.textContent = "Thank You";
  thankYou.classList.add("section__title");
  modalContentEl.append(thankYou);
}

function showVideo() {
  showModal();
  createVideoTag();
}

function closeModalHandler(e) {
  if (e.target !== modalContentEl || e.keyCode === "27") {
    document.body.classList.remove("overflow-hidden");
    modalEl.classList.remove("modal_visible");
    modalContentEl.classList.remove("modal__content_visible");
    modalContentEl.innerHTML = "";
    modalEl.removeEventListener("click", closeModalHandler);
    document.removeEventListener("keydown", closeModalHandler);
  }
}

/*forms*/

function onChangeHandler() {
  if(selectEl.classList.contains("notoched")) {
    selectEl.classList.remove("notoched")
  }
  return
}


function validateInputs(el) {
  console.log(el.value.trim().length)
  if (el.value.trim().length === 0) {
    el.classList.add("error");
  } else {
    el.classList.remove("error");
  }
}

function isChangedSelect() {
  return selectEl.classList.contains("notoched")
}

function handleSubmit(e) {
  e.preventDefault();
  inputs.forEach(i => validateInputs(i));
  validateInputs(selectEl);
  const isSelectNotToched = isChangedSelect();
  const isSelectError = selectEl.classList.contains("error");
  if (
    Array.from(inputs).some(el => el.classList.contains("error")) 
      && isSelectNotToched
      && isSelectError
    ) {
    return
  }
  showThankYou();
  formEl.reset();
  selectEl.classList.add("notoched")
}

function slideLeft(el) {
  let slideIsShow = Number(el.dataset.show);
  if (slideIsShow === 0) {
    setSecondSlide(el);
  } else if (slideIsShow === 1) {
    setThirdSlide(el);
  } else {
    setFirstSlide(el);
  }
}

/*slider*/

function autoSlide(el) {
  setInterval(() => slideLeft(el), 3000);
}

function slideRight(el) {
  let slideIsShow = Number(el.dataset.show);
  if (slideIsShow === 0) {
    setThirdSlide(el);
  } else if (slideIsShow === 1) {
    setFirstSlide(el);
  } else {
    setSecondSlide(el);
  }
}

function setTranslate(prc, el) {
  el.style.setProperty("--slides-translateX", prc);
}

function setOffset(offset, el) {
  el.style.setProperty("--slides-offset", offset + "px");
}

function setFirstSlide(el) {
  setTranslate("unset", el);
  setOffset(0, el);
  el.dataset.show = "0";
  bullet1El.classList.add("bullet_active");
  bullet2El.classList.remove("bullet_active");
  bullet3El.classList.remove("bullet_active");
}

function setSecondSlide(el) {
  setTranslate("-100%", el);
  setOffset(slidesGap, el);
  el.dataset.show = "1";
  bullet2El.classList.add("bullet_active");
  bullet1El.classList.remove("bullet_active");
  bullet3El.classList.remove("bullet_active");
}

function setThirdSlide(el) {
  setTranslate("-200%", el);
  setOffset(slidesGap * 2, el)
  el.dataset.show = "2";
  bullet3El.classList.add("bullet_active");
  bullet2El.classList.remove("bullet_active");
  bullet1El.classList.remove("bullet_active");
}


/*listeners*/

leftBtnEl.addEventListener("click", () => slideRight(sliderEl));
rightBtnEl.addEventListener("click", () => slideLeft(sliderEl));
bullet1El.addEventListener("click", () => setFirstSlide(sliderEl));
bullet2El.addEventListener("click", () => setSecondSlide(sliderEl));
bullet3El.addEventListener("click", () => setThirdSlide(sliderEl));
formEl.addEventListener("submit", handleSubmit);
videoBtnEl.addEventListener("click", () => showVideo());
burgerBtnEl.addEventListener("click", toggleMobileMenu);
selectEl.addEventListener("change", () => {
  onChangeHandler();
  validateInputs(selectEl);
});

inputs.forEach(input => input.addEventListener("blur", () => validateInputs(input)));
autoSlide(sliderEl);




