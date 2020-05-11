(function () {
  const cardsList = document.querySelector(".places-list");
  const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".place-card");

  const addCardOpen = document.querySelector(".user-info__button");

  const regexpImageUrl = /^url\(\"(\S+)\"\)/;

  // Создаем попап для карточек
  const cardAddPopup = script.createPopup({
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

  // Функция-обработчик всех кликов по карточке
  function handleCardClick(event) {
    const target = event.target;
    if (target.classList.contains("place-card__like-icon")) {
      target.classList.toggle("place-card__like-icon_liked");
    }
    if (target.classList.contains("place-card__image")) {
      const bg = target.style["background-image"];
      const link = regexpImageUrl.exec(bg)[1];
      createImgContainer(link);
    }
    if (target.classList.contains("place-card__delete-icon")) {
      target.closest(".places-list").removeChild(target.closest(".place-card"));
    }
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

    script.root.insertAdjacentHTML("afterbegin", markup);
    const imgPopup = script.root.firstElementChild;
    const closeButton = document.querySelector(".image-popup__close");

    closeButton.addEventListener("click", () => {
      imgPopup.classList.toggle("image-popup_is-opened");
    });
  }

  // == Валидация ==

  // Список проверок для каждого инпута.
  const cardValidators = {
    name: [script.checkEmpty, script.checkLength],
    link: [script.checkEmpty, script.checkIsUrl],
  };

  // == Лисенеры ==

  // Добавляем дефолтные карточки
  insertCards(initialCards);

  cardsList.addEventListener("click", handleCardClick);

  cardAddPopup.insertAt(script.root);

  addCardOpen.addEventListener("click", cardAddPopup.togglePopup);
  cardAddPopup.closeButton.addEventListener(
    "click",
    script.handleClose(cardAddPopup)
  );
  cardAddPopup.form.addEventListener("submit", handleAddCard(cardAddPopup));

  cardAddPopup.form.addEventListener("submit", script.sendForm);

  script.setValidationEventListeners(cardAddPopup.form, cardValidators);
  // Отключаем кнопку, т.к. при создании поп апа инпуты пустые и
  // это не валидные входные данные
  script.makeDisabledSubmit(cardAddPopup.form);
})();
