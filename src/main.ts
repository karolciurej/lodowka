import Fridge from './fridge';

document.getElementById('fridge-form').addEventListener('submit', (event) => {
    event.preventDefault();
    let nameInput = document.querySelector("#fridge-name") as HTMLInputElement;
    let name = nameInput.value;
    new Fridge(name);
  });
  



