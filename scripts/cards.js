const cardsList = document.querySelector(".places-list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".place-card");

const addCardOpen = document.querySelector(".user-info__button");

// Создаем попап для карточек
const addCardPopup = createPopup({
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

function addCardListener(popup) {
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

// Добавляем карточки из data.js
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

cardsList.addEventListener("click", handleCardClick);

addCardPopup.insertAt(root);

addCardOpen.addEventListener("click", addCardPopup.togglePopup);
addCardPopup.closeButton.addEventListener("click", addCardPopup.togglePopup);
addCardPopup.form.addEventListener("submit", addCardListener(addCardPopup));

//Добавляем дефолтные карточки
insertCards(initialCards);
