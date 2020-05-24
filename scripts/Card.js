"use strict";

class Card {
  static _template = document.querySelector("#card-template").content;
  constructor(obj) {
    this._name = obj.name;
    this._link = obj.link;
  }

  like(event) {
    event.target.classList.toggle("place-card__like-icon_liked");
  }

  remove(event) {
    event.target.closest(".place-card").remove();
  }

  render = (container) => {
    this._view = Card._template.cloneNode(true).children[0];

    const image = this._view.querySelector(".place-card__image");
    const name = this._view.querySelector(".place-card__name");

    image.setAttribute("style", `background-image: url(${this._link})`);
    name.textContent = this._name;

    container.append(this._view);
  };

  setEventListeners() {}
}
