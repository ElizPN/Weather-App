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
          console.log(inputValue);

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
    console.log(filteredArray);
  }
});
