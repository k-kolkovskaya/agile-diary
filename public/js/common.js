import { ButtonsHandler } from "./buttonsHandler.js";
import { ClassHelper } from "./classHelper.js";
import { Table } from "./Table.js";

const HTMLelements = {
  tbody: document.querySelectorAll(".aim__tbody"),
  complete: document.querySelectorAll(".complete.icon"),
  edit: document.querySelectorAll(".edit.icon"),
  delete: document.querySelectorAll(".delete.icon"),
  close: document.querySelectorAll(".icon_close"),
  title: document.querySelectorAll(".task__title"),
  accordionItem: document.querySelectorAll(".accordion__item")
};

const onCompleteClick = new ButtonsHandler();
onCompleteClick.init(HTMLelements.complete, ButtonsHandler.onComplete);

const onDeleteClick = new ButtonsHandler();
onDeleteClick.init(HTMLelements.delete, ButtonsHandler.onDelete);

const onEditClick = new ButtonsHandler();
onEditClick.init(HTMLelements.edit, ButtonsHandler.onEdit);

const onCloseClick = new ButtonsHandler();
onCloseClick.init(HTMLelements.close, ButtonsHandler.closeError);

const accordion = new ButtonsHandler();
accordion.init(HTMLelements.accordionItem, ClassHelper.toggleClassName);

const table = new Table();
table.init();

export { HTMLelements };
