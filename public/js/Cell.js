class Cell {
  constructor() {
    this.state = {
      completed: false
    };

    this.onWeekCompleted = this.onWeekCompleted.bind(this);

    this.td = document.createElement("td");
    this.td.addEventListener("click", this.onWeekCompleted);
  }

  onWeekCompleted() {
    this.state.completed
      ? (this.state.completed = false)
      : (this.state.completed = true);
    this.state.completed
      ? this.td.classList.add("completed")
      : this.td.classList.remove("completed");
  }
}

export { Cell };
