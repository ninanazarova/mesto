"use strict";

class Popup {
  static _popupTemplate = document
    .querySelector("#popup-template")
    .content.querySelector(".popup");

  static _root = document.querySelector(".root");

  constructor(popupContent, addCard, updateUserInfo, getUserInfo) {
    this.addCard = addCard;
    this.updateUserInfo = updateUserInfo;
    this.getUserInfo = getUserInfo;
    this.popup = Popup._popupTemplate.cloneNode(true);
    this.form = this.popup.querySelector(".popup__form");
    // Заполняем шаблон данными
    this.popup.querySelector(".popup__title").textContent = popupContent.title;

    const inputs = this.popup.querySelectorAll(".popup__input");
    Array.from(inputs).forEach((input, i) => {
      input.setAttribute("name", popupContent.inputs[i].name);
      input.setAttribute("placeholder", popupContent.inputs[i].placeholder);

      //добавляем id для элементов с текстом ошибки
      const span = inputs[i].nextElementSibling;
      span.setAttribute("id", `${inputs[i].name}-error`);
    });

    this.popup.querySelector(".popup__button").textContent =
      popupContent.buttonName;
  }

  render = () => {
    Popup._root.append(this.popup);
  };

  imgPopup = (markup) => {
    this.popup.innerHTML = "";
    this.popup.appendChild(markup);
    this.popup.classList.add("popup_is-opened");
    this.render();
    this.setEventListeners();
  };

  editPopup = () => {
    this.popup.classList.add("popup_is-opened");
    this.popup.querySelector(".popup__button").style["font-size"] = "18px";

    this.form.lastElementChild.classList.add("popup__button_enabled");
    this.form.lastElementChild.removeAttribute("disabled", "disabled");
    const curUserInfo = this.getUserInfo();

    this.form.elements.name.value = curUserInfo.name;
    this.form.elements.about.value = curUserInfo.about;

    this.render();
    const submit = this.form.elements.submit;
    submit.addEventListener("click", (event) => {
      event.preventDefault();
      this.updateUserInfo(this.form);

      this.close();
    });
    this.setEventListeners();
  };

  addPopup = () => {
    this.popup.classList.add("popup_is-opened");

    this.render();
    const submit = this.form.elements.submit;
    submit.classList.remove("popup__button_enabled");
    submit.classList.add("popup__button_disabled");
    submit.addEventListener("click", (event) => {
      event.preventDefault();
      const name = this.form.elements.name.value;
      const link = this.form.elements.link.value;
      this.addCard({ name, link });
      this.form.reset();
      this.close();
    });
    this.setEventListeners();
  };

  open = (event) => {
    if (event.target === document.querySelector(".user-info__edit")) {
      this.editPopup();
    }
    if (event.target === document.querySelector(".user-info__button")) {
      this.addPopup();
    }
    if (event.target === document.querySelector(".place-card__image")) {
      this.imgPopup();
    }
  };

  close = () => {
    this.popup.classList.remove("popup_is-opened");
    this.popup.remove();

    this.form.reset();
    Array.from(this.form.querySelectorAll(".error")).forEach(
      (error) => (error.textContent = "")
    );
  };

  setEventListeners = () => {
    const closeButton = this.popup.querySelector(".popup__close");
    closeButton.addEventListener("click", this.close);
  };
}
