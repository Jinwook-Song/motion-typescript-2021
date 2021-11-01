import { InputDialog, } from "./components/dialog/dialog.js";
import { MediaSectionInput } from "./components/dialog/input/media-input.js";
import { TextSectionInput } from "./components/dialog/input/text-input.js";
import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponent } from "./components/page/item/video.js";
import { PageComponent, PageItemComponent, } from "./components/page/page.js";
class App {
    constructor(appRoot, dialogRoot) {
        this.dialogRoot = dialogRoot;
        this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(appRoot);
        this.bindElementToDialog("#new-image", MediaSectionInput, (input) => new ImageComponent(input.title, input.url));
        this.bindElementToDialog("#new-video", MediaSectionInput, (input) => new VideoComponent(input.title, input.url));
        this.bindElementToDialog("#new-note", TextSectionInput, (input) => new NoteComponent(input.title, input.body));
        this.bindElementToDialog("#new-todo", TextSectionInput, (input) => new TodoComponent(input.title, input.body));
        this.page.addChild(new ImageComponent("Image Title", "https://picsum.photos/800/500"));
        this.page.addChild(new VideoComponent("Video Title", "https://www.youtube.com/watch?v=ytyJgnfb40Q&ab_channel=%EC%B9%A8%EC%B0%A9%EB%A7%A8"));
        this.page.addChild(new NoteComponent("Note Title", "Coding"));
        this.page.addChild(new TodoComponent("Todo Title", "Typescript Course"));
        this.page.addChild(new ImageComponent("Image Title", "https://picsum.photos/800/400"));
        this.page.addChild(new VideoComponent("Video Title", "https://www.youtube.com/watch?v=ytyJgnfb40Q&ab_channel=%EC%B9%A8%EC%B0%A9%EB%A7%A8"));
        this.page.addChild(new NoteComponent("Note Title", "Coding"));
        this.page.addChild(new TodoComponent("Todo Title", "Typescript Course"));
    }
    bindElementToDialog(selector, InputComponent, makeSection) {
        const element = document.querySelector(selector);
        element.addEventListener("click", () => {
            const dialog = new InputDialog();
            const input = new InputComponent();
            dialog.addChild(input);
            dialog.attachTo(this.dialogRoot);
            dialog.setOnCloseListener(() => {
                dialog.removeFrom(this.dialogRoot);
            });
            dialog.setOnSubmitListener(() => {
                const inputData = makeSection(input);
                this.page.addChild(inputData);
                dialog.removeFrom(this.dialogRoot);
            });
        });
    }
}
new App(document.querySelector(".document"), document.body);
