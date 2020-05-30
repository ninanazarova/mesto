"use strict";

const imgPopup = new Popup({});

const cardlist = new CardList(
  document.querySelector(".places-list"),
  initialCards.map((card) => new Card(card, imgPopup.imagePopup)),
  (card) => new Card(card, imgPopup.imagePopup)
);

cardlist.render();

const addCardPopup = new Popup({
  formContent: {
    title: "Новое место",
    buttonName: "+",
    inputs: [
      {
        name: "name",
        placeholder: "Название",
      },
      {
        name: "link",
        placeholder: "Ссылка на картинку",
      },
    ],
  },
  addCard: cardlist.addCard,
});

const userInfo = new UserInfo(
  document.querySelector(".user-info__name").textContent,
  document.querySelector(".user-info__job").textContent
);

const editProfilePopup = new Popup({
  formContent: {
    title: "Редактировать страницу",
    buttonName: "Сохранить",
    inputs: [
      {
        name: "name",
        placeholder: "Имя",
      },
      {
        name: "about",
        placeholder: "О себе",
      },
    ],
  },
  updateUserInfo: userInfo.updateUserInfo,
  getUserInfo: userInfo.getUserInfo,
});

const editProfileButton = document.querySelector(".user-info__edit");
const addCardButton = document.querySelector(".user-info__button");

editProfileButton.addEventListener("click", (event) => {
  editProfilePopup.open(event);
  new FormValidator(document.querySelector(".popup__form"), {
    name: ["empty", "length"],
    about: ["empty", "length"],
  });
});

addCardButton.addEventListener("click", (event) => {
  addCardPopup.open(event);
  new FormValidator(document.querySelector(".popup__form"), {
    name: ["empty", "length"],
    link: ["empty", "url"],
  });
});
