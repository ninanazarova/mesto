"use strict";

class UserInfo {
  constructor(name, about) {
    this._name = name;
    this._about = about;
    this.updateUserInfo();
  }

  getUserInfo = () => {
    return { name: this._name, about: this._about, id: this._id };
  };

  setUserInfo = ({ name, about, id }) => {
    this._name = name;
    this._about = about;
    this._id = id;
  };

  updateAvatar = (link) => {
    document
      .querySelector(".user-info__photo")
      .setAttribute("style", `background-image: url(${link})`);
  };

  updateUserInfo = () => {
    document.querySelector(".user-info__name").textContent = this._name;
    document.querySelector(".user-info__job").textContent = this._about;
  };
}
