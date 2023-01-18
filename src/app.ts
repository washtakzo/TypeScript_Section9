interface Validatable {
  value: string | number;
  require?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

const validate = (validatableInput: Validatable) => {
  let isValid = true;
  if (validatableInput.require) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  if (
    validatableInput.minLength != null &&
    validatableInput.minLength &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length > validatableInput.minLength;
  }
  if (
    validatableInput.maxLength != null &&
    validatableInput.maxLength &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length < validatableInput.maxLength;
  }
  if (validatableInput.min && typeof validatableInput.value === "number") {
    isValid = isValid && +validatableInput.value > validatableInput.min;
  }
  if (validatableInput.max && typeof validatableInput.value === "number") {
    isValid = isValid && +validatableInput.value < validatableInput.max;
  }
  return isValid;
};

const AutoBind = (_: any, __: any, methodName: any) => {
  const originalMethod = methodName.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const fun = originalMethod.bind(this);
      return fun;
    },
  };
  return adjDescriptor;
};

class ProjectInput {
  private templateProjectInput: HTMLTemplateElement;
  private hostElement: HTMLDivElement;
  private element: HTMLFormElement;
  private titleInputElement: HTMLInputElement;
  private descriptionInputElement: HTMLInputElement;
  private peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateProjectInput = document.getElementById(
      "project-input"
    ) as HTMLTemplateElement;

    this.hostElement = document.getElementById("app") as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateProjectInput.content,
      true
    );

    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";

    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;
    //validate inputs
    if (
      !validate({
        value: enteredTitle,
        require: true,
        min: 1,
        max: 10,
      }) ||
      !validate({
        value: enteredDescription,
        require: true,
        minLength: 5,
        maxLength: 50,
      }) ||
      !validate({
        value: +enteredPeople,
        require: true,
        minLength: 5,
        maxLength: 50,
      })
    ) {
      alert("Invalide inputs");
      return;
    }
    //return a tuple with the inputs
    const inputs: [string, string, number] = [
      this.titleInputElement.value,
      this.descriptionInputElement.value,
      +this.peopleInputElement.value,
    ];

    return inputs;
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @AutoBind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInputs = this.gatherUserInput();
    if (Array.isArray(userInputs)) {
      console.log(userInputs);
      this.clearInputs();
    }
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const projectInput = new ProjectInput();
