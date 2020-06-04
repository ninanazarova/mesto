"use strict";

class FormValidator {
  _errorMessages = {
    empty: "Это обязательное поле",
    wrongLength: "Должно быть от 2 до 30 символов",
    wrongUrl: "Здесь должна быть ссылка",
  };

  constructor(form) {
    this._form = form;
    this.setEventListeners();
  }

  _addError = (input) => {
    const errorElem = input.parentNode.querySelector(`#${input.name}-error`);
    errorElem.textContent = input.validationMessage;
  };

  _checkEmpty = (input) => {
    input.setCustomValidity("");

    if (input.validity.valueMissing) {
      input.setCustomValidity(this._errorMessages.empty);
      return false;
    }

    return true;
  };

  _checkLength = (input) => {
    input.setCustomValidity("");
    input.setAttribute("minlength", "2");
    input.setAttribute("maxlength", "30");

    if (input.validity.tooShort || input.validity.tooLong) {
      input.setCustomValidity(this._errorMessages.wrongLength);
      return false;
    }
    return true;
  };

  _checkIsUrl = (input) => {
    input.setCustomValidity("");
    if (input.validity.typeMismatch) {
      input.setCustomValidity(this._errorMessages.wrongUrl);
      return false;
    }
    return true;
  };

  checkInputValidity = (input) => {
    const type = input.getAttribute("type");
    switch (type) {
      case "text":
        return this._checkEmpty(input) && this._checkLength(input);
      case "url":
        return this._checkEmpty(input) && this._checkIsUrl(input);
    }

    return true;
  };

  setSubmitButtonState = () => {
    const elements = [...this._form.elements];
    const inputs = elements.filter((input) => {
      return input.type !== "submit" && input.type !== "button";
    });
    const isValid = inputs.every((input) => this.checkInputValidity(input));
    if (isValid) {
      const submit = this._form.lastElementChild;
      submit.classList.add("popup__button_enabled");
      submit.removeAttribute("disabled", "disabled");
    } else {
      const submit = this._form.lastElementChild;
      submit.classList.remove("popup__button_enabled");
      submit.setAttribute("disabled", "disabled");
    }
  };

  setEventListeners = () => {
    this._form.addEventListener("input", (event) => {
      this.checkInputValidity(event.target);
      this._addError(event.target);
      this.setSubmitButtonState();
    });
  };
}
