declare var tinymce: any;

export default class Card {
    
    private static maxIndex: number = 0;
    public static totalCards: number = 0;
    public static currentCards: number = 0;
    
    private readonly id: number;
    private width: number = 200;
    private height: number = 200;
    private isDragging: boolean = false;
    private isResizing: boolean = false;
    private positionX: number = 0;
    private positionY: number = 0;
    private text: string = ''; 

    constructor(id: number) {
        this.id = id;
        Card.totalCards++; 
    }

    createCard() {
        const cardDiv = document.createElement('div');
        cardDiv.style.zIndex = "0";
        cardDiv.addEventListener('mousedown', (event) => this.startDragging(event, cardDiv));
        cardDiv.addEventListener('mousedown', () => this.bringToFront(cardDiv));
        cardDiv.classList.add('card');
        cardDiv.id = `card-${this.id}`;
        cardDiv.style.position = 'absolute';
        cardDiv.style.left = "50px"
        cardDiv.style.top = "100px"
        cardDiv.style.width = `${this.width}px`;
        cardDiv.style.height = `${this.height}px`;

        const deleteButton = document.createElement('img');
        deleteButton.src = "../public/delete.svg";
        const resizeButton = document.createElement('img');
        resizeButton.src = "../public/resize.svg";
        const editButton = document.createElement('img');
        editButton.src = "../public/edit.svg";

        resizeButton.addEventListener('mousedown', () => this.bringToFront(cardDiv));
        deleteButton.addEventListener('click', () => this.delete());
        resizeButton.addEventListener('mousedown', (event) => this.startResizing(event)); // Changed to mousedown for resizing
        editButton.addEventListener('click', () => this.edit());

        deleteButton.id = "delete"
        resizeButton.id = "resize"
        editButton.id = "edit"

        deleteButton.draggable = false;
        resizeButton.draggable = false;
        editButton.draggable = false;


        const textArea = document.createElement('div'); // Using div for TinyMCE
        textArea.id = `text-${this.id}`;
        textArea.classList.add('text-area');
        textArea.textContent = this.text;
        
        cardDiv.appendChild(textArea);
        cardDiv.appendChild(deleteButton);
        cardDiv.appendChild(resizeButton);
        cardDiv.appendChild(editButton)

    
        const appDiv = document.querySelector<HTMLDivElement>('#cont');
        appDiv?.appendChild(cardDiv);

        document.addEventListener("mousemove", (event) => {
            this.dragCard(event);
            this.resizeCard(event, cardDiv); 
        });
        document.addEventListener("mouseup", () => this.stopActions());
        Card.currentCards++; 
    }

    delete() {
        document.getElementById(`card-${this.id}`)?.remove();
        Card.currentCards--; 
        document.getElementById('current-cards')!.textContent = `Current cards: ${Card.currentCards}`;

    }

    startResizing(event: MouseEvent) {
        event.stopPropagation(); 
        this.isResizing = true;
    }

    resizeCard(event: MouseEvent, cardElement: HTMLDivElement) {
        if (this.isResizing) {
            this.width = event.clientX - cardElement.getBoundingClientRect().left;
            this.height = event.clientY - cardElement.getBoundingClientRect().top;
            cardElement.style.width = `${this.width}px`;
            cardElement.style.height = `${this.height}px`;
        }
    }

    startDragging(event: MouseEvent, cardElement: HTMLDivElement) {
        this.isDragging = true;
        this.positionX = event.clientX - cardElement.getBoundingClientRect().left;
        this.positionY = event.clientY - cardElement.getBoundingClientRect().top;
    }

    dragCard(event: MouseEvent) {
        if (this.isDragging) {
            const cardElement = document.getElementById(`card-${this.id}`) as HTMLDivElement;
            cardElement.style.left = `${event.clientX - this.positionX}px`;
            cardElement.style.top = `${event.clientY - this.positionY}px`;
        }
    }

    stopActions() {
        this.isDragging = false;
        this.isResizing = false;
    }

    bringToFront(cardElement: HTMLDivElement) {
        cardElement.style.zIndex = (++Card.maxIndex).toString();
    }
    edit() {
        const modal = document.createElement('div');
        modal.classList.add('modal');
    
        const textArea = document.createElement('textarea');
        textArea.id = `editor-${this.id}`;
        modal.appendChild(textArea);
    
        const saveButton = document.createElement('button');
        saveButton.style.backgroundImage = "url('../public/save.svg')";
        saveButton.style.position = "absolute";
        saveButton.style.right = "68px";
        saveButton.style.bottom = "22px";
        modal.appendChild(saveButton);
    
        const closeButton = document.createElement('button');
        closeButton.style.backgroundImage = "url('../public/close.svg')";
        closeButton.style.position = "absolute";
        closeButton.style.right = "44px";
        closeButton.style.bottom = "22px";
        modal.appendChild(closeButton);
    
        document.body.appendChild(modal);
    
        tinymce.init({
            selector: `#editor-${this.id}`,
            menubar: true,
            toolbar: true,
            setup: editor => {
                editor.on('init', () => {
                    editor.setContent(this.text);
                });
            }

        });
    
        saveButton.addEventListener('click', () => {
            const editor = tinymce.get(`editor-${this.id}`);
            if (editor) {
                this.text = editor.getContent(); 
                document.querySelector(`#text-${this.id}`).innerHTML = this.text
                editor.remove();
            }
            modal.remove();
        });
    
        closeButton.addEventListener('click', () => {
            const editor = tinymce.get(`editor-${this.id}`);
            if (editor) {
                editor.remove();
            }
            modal.remove();
        });
    }
    
}
