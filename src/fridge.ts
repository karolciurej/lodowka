import './style.css'
import Card from './card'
import plus from '/plus.svg'

class Fridge {
  cards: number;
  name: string;
  constructor(name) {
    this.cards = 0;
    this.name = name;
    this.checkFridge();
  }

  setup() {
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
      <div id="cont" style="width: 100vw; height:100vh; background-color: #fff; position: relative;">
        <img src="${plus}" class="logo w-10 absolute top-5 left-5" id="create" alt="Create logo" />
        <div id="card-info">
          <span id="total-cards">Total cards: 0</span>
          <span id="current-cards">Current cards: 0</span>
        </div>
      </div>
    `

    document.getElementById("create")?.addEventListener("click", () => {
      const card = new Card("",50, 150, 200, 200, "", 0, this.name);
      card.createCard();
      this.cards++;
      document.getElementById('total-cards')!.textContent = `Total cards: ${Card.totalCards}`;
      document.getElementById('current-cards')!.textContent = `Current cards: ${Card.currentCards}`;
    });
  }

  async checkFridge() {
    try {
      const url = `http://kciurej1.ct8.pl/test/index.php?name=${this.name}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const obj = await response.json();
      if(obj.length == 0){
        this.setup()
      }else{
        this.openFridge(obj)
      }
    } catch (e) {
      console.error("Fetch error: " + e.message);
    }
  }


  openFridge(obj) {
    this.setup();

    const { cards, totalCards } = obj;
    Card.totalCards = totalCards
    document.getElementById('total-cards')!.textContent = `Total cards: ${totalCards}`;

    cards.forEach(element => {
      Card.totalCards--  

      const card = new Card(
        element.id_in_fridge,
        element.pos_x, 
        element.pos_y, 
        element.height, 
        element.width, 
        element.text, 
        element.zindex,
        this.name
      );
      card.createCard();
      this.cards++;
    });
  }


}

export default Fridge;
