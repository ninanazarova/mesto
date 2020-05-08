// Переменные

const popupTemplate = document
  .querySelector("#popup-template")
  .content.querySelector(".popup");
const popup = document.querySelector(".popup");

const root = document.querySelector(".root");

// {
//   title: "Редактировать страницу",
//   buttonName: "Сохранить",
//   inputs: [
//     {
//       name: "name",
//       placeholder: "Имя",
//     },
//     {
//       name: "about",
//       placeholder: "О себе",
//     },
//   ],
// }

//Функция, создающая поп апы

function createPopup(args) {
  const popup = popupTemplate.cloneNode(true);

  // Заполняем шаблон данными
  popup.querySelector(".popup__title").textContent = args.title;

  const inputs = popup.querySelectorAll(".popup__input");
  inputs[0].setAttribute("name", args.inputs[0].name);
  inputs[1].setAttribute("name", args.inputs[1].name);
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
