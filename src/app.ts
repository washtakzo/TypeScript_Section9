function RenderForm(...args: any[]) {
  console.log(args);
}

class ProjectInput {
  private templateProjectInput: HTMLTemplateElement;
  private hostElement: HTMLDivElement;

  constructor() {
    this.templateProjectInput = document.getElementById(
      "project-input"
    ) as HTMLTemplateElement;

    this.hostElement = document.getElementById("app") as HTMLDivElement;
  }

  get getTemplateProjectInput() {
    return this.templateProjectInput;
  }

  get getHostElement() {
    return this.hostElement;
  }
}

class SingleProject {
  private templateSingleProject: HTMLTemplateElement;

  constructor() {
    this.templateSingleProject = document.getElementById(
      "single-template"
    )! as HTMLTemplateElement;
    console.log(this.templateSingleProject);
  }
}
