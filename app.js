const form = document.querySelector("#search-form");
const input = document.querySelector("#search-term");
const msg = document.querySelector(".form-msg");
const list = document.querySelector(".cities");

const apiKey = "936a43fe9c1da3254004f3c7a1c14348";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  msg.textContent = "";
  msg.classList.remove("visible");

  let inputValue = input.value;

  const listItemsArray = Array.from(list.querySelectorAll(".cities li"));
  console.log(listItemsArray);


if (listItemsArray.length > 0) {
  const filteredArray = listItemsArray.filter( el => {
    let content = ""
    let cityName = el.querySelector(".city_name").textContent.toLowerCase()
    let cityCountry = el.querySelector(".city_country").textContent.toLowerCase()
  }

  )
}

});
