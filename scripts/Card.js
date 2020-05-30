"use strict";

class Card {
  static _template = document.querySelector("#card-template").content;
  static _imgTemplate = document.querySelector("#image-template").content;
  constructor(obj, onOpen) {
    this._name = obj.name;
    this._link = obj.link;
    this._onOpen = onOpen;
  }

  open = () => {
    const imageContainer = Card._imgTemplate.cloneNode(true).children[0];
    const image = imageContainer.querySelector(".image-popup__image");

    image.setAttribute("src", this._link);
    this._onOpen(imageContainer);
  };

  like(event) {
    event.target.classList.toggle("place-card__like-icon_liked");
  }

  remove(event) {
    event.stopPropagation();
    event.target.closest(".place-card").remove();
  }

  create = () => {
    const card = Card._template.cloneNode(true).children[0];

    const image = card.querySelector(".place-card__image");
    const name = card.querySelector(".place-card__name");

    image.setAttribute("style", `background-image: url(${this._link})`);
    name.textContent = this._name;
    this.setEventListeners(card);
    return card;
  };

  setEventListeners(card) {
    const likeButton = card.querySelector(".place-card__like-icon");
    const deleteButton = card.querySelector(".place-card__delete-icon");
    const openImage = card.querySelector(".place-card__image");
    openImage.addEventListener("click", this.open);
    likeButton.addEventListener("click", this.like);
    deleteButton.addEventListener("click", this.remove);
  }
}
