// getting form and input
let pokemonSearchForm = document.querySelector("#pokemonSearchForm");
let pokemonSearchInput = document.querySelector("#pokemonSearchInput");

// images and audio 
let pokemonImage = document.querySelector("#pokemonImage");
let pokemonAudio = document.querySelector("#pokemonAudio");

// dropdown menu for moves
let moveDropdownOne = document.querySelector("#moveDropdownOne");
let moveDropdownTwo = document.querySelector("#moveDropdownTwo");
let moveDropdownThree = document.querySelector("#moveDropdownThree");
let moveDropdownFour = document.querySelector("#moveDropdownFour");

let addToTeamButton = document.querySelector("#addToTeamButton");
let teamList = document.querySelector("#teamList");
let teamAreaSection = document.querySelector(".teamArea");

let currentPokemonObject = null;
let pokemonTeamArray = []; // arr for team members

// fixing user input
function normalizeUserInput(userInputText) {
  return userInputText.trim().toLowerCase();
}

// clears dropdown options
function clearDropdown(dropdownElement) {
  dropdownElement.innerHTML = "";
}

// dropdown starts blank until user searches for a pokemon
function addBlankOption(dropdownElement) {
  let blankOption = document.createElement("option");
  blankOption.value = "";
  blankOption.textContent = "";
  dropdownElement.appendChild(blankOption);
}

// disables the moves dropdowns until we have moves to show
function disableMoveDropdowns(shouldDisable) {
  moveDropdownOne.disabled = shouldDisable;
  moveDropdownTwo.disabled = shouldDisable;
  moveDropdownThree.disabled = shouldDisable;
  moveDropdownFour.disabled = shouldDisable;
}

// clears old moves, adds blank option and disables dropdowns 
// until new pokemon is searched and has moves to show
function resetMoveDropdownsToBlank() {
  let dropdownArray = [
    moveDropdownOne,
    moveDropdownTwo,
    moveDropdownThree,
    moveDropdownFour
  ];

  dropdownArray.forEach(function(dropdownElement) {
    clearDropdown(dropdownElement);
    addBlankOption(dropdownElement);
  });

  disableMoveDropdowns(true);
}

// gets the moves the user selected from the dropdowns and returns them in the array
function getSelectedMovesFromDropdowns() {
  let selectedMovesArray = [];

  if (moveDropdownOne.value !== "") selectedMovesArray.push(moveDropdownOne.value);
  if (moveDropdownTwo.value !== "") selectedMovesArray.push(moveDropdownTwo.value);
  if (moveDropdownThree.value !== "") selectedMovesArray.push(moveDropdownThree.value);
  if (moveDropdownFour.value !== "") selectedMovesArray.push(moveDropdownFour.value);

  return selectedMovesArray;
}

//cache functions to store API data
function createPokemonCacheKey(pokemonQuery) {
  return "pokemon_cache_" + pokemonQuery;
}

// need to get pokemon data from storage 1st
function loadPokemonFromCache(pokemonQuery) {
  let cachedText = localStorage.getItem(createPokemonCacheKey(pokemonQuery));

  if (cachedText === null) {
    return null;
  }

  return JSON.parse(cachedText);
}

// save pokemon data to localStorage
function savePokemonToCache(pokemonQuery, pokemonObject) {
  localStorage.setItem(
    createPokemonCacheKey(pokemonQuery),
    JSON.stringify(pokemonObject)
  );
}

// fetching pokemon data
function fetchPokemonFromApi(pokemonQuery) {

  let fetchUrl = "https://pokeapi.co/api/v2/pokemon/" + pokemonQuery;

  return fetch(fetchUrl)
    .then(function(responseObject) {

      if (responseObject.ok === false) {
        throw new Error("Pokemon not found");
      }

      return responseObject.json();
    })
    .then(function(pokemonJsonData) {

      // getting the name, sprite, audio, and moves from the API data 
      // and putting it in an object to return
      let pokemonName = pokemonJsonData.name;

      let pokemonSpriteUrl = "";
      if (pokemonJsonData.sprites && pokemonJsonData.sprites.front_default) {
        pokemonSpriteUrl = pokemonJsonData.sprites.front_default;
      }

      let pokemonAudioUrl = "";
      if (pokemonJsonData.cries && pokemonJsonData.cries.latest) {
        pokemonAudioUrl = pokemonJsonData.cries.latest;
      }

      let pokemonMovesArray = [];
      if (pokemonJsonData.moves && pokemonJsonData.moves.length > 0) {
        pokemonMovesArray = pokemonJsonData.moves.map(function(moveItem) {
          return moveItem.move.name;
        });
      }
      // returning only the data we need
      return {
        name: pokemonName,
        spriteUrl: pokemonSpriteUrl,
        audioUrl: pokemonAudioUrl,
        moves: pokemonMovesArray
      };
    });
}

// putting the moves in the dropdowns 
function fillMoveDropdownsWithMoves(movesArray) {

  let dropdownArray = [
    moveDropdownOne,
    moveDropdownTwo,
    moveDropdownThree,
    moveDropdownFour
  ];

  dropdownArray.forEach(function(dropdownElement) {

    clearDropdown(dropdownElement);
    addBlankOption(dropdownElement);

    movesArray.forEach(function(moveName) {
      let moveOption = document.createElement("option");
      moveOption.value = moveName;
      moveOption.textContent = moveName;
      dropdownElement.appendChild(moveOption);
    });
    // enabling dropdown once it has the data
    dropdownElement.disabled = false;
  });
}

