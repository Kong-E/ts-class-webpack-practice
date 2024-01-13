/// <reference path="base-component.ts" />

namespace App {
  export // ProjectList Class
  class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget
  {
    assignedProjects: any[];

    constructor(private type: "active" | "finished") {
      super("project-list", "app", false, `${type}-projects`);
      this.assignedProjects = [];

      this.configure();
      this.renderContent();
    }

    private renderProjects() {
      const listEl = <HTMLUListElement>(
        document.getElementById(`${this.type}-project-list`)!
      );
      listEl.innerHTML = "";
      for (const prjItem of this.assignedProjects) {
        new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
      }
    }

    @autobind
    dragOverHandler(event: DragEvent) {
      // 아무거나 드래그 앤 드롭 되는 것을 방지하기 위해
      if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
        event.preventDefault(); // drop할 수 있도록 허용
        const listEl = <HTMLUListElement>this.element.querySelector("ul")!;
        listEl.classList.add("droppable");
      }
    }

    @autobind
    dropHandler(event: DragEvent) {
      const prjId = event.dataTransfer!.getData("text/plain");
      projectState.moveProject(
        prjId,
        this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
      );

      // 드랍 이벤트가 발생한 후에 'droppable' 클래스를 제거
      const listEl = <HTMLUListElement>this.element.querySelector("ul")!;
      listEl.classList.remove("droppable");
    }

    @autobind
    dragLeaveHandler(_: DragEvent) {
      const listEl = <HTMLUListElement>this.element.querySelector("ul")!;
      listEl.classList.remove("droppable");
    }

    configure() {
      this.element.addEventListener("dragover", this.dragOverHandler);
      this.element.addEventListener("drop", this.dropHandler);
      this.element.addEventListener("dragleave", this.dragLeaveHandler);

      projectState.addListener((projects: Project[]) => {
        const relevantProjects = projects.filter((prj) => {
          if (this.type === "active") {
            return prj.status === ProjectStatus.Active;
          }
          return prj.status === ProjectStatus.Finished;
        });
        this.assignedProjects = relevantProjects;
        this.renderProjects();
      });
    }

    renderContent() {
      const listId = `${this.type}-project-list`;
      this.element.querySelector("ul")!.id = listId;
      this.element.querySelector("h2")!.textContent =
        this.type.toUpperCase() + " PROJECTS";
    }
  }
}
