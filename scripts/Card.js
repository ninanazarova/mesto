"use strict";

class Card {
  constructor(template, { name, link }, onOpen) {
    this._template = template;
    this._name = name;
    this._link = link;
    this._onOpen = onOpen;
  }

  open = (event) => {
    event.stopPropagation();
    this._onOpen(this._link);
  };

  like = (event) => {
    event.stopPropagation();
    event.target.classList.toggle("place-card__like-icon_liked");
  };

  remove = (event) => {
    event.stopPropagation();
    event.target.closest(".place-card").remove();

    this._deleteEventListeners();
  };

  create = () => {
    const card = this._template.cloneNode(true).children[0];
    const image = card.querySelector(".place-card__image");
    const name = card.querySelector(".place-card__name");

    image.setAttribute("style", `background-image: url(${this._link})`);
    name.textContent = this._name;
    this.setEventListeners(card);
    return card;
  };

  setEventListeners = (card) => {
    const likeButton = card.querySelector(".place-card__like-icon");
    const deleteButton = card.querySelector(".place-card__delete-icon");
    const openImage = card.querySelector(".place-card__image");
    openImage.addEventListener("click", this.open);
    likeButton.addEventListener("click", this.like);
    deleteButton.addEventListener("click", this.remove);

    this._deleteEventListeners = () => {
      openImage.removeEventListener("click", this.open);
      likeButton.removeEventListener("click", this.like);
      deleteButton.removeEventListener("click", this.remove);
    };
  };
}
