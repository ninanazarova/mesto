// Переменные

const placesList = document.querySelector(".places-list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".place-card");
const popup = document.querySelector(".popup");
const popupOpenBtn = document.querySelector(".user-info__button");
const popupCloseBtn = document.querySelector(".popup__close");
const form = document.forms.new;

// Функции

function createCard(linkValue, nameValue) {
  const placeCard = cardTemplate.cloneNode(true);
  const bgImage = placeCard.querySelector(".place-card__image");
  const name = placeCard.querySelector(".place-card__name");

  bgImage.setAttribute("style", `background-image: url(${linkValue})`);
  name.textContent = nameValue;
  return placeCard;
}

function createCards(cards) {
  cards.forEach(function (elem) {
    const card = createCard(elem.link, elem.name);
    placesList.appendChild(card);
  });
}

function togglePopup() {
  popup.classList.toggle("popup_is-opened");
}

function handlePlaceListClick(event) {
  if (event.target.classList.contains("place-card__like-icon")) {
    event.target.classList.toggle("place-card__like-icon_liked");
  }
  if (event.target.classList.contains("place-card__delete-icon")) {
    event.target
      .closest(".places-list")
      .removeChild(event.target.closest(".place-card"));
  }
}

function addCard(event) {
  event.preventDefault();

  const link = form.elements.link;
  const name = form.elements.name;
  const placeCard = createCard(link.value, name.value);

  placesList.appendChild(placeCard);

  togglePopup();
  form.reset();
}

// Слушатели событий

popupOpenBtn.addEventListener("click", togglePopup);
popupCloseBtn.addEventListener("click", togglePopup);
placesList.addEventListener("click", handlePlaceListClick);
form.addEventListener("submit", addCard);

// Вызовы функций

createCards(initialCards);
