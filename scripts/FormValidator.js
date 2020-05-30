class FormValidator {
  static _errorMessages = {
    empty: "Это обязательное поле",
    wrongLength: "Должно быть от 2 до 30 символов",
    wrongUrl: "Здесь должна быть ссылка",
  };

  constructor(form, validators) {
    this._form = form;
    // {
    //   name: ["empty", "length"],
    //   about: ["empty", "length"],
    // }

    // {
    //   name: ["empty", "length"],
    //   link: ["empty", "url"],
    // }
    this._validators = validators;
    this.setEventListeners();
  }

  static _addError = (input) => {
    const errorElem = input.parentNode.querySelector(`#${input.name}-error`);
    errorElem.textContent = input.validationMessage;
  };

  static _checkEmpty = (input) => {
    input.setCustomValidity("");

    if (input.validity.valueMissing) {
      input.setCustomValidity(FormValidator._errorMessages.empty);
      return false;
    }

    return true;
  };

  static _checkLength = (input) => {
    input.setCustomValidity("");
    input.setAttribute("minlength", "2");
    input.setAttribute("maxlength", "30");

    if (input.validity.tooShort || input.validity.tooLong) {
      input.setCustomValidity(FormValidator._errorMessages.wrongLength);
      return false;
    }
    return true;
  };

  static _checkIsUrl = (input) => {
    input.setCustomValidity("");
    input.setAttribute("type", "url");
    if (input.validity.typeMismatch && input.type === "url") {
      input.setCustomValidity(FormValidator._errorMessages.wrongUrl);
      return false;
    }
    return true;
  };

  checkInputValidity = (input) => {
    const isValid = this._validators[input.name].every((validator) => {
      switch (validator) {
        case "url":
          return FormValidator._checkIsUrl(input);
        case "length":
          return FormValidator._checkLength(input);
        case "empty":
          return FormValidator._checkEmpty(input);
      }
    });

    return isValid;
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
      FormValidator._addError(event.target);
      this.setSubmitButtonState();
    });
  };
}
