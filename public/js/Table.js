import { HTMLelements } from "./common.js";
import { Cell } from "./Cell.js";

function Table() {}

Table.prototype.createTable = function(parent) {
  for (let i = 0; i < 3; i++) {
    let tr = document.createElement("tr");

    for (let j = 0; j < 10; j++) {
      let td;
      if (j === 0) {
        td = document.createElement("td");
        let input = document.createElement("input");
        input.placeholder = "Add your stage here";
        td.classList.add("aim__first-td");
        td.appendChild(input);
      } else {
        td = new Cell().td;
      }
      tr.appendChild(td);
    }
    parent.appendChild(tr);
  }

  return parent;
};

Table.prototype.init = function() {
  HTMLelements.tbody.forEach(elem => this.createTable(elem));
};

export { Table };
