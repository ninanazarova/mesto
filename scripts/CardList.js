"use strict";

class CardList {
  constructor(node) {
    this._node = node;
  }

  addCard = (element) => {
    this._node.append(element);
  };

  render = (cardsList) => {
    cardsList.forEach((card) => {
      this.addCard(card);
    });
  };
}
