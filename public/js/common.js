import { ButtonsHandler } from "./buttonsHandler.js";

const HTMLelements = {
  tbody: document.querySelectorAll(".aim__tbody"),
  save: document.querySelectorAll(".save.icon"),
  edit: document.querySelectorAll(".edit.icon"),
  delete: document.querySelectorAll(".delete.icon")
};

let onButtonClick = new ButtonsHandler();
onButtonClick.init(HTMLelements.save, ButtonsHandler.onComplete);

export { HTMLelements };
