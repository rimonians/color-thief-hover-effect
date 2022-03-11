// Select elements
const cardContainer = document.querySelector(".card-container");
const cardTemplate = document.querySelector(".card-template");

// Fetch data
const fetchData = async () => {
  try {
    const res = await fetch("./data.json");
    const data = await res.json();
    displayData(data);
  } catch (err) {
    console.log(err);
  }
};
fetchData();

// Display data
const displayData = (data) => {
  data.forEach((el) => {
    const card = cardTemplate.content.cloneNode(true);
    const cardImg = card.querySelector("img");
    const cardTitle = card.querySelector(".title");
    cardImg.src = `./images/${el.image}`;
    cardTitle.textContent = el.title;
    cardContainer.appendChild(card);
  });
  setDominateColor();
};

// Set color
const setDominateColor = () => {
  const colorThief = new ColorThief();
  const images = [...document.querySelectorAll(".card-container img")];
  const allCardInfo = [...document.querySelectorAll(".card-info")];
  images.forEach((img, index) => {
    if (img.complete) {
      const rgba = `rgba(${colorThief.getColor(img).join(",")},0.8)`;
      allCardInfo[index].style.background = rgba;
    } else {
      img.addEventListener("load", function () {
        const rgba = `rgba(${colorThief.getColor(img).join(",")},0.8)`;
        allCardInfo[index].style.background = rgba;
      });
    }
  });
};
