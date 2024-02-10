const advId = document.querySelector(".advId");
const theAdvice = document.querySelector(".theAdvice p");
const diceBtn = document.querySelector(".diceBtn");
const title = document.querySelector("title");
const urlEn = "https://api.adviceslip.com/advice";
const langBtn = document.querySelector("#toggle");

let clickCount = 0;
let lastClickTime = 0;

document.addEventListener("DOMContentLoaded", () =>
  langBtn.checked ? fetchAdviceEn() : fetchAdviceAr()
);
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

  langBtn.checked ? fetchAdviceEn() : fetchAdviceAr();

  lastClickTime = currentTime;
});

langBtn.addEventListener("click", () => {
  console.log(langBtn.checked);
  langBtn.checked ? fetchAdviceEn() : fetchAdviceAr();
});

const fetchAdviceEn = async () => {
  const res = await fetch(urlEn);
  const data = await res.json();

  if (!data) {
    return;
  }

  document.body.dir = "ltr";
  advId.textContent = `Advice #${data.slip.id}`;
  title.textContent = `Advice #${data.slip.id}`;
  theAdvice.textContent = `“${data.slip.advice}”`;
};

const fetchAdviceAr = async () => {
  let ranNum = Math.floor(Math.random() * 1000);
  const urlAr = `https://api.hadith.gading.dev/books/bukhari/${ranNum}/`;
  const res = await fetch(urlAr);
  const data = await res.json();

  console.log(data);

  if (!data) {
    return;
  }

  document.body.dir = "rtl";
  advId.textContent = `حديث #${ranNum}`;
  title.textContent = `حديث #${ranNum}`;
  theAdvice.textContent = `"${data.data.contents.arab}"`;
};
