import './style.css'
import Card from './card'
import plus from '/plus.svg'

class Fridge {
cards: number;

  constructor() {
    this.cards = 0;
    this.setup();
    this.fetchData();
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
      const card = new Card(this.cards);
      card.createCard();
      this.cards++;

      document.getElementById('total-cards')!.textContent = `Total cards: ${Card.totalCards}`;
      document.getElementById('current-cards')!.textContent = `Current cards: ${Card.currentCards}`;
    });
  }

  async fetchData() {
    try {
      const response = await fetch('http://127.0.0.1:8888');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const text = await response.text(); 
      console.log(text);                  
      const data = JSON.parse(text);      
      console.log(data);
    } catch (e) {
      console.error("Fetch error: " + e.message);
    }
  }
}

export default Fridge;
