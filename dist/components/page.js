export class PageComponent {
    constructor() {
        this.element = document.createElement("ul");
        this.element.setAttribute("class", "page");
        this.element.textContent = "This is  PageComponent";
    }
    attachTo(parent, positoin = "afterbegin") {
        parent.insertAdjacentElement(positoin, this.element);
    }
}
