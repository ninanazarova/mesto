"use strict";

class CardList {
  constructor(node, initialCards, create) {
    this._node = node;
    this._cards = initialCards;
    this._create = create;
  }

  addCard = (card) => {
    this._node.append(this._create(card).create());
  };

  render = () => {
    this._cards.forEach((card) => this._node.append(card.create()));
  };
}
