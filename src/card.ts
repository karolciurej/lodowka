export default class Card {
    id: number;
    width: number = 200;
    height: number = 200;
    isDragging: boolean = false;
    dragOffsetX: number = 0;
    dragOffsetY: number = 0;
    maxIndex: number = 0;

    constructor(id: number) {
        this.id = id;
    }

    createCard() {
        const cardDiv = document.createElement('div');
        cardDiv.style.zIndex = "0"
        cardDiv.addEventListener('mousedown', (event) => this.startDragging(event, cardDiv));
        cardDiv.addEventListener('click', () => this.bringToFront(cardDiv)); // Add click event listener
        cardDiv.classList.add('card');
        cardDiv.id = `card-${this.id}`;
        cardDiv.style.position = 'absolute';

        const deleteButton = document.createElement('img');
        deleteButton.id = "button";
        deleteButton.src = "../public/delete.svg";
        const resizeButton = document.createElement('img');
        resizeButton.id = "resize";
        resizeButton.src = "../public/resize.svg";
        deleteButton.addEventListener('click', () => {
            this.delete();
        });
        resizeButton.addEventListener('click', () => {
            this.resize();
        });
        cardDiv.appendChild(deleteButton);
        cardDiv.appendChild(resizeButton);

        const appDiv = document.querySelector<HTMLDivElement>('#cont');
        if (appDiv) {
            appDiv.appendChild(cardDiv);
        }

        document.addEventListener("mousemove", (event) => this.dragCard(event));
        document.addEventListener("mouseup", () => this.stopDragging());
    }

    delete() {
        const element = document.getElementById(`card-${this.id}`);
        element?.remove();
    }

    resize() {
        // Implement resize logic if needed
    }

    startDragging(event: MouseEvent, cardElement: HTMLDivElement) {
        this.isDragging = true;
        this.dragOffsetX = event.clientX - cardElement.getBoundingClientRect().left;
        this.dragOffsetY = event.clientY - cardElement.getBoundingClientRect().top;
    }

    dragCard(event: MouseEvent) {
        if (this.isDragging) {
            const cardElement = document.getElementById(`card-${this.id}`) as HTMLDivElement;
            cardElement.style.left = (event.clientX - this.dragOffsetX) + 'px';
            cardElement.style.top = (event.clientY - this.dragOffsetY) + 'px';
        }
    }

    stopDragging() {
        this.isDragging = false;
    }

    bringToFront(cardElement: HTMLDivElement) {
        console.log(cardElement.style.zIndex)
        cardElement.style.zIndex = (this.maxIndex + 1).toString();
        this.maxIndex++
        console.log(cardElement.style.zIndex)

    }
}
