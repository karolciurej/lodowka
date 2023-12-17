import './style.css'
import Card from './card'
import plus from '/plus.svg'
let cards = 0

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="cont" style="width: 100vw; height:100vh; background-color: #000; position: relative;">
    <img src="${plus}" class="logo w-10 absolute top-5 left-5" id="create" alt="Vite logo" />
  </div>
`

async function fetchData() {
  try {
    const response = await fetch('http://127.0.0.1:8888');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text(); 
    console.log(text);                   // Log the raw response

    const data = JSON.parse(text);       // Parse it manually
    console.log(data);
  } catch (e) {
    console.error("Fetch error: " + e.message);
  }
}



fetchData();

document.getElementById("create")?.addEventListener("click", () => {
  const card = new Card(cards)
  card.createCard()
  cards++
})
