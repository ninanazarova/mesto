"use strict";

class Popup {
  constructor({ node }) {
    this.popup = node;
    this._closeButton = this.popup.querySelector(".popup__close");
    this._closeButton.addEventListener("click", this.close);
  }

  open = () => {
    this.popup.classList.add("popup_is-opened");
  };

  onClose = (callback) => {
    this._onClose = callback;
  };

  close = () => {
    this.popup.classList.remove("popup_is-opened");
    if (this._onClose) {
      this._onClose();
    }
  };
}
