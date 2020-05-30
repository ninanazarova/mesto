"use strict";

class Popup {
  static _popupTemplate = document
    .querySelector("#popup-template")
    .content.querySelector(".popup");

  static _root = document.querySelector(".root");

  constructor({ formContent, addCard, updateUserInfo, getUserInfo }) {
    this.addCard = addCard;
    this.updateUserInfo = updateUserInfo;
    this.getUserInfo = getUserInfo;
    this.popup = Popup._popupTemplate.cloneNode(true);

    if (formContent) {
      this._handleForm(formContent);
    }
  }

  _handleForm = (formContent) => {
    this.form = this.popup.querySelector(".popup__form");

    this.popup.querySelector(".popup__title").textContent = formContent.title;
    this.popup.querySelector(".popup__button").textContent =
      formContent.buttonName;

    const inputs = this.popup.querySelectorAll(".popup__input");
    Array.from(inputs).forEach((input, i) => {
      input.setAttribute("name", formContent.inputs[i].name);
      input.setAttribute("placeholder", formContent.inputs[i].placeholder);

      // добавляем id для элементов с текстом ошибки
      const span = inputs[i].nextElementSibling;
      span.setAttribute("id", `${inputs[i].name}-error`);
    });
  };

  render = () => {
    Popup._root.append(this.popup);
  };

  imagePopup = (node) => {
    this.popup.innerHTML = "";
    this.popup.appendChild(node);
    this.setEventListeners();

    this.render();
  };

  editProfilePopup = () => {
    const submit = this.form.elements.submit;

    submit.style["font-size"] = "18px";
    submit.classList.add("popup__button_enabled");
    submit.removeAttribute("disabled", "disabled");

    this._setSubmitListener(submit, (event) => {
      event.preventDefault();
      this.updateUserInfo(this.form);
      this.close();
    });

    const curUserInfo = this.getUserInfo();

    this.form.elements.name.value = curUserInfo.name;
    this.form.elements.about.value = curUserInfo.about;

    this.setEventListeners();

    this.render();
  };

  addCardPopup = () => {
    const submit = this.form.elements.submit;

    submit.classList.remove("popup__button_enabled");
    submit.classList.add("popup__button_disabled");

    this._setSubmitListener(submit, (event) => {
      event.preventDefault();
      const name = this.form.elements.name.value;
      const link = this.form.elements.link.value;
      this.addCard({ name, link });
      this.form.reset();
      this.close();
    });

    this.setEventListeners();

    this.render();
  };

  open = (event) => {
    if (event.target === document.querySelector(".user-info__edit")) {
      this.editProfilePopup();
    }
    if (event.target === document.querySelector(".user-info__button")) {
      this.addCardPopup();
    }
  };

  close = () => {
    this._removeEventListeners();
    this.popup.remove();

    if (this.form) {
      this.form.reset();
      Array.from(this.form.querySelectorAll(".error")).forEach(
        (error) => (error.textContent = "")
      );
    }
  };

  _setSubmitListener = (submit, listener) => {
    submit.addEventListener("click", listener);

    this.clearListeners = () => {
      submit.removeEventListener("click", listener);
    };
  };

  _removeEventListeners = () => {
    if (this.clearListeners) {
      this.clearListeners();
    }
  };

  setEventListeners = () => {
    const closeButton = this.popup.querySelector(".popup__close");
    closeButton.addEventListener("click", this.close);
  };
}
