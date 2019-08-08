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

ButtonsHandler.onComplete = onComplete;

export { ButtonsHandler };
