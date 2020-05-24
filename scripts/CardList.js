"use strict";

class CardList {
  static _template = document.querySelector("#cardlist-template").content;

  constructor(cards, createCard) {
    this._cards = cards;
    this._createCard = createCard;
  }

  render = (container) => {
    this._view = CardList._template.cloneNode(true).children[0];
    container.append(this._view);
    this._cards.forEach((item) => {
      this._createCard(item).render(this._view);
    });
  };
}
