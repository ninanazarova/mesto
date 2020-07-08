import "./index.css";
import { Api } from "../scripts/Api.js";
import { Card } from "../scripts/Card.js";
import { CardList } from "../scripts/CardList.js";
import { FormValidator } from "../scripts/FormValidator.js";
import { Popup } from "../scripts/Popup.js";
import { UserInfo } from "../scripts/UserInfo.js";

let initialSubmitText = "";
const renderLoading = (isLoading, submit) => {
  if (isLoading) {
    initialSubmitText = submit.textContent;
    submit.style.fontSize = "18px";
    submit.textContent = "Загрузка...";
  } else {
    submit.style.fontSize = "36px";
    submit.textContent = initialSubmitText;
  }
};

const api = new Api({
  baseUrl: "https://praktikum.tk/cohort11",
  headers: {
    authorization: "2ac7f944-90d6-45e2-acd0-f299480fc199",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo();

api
  .getUserInfo()
  .then((data) => {
    userInfo.setUserInfo({
      name: data.name,
      about: data.about,
      id: data._id,
    });
    userInfo.updateAvatar(data.avatar);
    userInfo.updateUserInfo();
  })
  .catch((err) => {
    console.log(err);
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
    createPopupImg,
    api.deleteCard,
    api.likeCard,
    api.unlikeCard
  );
  return card.create();
};

const placesList = new CardList(
  document.querySelector(".places-list"),
  newCard
);

api
  .getCards()
  .then((cards) => {
    const cardsList = [];
    cards.forEach((card) => {
      const isLikedByUser = card.likes.some(
        (like) => like._id === userInfo.getUserInfo().id
      );
      const isAddedByUser = card.owner._id === userInfo.getUserInfo().id;
      const cardElement = newCard(
        {
          name: card.name,
          link: card.link,
          id: card._id,
          isLikedByUser: isLikedByUser,
          isAddedByUser: isAddedByUser,
          likesCount: card.likes.length,
          owner: card.owner,
        },
        createPopupImg
      );
      cardsList.push(cardElement);
    });
    placesList.render(cardsList);
  })
  .catch((err) => {
    console.log(err);
  });

const deleteErrors = (form) => {
  const errorMessages = form.querySelectorAll(".error");
  Array.from(errorMessages).forEach((error) => (error.textContent = ""));
};

// ПОП АП КАРТОЧКИ ===============================================================

const addCardPopup = new Popup({
  node: document.querySelector(".add-card-popup"),
});
const addCardForm = addCardPopup.popup.querySelector(".popup__form");
const addCardButton = document.querySelector(".user-info__button");
const addCardSubmit = addCardForm.elements.submit;

addCardPopup.onClose(() => {
  addCardForm.reset();
  deleteErrors(addCardForm);
});

addCardButton.addEventListener("click", (event) => {
  addCardSubmit.classList.remove("popup__button_enabled");
  addCardSubmit.setAttribute("disabled", "disabled");

  addCardPopup.open(event);
  new FormValidator(addCardForm);
});

addCardSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  renderLoading(true, addCardSubmit);
  const name = addCardForm.elements.name.value;
  const link = addCardForm.elements.link.value;

  api
    .addCard(name, link)
    .then((res) => {
      const card = newCard(
        { name, link, id: res._id, likesCount: 0, isAddedByUser: true },
        createPopupImg
      );
      placesList.addCard(card);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addCardForm.reset();
      addCardPopup.close();
      deleteErrors(addCardForm);
      renderLoading(false, addCardSubmit);
    });
});

// ПОП АП АВАТАРА ===============================================================

const editAvatarPopup = new Popup({
  node: document.querySelector(".edit-avatar-popup"),
});
const editAvatarForm = editAvatarPopup.popup.querySelector(".popup__form");
const avatar = document.querySelector(".user-info__photo");
const editAvatarSubmit = editAvatarForm.elements.submit;

editAvatarPopup.onClose(() => {
  deleteErrors(editAvatarForm);
});

avatar.addEventListener("click", (event) => {
  editAvatarSubmit.classList.remove("popup__button_enabled");
  editAvatarSubmit.setAttribute("disabled", "disabled");

  editAvatarPopup.open(event);
  new FormValidator(editAvatarForm);
});

editAvatarSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  renderLoading(true, editAvatarSubmit);
  const link = editAvatarForm.elements.link.value;
  api
    .updateAvatar(link)
    .then(() => {
      userInfo.updateAvatar(link);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editAvatarForm.reset();
      editAvatarPopup.close();
      renderLoading(false, editAvatarSubmit);
    });
});

// ПОП АП ПРОФИЛЯ ===============================================================

const editProfilePopup = new Popup({
  node: document.querySelector(".edit-profile-popup"),
});
const editProfileForm = editProfilePopup.popup.querySelector(".popup__form");
const editProfileButton = document.querySelector(".user-info__edit");
const editProfileSubmit = editProfileForm.elements.submit;

editProfilePopup.onClose(() => {
  deleteErrors(editProfileForm);
});

editProfileButton.addEventListener("click", (event) => {
  editProfileSubmit.classList.add("popup__button_enabled");
  editProfileSubmit.removeAttribute("disabled", "disabled");

  const curUserInfo = userInfo.getUserInfo();

  editProfileForm.elements.name.value = curUserInfo.name;
  editProfileForm.elements.about.value = curUserInfo.about;

  editProfilePopup.open(event);
  new FormValidator(editProfileForm);
});

editProfileSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  const nameInput = editProfileForm.elements.name.value;
  const aboutInput = editProfileForm.elements.about.value;
  renderLoading(true, editProfileSubmit);

  api
    .editUserInfo(nameInput, aboutInput)
    .then((data) => {
      userInfo.setUserInfo({ name: data.name, about: data.about });

      document.querySelector(
        ".user-info__name"
      ).textContent = userInfo.getUserInfo().name;
      document.querySelector(
        ".user-info__job"
      ).textContent = userInfo.getUserInfo().about;
      editProfilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, editProfileSubmit);
    });
});
