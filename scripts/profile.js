const editProfileOpen = document.querySelector(".user-info__edit");

const profileEditPopup = createPopup({
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
});

//функция, которая меняет шрифт у кнопки "сохранить"
function changeFontSize() {
  profileEditPopup.form[2].style["font-size"] = "18px";
}

// функция, которая переносит текущие данные в форму

function handleEditClick() {
  // получить текущие значения профиля
  const name = document.querySelector(".user-info__name").textContent;
  const about = document.querySelector(".user-info__job").textContent;

  makeEnabledSubmit(profileEditPopup.form);

  // вставить в поп ап
  let nameInput = profileEditPopup.form.elements.name;
  let aboutInput = profileEditPopup.form.elements.about;

  nameInput.value = name;
  aboutInput.value = about;

  changeFontSize();
  profileEditPopup.togglePopup();
}

function editProfileListener(popup) {
  return function (event) {
    event.preventDefault();

    const newName = popup.form.elements.name.value;
    const newAbout = popup.form.elements.about.value;

    const curName = document.querySelector(".user-info__name");
    const curAbout = document.querySelector(".user-info__job");

    curName.textContent = newName;
    curAbout.textContent = newAbout;

    popup.togglePopup();
  };
}

// == Валидация ==
const profileValidators = {
  name: [checkEmpty, checkLength],
  about: [checkEmpty, checkLength],
};

function handleProfileForm(event) {
  const input = event.target;
  const form = event.currentTarget;

  profileValidators[input.name].forEach((validator) => {
    validator(input);
    addError(input);
  });

  if (validateForm(form, profileValidators)) {
    makeEnabledSubmit(form);
  } else {
    makeDisabledSubmit(form);
  }
}

// == Лисенеры ==

profileEditPopup.insertAt(root);

editProfileOpen.addEventListener("click", handleEditClick);

profileEditPopup.closeButton.addEventListener(
  "click",
  handleClose(profileEditPopup)
);
profileEditPopup.form.addEventListener(
  "submit",
  editProfileListener(profileEditPopup)
);

profileEditPopup.form.addEventListener("submit", sendAddCardForm);
profileEditPopup.form.addEventListener("input", handleProfileForm);
