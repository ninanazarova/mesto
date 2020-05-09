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

profileEditPopup.insertAt(root);

editProfileOpen.addEventListener("click", handleEditClick);

profileEditPopup.closeButton.addEventListener(
  "click",
  profileEditPopup.togglePopup
);
profileEditPopup.form.addEventListener(
  "submit",
  editProfileListener(profileEditPopup)
);
