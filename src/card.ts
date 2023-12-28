declare var tinymce;

export default class Card {
    private static maxIndex: number = 0;
    public static totalCards: number = 0;
    public static currentCards: number = 0;
    private static readonly min: number = 200;
    private readonly id: string;
    private width: number = 200;
    private height: number = 200;
    private isDragging: boolean = false;
    private isResizing: boolean = false;
    private positionX: number = 50;
    private positionY: number = 150;
    private initialResizeX: number = 0;
    private initialResizeY: number = 0;
    private text: string = ''; 
    private fridgeName: string;
    private left: number = 0;
    private top: number = 0;
    private zindex: number = 0;
    private deleted: boolean = false;

    constructor(id:string, positionX: number, positionY: number, height: number, width: number, text: string, zindex: number, fridgeName: string) {
        
        this.positionX = positionX;
        this.positionY = positionY;
        this.left = positionX;
        this.top = positionY;
        this.height = height;
        this.width = width;
        this.text = text;
        this.zindex = zindex;
        this.fridgeName = fridgeName;
        Card.maxIndex = Math.max(Card.maxIndex, zindex);
        if(id==""){
            this.id = generateUUID(); 
        }else{
            this.id = id;
        }
    }
    

    createCard() {
        const cardDiv = document.createElement('div');
        this.bringToFront(cardDiv)
        cardDiv.style.zIndex = "0";
        cardDiv.addEventListener('mousedown', (event) => this.startDragging(event, cardDiv));
        cardDiv.addEventListener('mousedown', () => this.bringToFront(cardDiv));
        cardDiv.classList.add('card');
        cardDiv.id = `card-${this.id}`;
        cardDiv.style.position = 'absolute';
        cardDiv.style.left = `${this.positionX}px`
        cardDiv.style.top = `${this.positionY}px`
        cardDiv.style.width = `${this.width}px`;
        cardDiv.style.height = `${this.height}px`;
        cardDiv.style.zIndex = `${this.zindex}`;

        const deleteButton = document.createElement('img');
        deleteButton.src = "../public/delete.svg";
        const resizeButton = document.createElement('img');
        resizeButton.src = "../public/resize.svg";
        const editButton = document.createElement('img');
        editButton.src = "../public/edit.svg";

        resizeButton.addEventListener('mousedown', () => this.bringToFront(cardDiv));
        deleteButton.addEventListener('mousedown', () => this.delete());
        resizeButton.addEventListener('mousedown', (event) => this.startResizing(event)); 
        editButton.addEventListener('click', () => this.edit());

        deleteButton.id = "delete"
        resizeButton.id = "resize"
        editButton.id = "edit"

        deleteButton.draggable = false;
        resizeButton.draggable = false;
        editButton.draggable = false;


        const textArea = document.createElement('div');
        textArea.id = `text-${this.id}`;
        textArea.classList.add('text-area');
        textArea.innerHTML = this.text;
        
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
        Card.totalCards++; 

        document.getElementById('total-cards')!.textContent = `Total cards: ${Card.totalCards}`;

        document.getElementById('current-cards')!.textContent = `Current cards: ${Card.currentCards}`;
        this.updateDB()
    }

    delete() {
        const cardElement = document.getElementById(`card-${this.id}`);
        if (!cardElement) return;
        cardElement.querySelector('#delete').removeEventListener('mousedown', this.delete);
        cardElement.querySelector('#resize').removeEventListener('mousedown', this.startResizing);
        cardElement.querySelector('#edit').removeEventListener('click', this.edit);
        
        cardElement.remove();
        
        Card.currentCards--; 
        document.getElementById('current-cards').textContent = `Current cards: ${Card.currentCards}`;
        
        const editor = tinymce.get(`editor-${this.id}`);
        if (editor) {
            editor.remove();
        }
        this.deleteFromDB();
        this.deleted = true;
    }
    

    startResizing(event: MouseEvent) {
        event.stopPropagation(); 
        this.isResizing = true;
        this.initialResizeX = event.clientX - this.width;
        this.initialResizeY = event.clientY - this.height;
    }

    resizeCard(event: MouseEvent, cardElement: HTMLDivElement) {
        if (this.isResizing) {
            let newWidth = event.clientX - this.initialResizeX;
            let newHeight = event.clientY - this.initialResizeY;

            newWidth = Math.max(newWidth, Card.min);
            newHeight = Math.max(newHeight, Card.min);

            this.width = newWidth;
            this.height = newHeight;
            cardElement.style.width = `${this.width}px`;
            cardElement.style.height = `${this.height}px`;
            cardElement.style.backgroundColor = "#fff740";
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
            this.left = event.clientX - this.positionX
            cardElement.style.top = `${event.clientY - this.positionY}px`;
            this.top = event.clientY - this.positionY;
            cardElement.style.backgroundColor = "#fff740"

        }
    }

    stopActions() {
        const cardElement = document.getElementById(`card-${this.id}`);
        if(cardElement){
            cardElement.style.backgroundColor = "#f3f79d"            
        }

        this.isDragging = false;
        this.isResizing = false;
        this.updateDB()
    }

    bringToFront(cardElement: HTMLDivElement) {
        const newZIndex = Card.maxIndex + 1;
        cardElement.style.zIndex = newZIndex.toString();
        Card.maxIndex = newZIndex;
        this.updateDB()
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
            this.updateDB()
        });
    
        closeButton.addEventListener('click', () => {
            const editor = tinymce.get(`editor-${this.id}`);
            if (editor) {
                editor.remove();
            }
            modal.remove();
        });
    }
    async updateDB(){ 
        if(this.deleted)
            return;
        const cardElement = document.getElementById(`card-${this.id}`);
        let z: string;
        if (cardElement) {
            z = cardElement.style.zIndex ? cardElement.style.zIndex : "0";
        } else {
        }
        const url = `http://kciurej1.ct8.pl/test/save.php?id=${encodeURIComponent(this.id)}&pos_x=${this.left}&pos_y=${this.top}&height=${this.height}&width=${this.width}&text=${encodeURIComponent(this.text)}&zindex=${z}&fridge_name=${this.fridgeName}&cards=${Card.totalCards}`;

        try {
            const response = await fetch(url);
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            
        } catch (e) {
            console.error("Fetch error: " + e.message);
        }
    }
    async deleteFromDB(){ 
        const url = `http://kciurej1.ct8.pl/test/delete.php?id=${encodeURIComponent(this.id)}`;

        try {
            const response = await fetch(url);
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
        } catch (e) {
            console.error("Fetch error: " + e.message);
        }
        this.deleted = true;

    }
}



function generateUUID() {
    let d = new Date().getTime(); 
    let d2 = (performance && performance.now && (performance.now()*1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16; 
        if(d > 0){
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else { 
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

