"use strict";

class CardList {
  constructor(node, initialCards, create) {
    this._node = node;
    this._cards = initialCards;
    this._create = create;
  }

  addCard = (element) => {
    this._node.append(element);
  };

  render = (createPopupImg) => {
    this._cards.forEach((elem) => {
      const card = this._create(elem, createPopupImg);
      this.addCard(card);
    });
  };
}