// showing the searched pokemon's image, audio, and moves on the page
function displayPokemonOnPage(pokemonObjectForPage) {
  currentPokemonObject = pokemonObjectForPage;

  // pokemon image, if not put back glitch img
  if (pokemonObjectForPage.spriteUrl !== "") {
    pokemonImage.src = pokemonObjectForPage.spriteUrl;
    pokemonImage.classList.add("realPokemonImage");
  } else {
    pokemonImage.src = "images/glitch.png";
    pokemonImage.classList.remove("realPokemonImage");
  }

  // audio
  if (pokemonObjectForPage.audioUrl !== "") {
    pokemonAudio.src = pokemonObjectForPage.audioUrl;
  } else {
    pokemonAudio.src = "";
  }

  // moves
  fillMoveDropdownsWithMoves(pokemonObjectForPage.moves);

  // enabling the add to team button once we have a pokemon 
  // and moves to select
  addToTeamButton.disabled = false;
}

// showing the team area once user selects a pokemon
function updateTeamAreaVisibility() {
  if (pokemonTeamArray.length === 0) {
    teamAreaSection.classList.remove("showTeam");
  } else {
    teamAreaSection.classList.add("showTeam");
  }
}

// designing how the team members will look on the page
function renderTeamOnPage() {
  teamList.innerHTML = "";

  pokemonTeamArray.forEach(function(teamMemberObject, teamIndex) {

    let listItem = document.createElement("li");
    // small pokemon img in the team list
    let teamSpriteImage = document.createElement("img");
    teamSpriteImage.src = teamMemberObject.spriteUrl;
    teamSpriteImage.alt = teamMemberObject.name;
    teamSpriteImage.classList.add("teamSprite");

    // text section with pokemon name and moves
    let textSection = document.createElement("section");

    let pokemonNameStrong = document.createElement("strong"); // bold name
    pokemonNameStrong.textContent =
      (teamIndex + 1) + ". " + teamMemberObject.name; // team member number and name

    // line break between name and moves  
    let lineBreak = document.createElement("br");

    let movesTextSpan = document.createElement("span");
    movesTextSpan.textContent =
      teamMemberObject.selectedMoves.join(", ");

    textSection.appendChild(pokemonNameStrong);
    textSection.appendChild(lineBreak);
    textSection.appendChild(movesTextSpan);

    listItem.appendChild(teamSpriteImage);
    listItem.appendChild(textSection);

    teamList.appendChild(listItem);
  });

  updateTeamAreaVisibility();
}

// when user clicks find button
function handlePokemonSearchSubmit(eventObject) {
  eventObject.preventDefault();

  let userInputText = normalizeUserInput(pokemonSearchInput.value);

  if (userInputText === "") {
    alert("Please enter a Pokemon name or ID.");
    return;
  }

  console.log("Searching for Pokemon:", userInputText);

  // resetting the page before showing the new pokemon 
  resetMoveDropdownsToBlank();
  addToTeamButton.disabled = true;
  currentPokemonObject = null;

  pokemonImage.src = "images/glitch.png";
  pokemonImage.classList.remove("realPokemonImage");
  pokemonAudio.src = "";

  // checking cache for the pokemon data before fetching from API
  let cachedPokemonObject = loadPokemonFromCache(userInputText);

  if (cachedPokemonObject !== null) {
    console.log("Skipping fetch!");
    displayPokemonOnPage(cachedPokemonObject);
    return;
  }

  console.log("Don't have data yet. Fetching!");

  // if not in cache, fetch from API
  fetchPokemonFromApi(userInputText)
    .then(function(pokemonObjectForPage) {
      console.log(pokemonObjectForPage);
      savePokemonToCache(userInputText, pokemonObjectForPage);
      displayPokemonOnPage(pokemonObjectForPage);
    })
    .catch(function() {
      alert("Could not load Pokemon. Try a different name or Pokemon ID number.");
    });
}

// when user clicks "Add to Team" button
function handleAddToTeamClick() {

  if (currentPokemonObject === null) {
    alert("Find a Pokemon first.");
    return;
  }

  let selectedMovesArray = getSelectedMovesFromDropdowns();

  if (selectedMovesArray.length === 0) {
    alert("Please select at least one move.");
    return;
  }

  // saving the pokemon member and moves to the team array
  let teamMemberObject = {
    name: currentPokemonObject.name,
    spriteUrl: currentPokemonObject.spriteUrl,
    selectedMoves: selectedMovesArray
  };

  pokemonTeamArray.push(teamMemberObject);
  renderTeamOnPage();
}

pokemonSearchForm.addEventListener("submit", handlePokemonSearchSubmit);
addToTeamButton.addEventListener("click", handleAddToTeamClick);

//localStorage.clear();  
resetMoveDropdownsToBlank();
addToTeamButton.disabled = true;
pokemonAudio.src = "";
