import {ClassHelper} from './classHelper.js';

function ButtonsHandler() {}

ButtonsHandler.prototype.init = function(arr, handler) {
  arr.forEach(button => {
    button.addEventListener("click", handler);
  });
};

function onComplete() {
    fetch('/api/complete', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        }
    })
        .then(function(response) {
            return response;
        })
        .catch(err => console.log(err));
}

function closeError() {
    ClassHelper.addClass('hidden', [this.parentNode]);
}

ButtonsHandler.onComplete = onComplete;
ButtonsHandler.closeError = closeError;

export { ButtonsHandler };
