const cardsList = document.querySelector(".places-list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".place-card");

const addCardOpen = document.querySelector(".user-info__button");

const regexpImageUrl = /^url\(\"(\S+)\"\)/;

// Создаем попап для карточек
const cardAddPopup = createPopup({
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

function createCard(linkValue, nameValue) {
  const card = cardTemplate.cloneNode(true);
  const bgImage = card.querySelector(".place-card__image");
  const name = card.querySelector(".place-card__name");

  bgImage.setAttribute("style", `background-image: url(${linkValue})`);
  name.textContent = nameValue;
  return card;
}

function handleAddCard(popup) {
  return function (event) {
    event.preventDefault();

    const link = popup.form.elements.link;
    const name = popup.form.elements.name;
    const card = createCard(link.value, name.value);

    cardsList.appendChild(card);

    popup.togglePopup();
    popup.form.reset();
  };
}

// Функция для добавления карточки из data.js
function insertCards(cards) {
  cards.forEach(function (elem) {
    const card = createCard(elem.link, elem.name);
    cardsList.appendChild(card);
  });
}

function handleCardClick(event) {
  const target = event.target;
  if (target.classList.contains("place-card__like-icon")) {
    target.classList.toggle("place-card__like-icon_liked");
  }
  if (target.classList.contains("place-card__delete-icon")) {
    target.closest(".places-list").removeChild(target.closest(".place-card"));
  }
}

function handleCardClose(popup) {
  return function () {
    popup.togglePopup();
    popup.form.reset();
    // Удаляем спаны с ошибками при закрытии поп апа.
    Array.from(popup.form.querySelectorAll(".error")).forEach(
      (error) => (error.textContent = "")
    );
    makeDisabledSubmit(popup.form);
  };
}

// Открытие картинки при нажатии на карточку
function createImgContainer(linkValue) {
  const markup = `
  <div class="image-popup image-popup_is-opened">
    <div class="image-popup__container">
      <img src="${linkValue}" class="image-popup__image" />
      <img src="./images/close.svg" class="image-popup__close" />
    </div>
  </div>
  `;

  root.insertAdjacentHTML("afterbegin", markup);
  const imgPopup = root.firstElementChild;
  const closeButton = document.querySelector(".image-popup__close");

  closeButton.addEventListener("click", () => {
    imgPopup.classList.toggle("image-popup_is-opened");
  });
}

function sendAddCardForm(event) {
  event.preventDefault();
  event.target.reset();
  makeDisabledSubmit(event.currentTarget);
}

// == Валидация ==

// Список проверок для каждого инпута.
const cardValidators = {
  name: [checkEmpty, checkLength],
  link: [checkEmpty, checkIsUrl],
};

function validateCardForm(form) {
  const elements = [...form.elements];
  const inputs = elements.filter((input) => {
    return input.type !== "submit" && input.type !== "button";
  });

  return inputs.every((input) => {
    return cardValidators[input.name].every((validator) => {
      return validator(input);
    });
  });
}

// функция обрабатывает форму добавления карточки
function handlerCardAddForm(event) {
  const input = event.target;
  const form = event.currentTarget;

  cardValidators[input.name].forEach((validator) => {
    validator(input);
    addError(input);
  });

  if (validateCardForm(form)) {
    makeEnabledSubmit(form);
  } else {
    makeDisabledSubmit(form);
  }
}

// == Лисенеры ==

// Добавляем дефолтные карточки
insertCards(initialCards);

cardsList.addEventListener("click", handleCardClick);

cardAddPopup.insertAt(root);

addCardOpen.addEventListener("click", cardAddPopup.togglePopup);
cardAddPopup.closeButton.addEventListener(
  "click",
  handleCardClose(cardAddPopup)
);
cardAddPopup.form.addEventListener("submit", handleAddCard(cardAddPopup));

cardAddPopup.form.addEventListener("submit", sendAddCardForm);
cardAddPopup.form.addEventListener("input", handlerCardAddForm);

// Отключаем кнопку, т.к. при создании поп апа инпуты пустые и
// это не валидные входные данные
makeDisabledSubmit(cardAddPopup.form);
