// Переменные

const popupTemplate = document
  .querySelector("#popup-template")
  .content.querySelector(".popup");
const popup = document.querySelector(".popup");

function createPopup(args) {
  const popup = popupTemplate.cloneNode(true);

  // Заполняем шаблон данными
  popup.querySelector(".popup__title").textContent = args.title;

  const inputs = popup.querySelectorAll(".popup__input");
  inputs[0].classList.add(args.inputs[0].class);
  inputs[1].classList.add(args.inputs[1].class);

  inputs[0].setAttribute("placeholder", args.inputs[0].placeholder);
  inputs[1].setAttribute("placeholder", args.inputs[1].placeholder);

  popup.querySelector(".popup__button").textContent = args.buttonName;

  // Достаем кнопки и формы для конкретного попапа
  const closeButton = popup.querySelector(".popup__close");
  const form = popup.querySelector(".popup__form");

  return {
    closeButton,
    form,
    togglePopup: () => {
      popup.classList.toggle("popup_is-opened");
    },
    insertAt: (node) => {
      node.appendChild(popup);
    },
  };
}

// Слушатели событий
const root = document.querySelector(".root");

const addCardPopup = createPopup({
  title: "Новое место",
  buttonName: "+",
  inputs: [
    {
      class: "popup__input_type_name",
      placeholder: "Название",
    },
    {
      class: "popup__input_type_link-url",
      placeholder: "Ссылка на картинку",
    },
  ],
});

addCardPopup.insertAt(root);

addCardPopup.closeButton.addEventListener("click", addCardPopup.togglePopup);
addCardPopup.form.addEventListener("submit", addCardListener(addCardPopup));

const addCardOpen = document.querySelector(".user-info__button");
addCardOpen.addEventListener("click", addCardPopup.togglePopup);

// Вызовы функций

insertCards(initialCards);
