"use strict";

class Card {
  constructor(
    template,
    { name, link, likesCount, id, isLikedByUser, isAddedByUser },
    onOpen,
    onRemove,
    onLike,
    onUnlike
  ) {
    this._template = template;
    this._name = name;
    this._link = link;
    this._likesCount = likesCount;
    this._id = id;
    this._isLikedByUser = isLikedByUser;
    this._isAddedByUser = isAddedByUser;
    this._onOpen = onOpen;
    this._onRemove = onRemove;
    this._onLike = onLike;
    this._onUnlike = onUnlike;
  }

  open = (event) => {
    event.stopPropagation();
    this._onOpen(this._link);
  };

  like = (event) => {
    event.stopPropagation();
    const card = event.target.closest(".place-card");

    if (event.target.classList.contains("place-card__like-icon_liked")) {
      this._onUnlike(this._id);
      this._likesCount--;
    } else {
      this._onLike(this._id);
      this._likesCount++;
    }
    this._updateLikes(card);
    event.target.classList.toggle("place-card__like-icon_liked");
  };

  _updateLikes = (card) => {
    const likeCounter = card.querySelector(".place-card__like-counter");
    likeCounter.textContent = this._likesCount;
  };

  remove = (event) => {
    this._onRemove(this._id);
    event.target.closest(".place-card").remove();

    this._deleteEventListeners();
  };

  create = () => {
    const card = this._template.cloneNode(true).children[0];
    const image = card.querySelector(".place-card__image");
    const name = card.querySelector(".place-card__name");
    const likeCounter = card.querySelector(".place-card__like-counter");
    likeCounter.textContent = this._likesCount;
    if (this._isLikedByUser) {
      card
        .querySelector(".place-card__like-icon")
        .classList.add("place-card__like-icon_liked");
    }
    if (this._isAddedByUser) {
      image.insertAdjacentHTML(
        "afterbegin",
        '<button class="place-card__delete-icon"></button>'
      );
    }
    image.setAttribute("style", `background-image: url(${this._link})`);
    name.textContent = this._name;
    this._updateLikes(card);
    this.setEventListeners(card);
    return card;
  };

  setEventListeners = (card) => {
    const likeButton = card.querySelector(".place-card__like-icon");
    const deleteButton = card.querySelector(".place-card__delete-icon");
    const openImage = card.querySelector(".place-card__image");
    openImage.addEventListener("click", this.open);
    likeButton.addEventListener("click", this.like);

    if (deleteButton) {
      deleteButton.addEventListener("click", (event) => {
        event.stopPropagation();
        if (window.confirm("Are you sure you want to delete?")) {
          this.remove(event);
        }
      });
    }

    this._deleteEventListeners = () => {
      openImage.removeEventListener("click", this.open);
      likeButton.removeEventListener("click", this.like);
      deleteButton.removeEventListener("click", this.remove);
    };
  };
}
