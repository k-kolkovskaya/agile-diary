import { ButtonsHandler } from "./buttonsHandler.js";

const HTMLelements = {
  tbody: document.querySelectorAll(".aim__tbody"),
  save: document.querySelectorAll(".save.icon"),
  edit: document.querySelectorAll(".edit.icon"),
  delete: document.querySelectorAll(".delete.icon"),
  close: document.querySelectorAll(".icon_close")
};

let onCompleteClick = new ButtonsHandler();
onCompleteClick.init(HTMLelements.save, ButtonsHandler.onComplete);

let onCloseClick = new ButtonsHandler();
onCloseClick.init(HTMLelements.close, ButtonsHandler.closeError);

export { HTMLelements };
