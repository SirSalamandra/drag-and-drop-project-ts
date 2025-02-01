/// <reference path="base-component.ts" />

namespace App {
  // ProjectInput class
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputEl: HTMLInputElement;
    descriptionInputEl: HTMLInputElement;
    peopleInputEl: HTMLInputElement;

    constructor() {
      super("project-input", "app", "afterbegin", "user-input");

      this.titleInputEl = this.element.querySelector("#title")! as HTMLInputElement;
      this.descriptionInputEl = this.element.querySelector("#description")! as HTMLInputElement;
      this.peopleInputEl = this.element.querySelector("#people")! as HTMLInputElement;

      this.configure();
    }

    configure() {
      this.element.addEventListener("submit", this.submitHandler)
    }

    renderContent(): void { }

    private gatherUserInput(): [string, string, number] | void {
      const enteredTitle = this.titleInputEl.value;
      const enteredDescription = this.descriptionInputEl.value;
      const enteredPeople = this.peopleInputEl.value;

      const titleValidatable: Validatable = { value: enteredTitle, required: true }
      const descriptionValidatable: Validatable = { value: enteredTitle, required: true, minLength: 5 }
      const peopleValidatable: Validatable = { value: enteredTitle, required: true, min: 1, max: 5 }

      if (!validation(titleValidatable) && !validation(descriptionValidatable) && !validation(peopleValidatable)) {
        alert("invalid input");
        return;
      }
      else {
        return [enteredTitle, enteredDescription, +enteredPeople]
      }
    }

    private clearInputs() {
      this.titleInputEl.value = '';
      this.descriptionInputEl.value = '';
      this.peopleInputEl.value = '';
    }

    @autoBind
    private submitHandler(event: Event) {
      event.preventDefault();
      const userInput = this.gatherUserInput();

      if (Array.isArray(userInput) == true) {
        const [title, desc, people] = userInput;

        projectState.addProject(title, desc, people);

        this.clearInputs();
      }
    }
  }
}