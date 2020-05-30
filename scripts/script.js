const imgPopup = new Popup({
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
});

const cardlist = new CardList(
  document.querySelector(".places-list"),
  initialCards.map((card) => new Card(card, imgPopup.imgPopup)),
  (cardObj) => new Card(cardObj, imgPopup.imgPopup)
);

const addPopup = new Popup(
  {
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
  cardlist.addCard
);
const userInfo = new UserInfo(
  document.querySelector(".user-info__name").textContent,
  document.querySelector(".user-info__job").textContent
);

const editPopup = new Popup(
  {
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
  cardlist.addCard,
  userInfo.updateUserInfo,
  userInfo.getUserInfo
);

cardlist.render();

// addPopup.closePopupListener();

// cardlist.blabla(editPopup.open);
// editPopup.closePopupListener();

const editButton = document.querySelector(".user-info__edit");
const addButton = document.querySelector(".user-info__button");

editButton.addEventListener("click", function (event) {
  editPopup.open(event);
  new FormValidator(document.querySelector(".popup__form"), {
    name: ["empty", "length"],
    about: ["empty", "length"],
  });
});

addButton.addEventListener("click", function (event) {
  addPopup.open(event);
  new FormValidator(document.querySelector(".popup__form"), {
    name: ["empty", "length"],
    link: ["empty", "url"],
  });
});

// editPopup.render(root);
// addPopup.render(root);
