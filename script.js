const advId = document.querySelector(".advId");
const theAdvice = document.querySelector(".theAdvice p");
const diceBtn = document.querySelector(".diceBtn");
const title = document.querySelector("title");
const url = "https://api.adviceslip.com/advice";

let clickCount = 0;
let lastClickTime = 0;

document.addEventListener("DOMContentLoaded", () => fetchAdvice());
diceBtn.addEventListener("click", () => {
  const currentTime = new Date().getTime();
  if (currentTime - lastClickTime < 5000) {
    clickCount++;
    if (clickCount >= 10) {
      alert("You have reached the click limit!");
      return;
    }
  } else {
    clickCount = 1;
  }
  lastClickTime = currentTime;
  fetchAdvice();
});

const fetchAdvice = async () => {
  const res = await fetch(url);
  const data = await res.json();

  if (!data) {
    return;
  }

  advId.textContent = `${data.slip.id}`;
  title.textContent = `Advice #${data.slip.id}`;
  theAdvice.textContent = `“${data.slip.advice}”`;
};
