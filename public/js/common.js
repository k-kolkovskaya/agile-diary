import {
    Table
} from './Table.js';

const HTMLelements = {
    tbody: document.querySelectorAll('.aim__tbody')
};

let table = new Table();
table.init();

export {
    HTMLelements
};