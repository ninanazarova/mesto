"use strict";

const api = new Api({
  baseUrl: "https://praktikum.tk/cohort11",
  headers: {
    authorization: "token",
    "Content-Type": "application/json",
  },
});

const imgPopup = new Popup({ node: document.querySelector(".image-popup") });
const imagePopupNode = document.querySelector(".popup__image");
const createPopupImg = (imgLink) => {
  imagePopupNode.src = imgLink;
  imgPopup.open();
};

const newCard = (elem, createPopupImg) => {
  const card = new Card(
    document.querySelector("#card-template").content,
    elem,
    createPopupImg
  );
  return card.create();
};

const placesList = new CardList(
  document.querySelector(".places-list"),
  newCard
);

api.getCards().then((cards) => {
  cards.forEach((card) => {
    const cardElement = newCard(
      { name: card.name, link: card.link },
      createPopupImg
    );
    placesList.addCard(cardElement);
  });
});

const deleteErrors = (form) => {
  const errorMessages = form.querySelectorAll(".error");
  Array.from(errorMessages).forEach((error) => (error.textContent = ""));
};

const addCardPopup = new Popup({
  node: document.querySelector(".add-card-popup"),
});

const addCardForm = addCardPopup.popup.querySelector(".popup__form");
addCardPopup.onClose(() => {
  addCardForm.reset();
  deleteErrors(addCardForm);
});

const addCardSubmit = addCardForm.elements.submit;
addCardSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  const name = addCardForm.elements.name.value;
  const link = addCardForm.elements.link.value;

  const card = newCard({ name, link }, createPopupImg);
  api.addCard(name, link).then((res) => {
    console.log(res);
  });
  placesList.addCard(card);

  addCardForm.reset();
  addCardPopup.close();
  deleteErrors(addCardForm);
});

const addCardButton = document.querySelector(".user-info__button");
addCardButton.addEventListener("click", (event) => {
  addCardSubmit.classList.remove("popup__button_enabled");
  addCardSubmit.setAttribute("disabled", "disabled");

  addCardPopup.open(event);
  new FormValidator(addCardForm);
});

const userInfo = new UserInfo();

const initialUserInfo = api.getUserInfo().then((data) => {
  userInfo.setUserInfo({ name: data.name, about: data.about });
  userInfo.updateUserInfo();
});

const editProfilePopup = new Popup({
  node: document.querySelector(".edit-profile-popup"),
});

const editProfileForm = editProfilePopup.popup.querySelector(".popup__form");
editProfilePopup.onClose(() => {
  deleteErrors(editProfileForm);
});

const editProfileSubmit = editProfileForm.elements.submit;

editProfileSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  const nameInput = editProfileForm.elements.name.value;
  const aboutInput = editProfileForm.elements.about.value;

  userInfo.setUserInfo({ name: nameInput, about: aboutInput });
  api.editUserInfo(nameInput, aboutInput);
  userInfo.updateUserInfo();
  editProfilePopup.close();
});

const editProfileButton = document.querySelector(".user-info__edit");
editProfileButton.addEventListener("click", (event) => {
  // вручную включаем кнопку submit при открытии поп апа редактирования профиля
  editProfileSubmit.classList.add("popup__button_enabled");
  editProfileSubmit.removeAttribute("disabled", "disabled");

  const curUserInfo = userInfo.getUserInfo();

  editProfileForm.elements.name.value = curUserInfo.name;
  editProfileForm.elements.about.value = curUserInfo.about;

  editProfilePopup.open(event);
  new FormValidator(editProfileForm);
});
