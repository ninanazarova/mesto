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

  //добавляем id для элементов с текстом ошибки
  const spanID = inputs[0].nextElementSibling;
  const spanID1 = inputs[1].nextElementSibling;
  spanID.setAttribute("id", `${inputs[0].name}-error`);
  spanID1.setAttribute("id", `${inputs[1].name}-error`);

  popup.querySelector(".popup__button").textContent = args.buttonName;

  // Кнопки и формы для конкретного попапа
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
// Тексты ошибок

const errorMessages = {
  empty: "Это обязательное поле",
  wrongLength: "Должно быть от 2 до 30 символов",
  wrongUrl: "Здесь должна быть ссылка",
};

// Функции-валидаторы полей формы

function checkEmpty(input) {
  input.setCustomValidity("");

  if (input.validity.valueMissing) {
    input.setCustomValidity(errorMessages.empty);
    return false;
  }

  return true;
}

function checkLength(input) {
  input.setCustomValidity("");
  input.setAttribute("minlength", "2");
  input.setAttribute("maxlength", "30");

  if (input.validity.tooShort || input.validity.tooLong) {
    input.setCustomValidity(errorMessages.wrongLength);
    return false;
  }
  return true;
}

function checkIsUrl(input) {
  input.setCustomValidity("");
  input.setAttribute("type", "url");
  if (input.validity.typeMismatch && input.type === "url") {
    input.setCustomValidity(errorMessages.wrongUrl);
    return false;
  }
  return true;
}

// Функция добавления/удаления ошибки с инпута

function addError(input) {
  const errorElem = input.parentNode.querySelector(`#${input.name}-error`);
  errorElem.textContent = input.validationMessage;
}

// Функции включают и отключают кнопку отправки формы

function makeEnabledSubmit(form) {
  const submit = form.lastElementChild;
  submit.classList.add("popup__button_enabled");
  submit.removeAttribute("disabled", "disabled");
}

function makeDisabledSubmit(form) {
  const submit = form.lastElementChild;
  submit.classList.remove("popup__button_enabled");
  submit.setAttribute("disabled", "disabled");
}
