const editProfileOpen = document.querySelector(".user-info__edit");

const editProfilePopup = createPopup({
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
  editProfilePopup.form[2].style["font-size"] = "18px";
}

// функция, которая переносит текущие данные в форму

function handleEditClick() {
  // получить текущие значения профиля
  const name = document.querySelector(".user-info__name").textContent;
  const about = document.querySelector(".user-info__job").textContent;

  // вставить в поп ап
  let nameInput = editProfilePopup.form.elements.name;
  let aboutInput = editProfilePopup.form.elements.about;

  nameInput.value = name;
  aboutInput.value = about;

  changeFontSize();
  editProfilePopup.togglePopup();
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

editProfilePopup.insertAt(root);

editProfileOpen.addEventListener("click", handleEditClick);

editProfilePopup.closeButton.addEventListener(
  "click",
  editProfilePopup.togglePopup
);
editProfilePopup.form.addEventListener(
  "submit",
  editProfileListener(editProfilePopup)
);
