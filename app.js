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

  // Check if there's already a city that matches the search criteria
  const listItemsArray = Array.from(list.querySelectorAll(".cities li"));

  if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter((el) => {
      let content = "";
      let cityName = el.querySelector(".city_name").textContent.toLowerCase();
      let cityCountry = el
        .querySelector(".city_country")
        .textContent.toLowerCase();

      // Check for the <city,country> format
      if (inputValue.includes(",")) {
        if (inputValue.split(",")[1].length > 2) {
          inputValue = inputValue.split(",")[0];

          // Get the content from the existing city
          content = cityName;
        } else {
          // Country code is valid so keep both city and country
          content = `${cityName},${cityCountry}`;
          console.log(content);
        }
      } else {
        // Only the <city> format is used
        content = cityName;
      }
      // Return whether or not the existing content matches the form input value
      return content == inputValue.toLowerCase();
    });

    if (filteredArray.length > 0) {
      msg.textContent = `You already know the weather for ${
        filteredArray[0].querySelector(".city_name").textContent
      } ...otherwise be more specific by providing the country code as well 😉`;
      msg.classList.add("visible");

      form.reset();
      input.focus();

      return;
    }
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod == "404") {
        throw new Error(`${data.cod}, ${data.message}`);
      }

      const { main, name, sys, weather } = data;

      const icon = `img/weather/${weather[0]["icon"]}.svg`;

      const li = document.createElement("li");

      const markup = `
      	<figure>
      		<img src="${icon}" alt="${weather[0]["description"]}">
      	</figure>
      	<div>
      		<h2>${Math.round(main.temp)}<sup>°C</sup></h2>
      		<p class="city_conditions">${weather[0]["description"].toUpperCase()}</p>
      		<h3><span class="city_name">${name}</span><span class="city_country">${
        sys.country
      }</span></h3>
      	</div>
      `;

      li.innerHTML = markup;
      list.appendChild(li);
    })
    .catch(() => {
      msg.textContent = "Please search for a valid city!'";
      msg.classList.add("visible");
    });
});
