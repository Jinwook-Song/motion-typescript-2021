import { BaseComponent, Component } from "./../component.js";

export interface Composable {
  addChild(child: Component): void;
}

type OnCloseListener = () => void;
type DragState = "start" | "end" | "enter" | "leave";
type OnDragStateListener<T extends Component> = (
  target: T,
  state: DragState
) => void;

interface SectionContainer extends Component, Composable {
  setOnCloseListener(listener: OnCloseListener): void;
  setOnDragStateListener(listener: OnDragStateListener<SectionContainer>): void;
}

type SectionContainerConstructor = {
  new (): SectionContainer; // 생성자 정의
};

export class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements SectionContainer
{
  private closeListener?: OnCloseListener;
  private dragStateListener?: OnDragStateListener<PageItemComponent>;

  constructor() {
    super(`<li draggable="true" class="page-item">
            <section class="page-item__body"></section>
            <div class="page-item__controls">
              <button class="close">&times;</button>
            </div>
          </li>`);
    const closeBtn = this.element.querySelector(".close")! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };
    this.element.addEventListener("dragstart", (event: DragEvent) => {
      this.onDragStart(event);
    });
    this.element.addEventListener("dragend", (event: DragEvent) => {
      this.onDragEnd(event);
    });
    this.element.addEventListener("dragenter", (event: DragEvent) => {
      this.onDragEnter(event);
    });
    this.element.addEventListener("dragleave", (event: DragEvent) => {
      this.onDragLeave(event);
    });
  }
  onDragStart(_: DragEvent) {
    this.notifyObservers("start");
  }
  onDragEnd(_: DragEvent) {
    this.notifyObservers("end");
  }
  onDragEnter(_: DragEvent) {
    this.notifyObservers("enter");
  }
  onDragLeave(_: DragEvent) {
    this.notifyObservers("leave");
  }

  notifyObservers(state: DragState) {
    this.dragStateListener && this.dragStateListener(this, state);
  }

  addChild(child: Component) {
    const container = this.element.querySelector(
      ".page-item__body"
    )! as HTMLElement;
    child.attachTo(container);
  }
  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }
  setOnDragStateListener(listener: OnDragStateListener<PageItemComponent>) {
    this.dragStateListener = listener;
  }
}

export class PageComponent
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  constructor(private pageItemConstructor: SectionContainerConstructor) {
    super('<ul class="page"></ul>');
    this.element.addEventListener("dragover", (event: DragEvent) => {
      this.onDragOver(event);
    });
    this.element.addEventListener("drop", (event: DragEvent) => {
      this.onDrop(event);
    });
  }
  onDragOver(event: DragEvent) {
    event.preventDefault();
    console.log("over", event);
  }
  onDrop(event: DragEvent) {
    event.preventDefault();
    console.log("drop", event);
  }

  addChild(section: Component) {
    const item = new this.pageItemConstructor();
    item.addChild(section);
    item.attachTo(this.element, "beforeend");
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
    });
    item.setOnDragStateListener(
      (target: SectionContainer, state: DragState) => {
        console.log(target, state);
      }
    );
  }
}
