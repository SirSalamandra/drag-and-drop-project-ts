import { Project, ProjectStatus } from "../models/project";

type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

export class ProjectState extends State<Project> {
  private projects: Project[] = [];

  private static instance: ProjectState;

  private constructor() { super(); }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    else {
      this.instance = new ProjectState();
      return this.instance;
    }
  }

  public addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    )

    this.projects.push(newProject);
    this.updateListeners();
  }

  public moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find(x => x.id === projectId);

    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

export const projectState = ProjectState.getInstance();