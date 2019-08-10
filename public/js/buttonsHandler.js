import {
    ClassHelper
} from './classHelper.js';

function ButtonsHandler() {}

ButtonsHandler.prototype.init = function (arr, handler) {
    arr.forEach(button => {
        button.addEventListener("click", handler);
    });
};

function renderInput(elem) {
    let title = elem.parentNode.parentNode.querySelector('.task__title');
    let titleInner = elem.parentNode.parentNode.querySelector('.task__inner');
    let buttons = elem.parentNode;
    ClassHelper.addClass('hidden', [title]);
    ClassHelper.addClass('hidden', buttons.children);
    let input = document.createElement('input');
    input.id = 'task__update';
    titleInner.appendChild(input);
    let button = document.createElement('button');
    button.classList.add('icon');
    button.classList.add('save');
    buttons.appendChild(button);
    let i = document.createElement('i');
    i.classList.add('material-icons');
    i.appendChild(document.createTextNode('save'));
    button.appendChild(i);
    button.addEventListener('click', onUpdate);
}

function onComplete() {
    console.log("post request is being sent...");
    fetch('/api/complete', {
            method: 'POST',
            body: JSON.stringify({
                id: this.parentNode.parentNode.dataset.id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function (response) {
            return response;
        })
        .catch(err => console.log(err));
    }

function onDelete() {
    console.log("delete request is being sent...");
    fetch('/api/delete', {
        method: 'DELETE',
        body: JSON.stringify({
            id: this.parentNode.parentNode.dataset.id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(function (response) {
        return response;
    })
    .catch(err => console.log(err));
}

function onEdit() {
    renderInput(this);
}

function onUpdate() {
    let input = document.getElementById('task__update');

    fetch('/api/update', {
        method: 'POST',
        body: JSON.stringify({
            id: this.parentNode.parentNode.dataset.id,
            value: input.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(function (response) {
        return response;
    })
    .catch(err => console.log(err));
}


function closeError() {
    ClassHelper.addClass('hidden', [this.parentNode]);
}

ButtonsHandler.onComplete = onComplete;
ButtonsHandler.onDelete = onDelete;
ButtonsHandler.onEdit = onEdit;
ButtonsHandler.closeError = closeError;

export {
    ButtonsHandler
};