const namePerson = document.querySelector(".name");
const numberPerson = document.querySelector(".number");
const person = document.querySelector(".person");

const form = document.querySelector(".form-search");
const input = document.querySelector(".input");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

let pullPokemon = 1;

const searchPokemon = async (pokemon) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const showPokemon = async (pokemon) => {
  namePerson.innerHTML = "Loading...";
  numberPerson.innerHTML = "";

  const data = await searchPokemon(pokemon);

  if (data) {
    person.style.display = "block";
    namePerson.innerHTML = data.name;
    numberPerson.innerHTML = data.id;
    person.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    input.value = "";
    pullPokemon = data.id;
  } else {
    person.style.display = "none";
    namePerson.innerHTML = "Not found :c";
    numberPerson.innerHTML = "";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  showPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener("click", () => {
  if (pullPokemon > 1) {
    pullPokemon -= 1;
    showPokemon(pullPokemon);
  }
});

buttonNext.addEventListener("click", () => {
  pullPokemon += 1;
  showPokemon(pullPokemon);
});

showPokemon(pullPokemon);
