const logo = document.querySelector ('.logo');
const mainContent = document.getElementById ('fooditem');
const inputBoxText = document.querySelector ('#input-box');
const form = document.getElementById ('form');
const errorMessage = document.getElementById ('error-message');

form.addEventListener ('submit', function () {
  const inputText = document.getElementById ('input-box').value;
  mainContent.innerHTML = '';
  if (inputText === '') {
    errorMessage.style.display = 'block';
  } else {
    getMeals (inputText);
    errorMessage.style.display = 'none';
  }
});

getMeals ("a");

function getMeals (mealName) {
  const mainApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
  fetch (mainApi).then (res => res.json ()).then (data => {
    displayMeals (data.meals);
  });

  const displayMeals= recipes => {
    const recipesBox = document.getElementById ('fooditem');
    if (recipes != null) {
      recipes.forEach (recipe => {
        const recipeCard = document.createElement ('div');
        recipeCard.className = 'col-sm-6 col-md-4 col-lg-3';
        const recipeInfo = `
            <div onclick="getDetails('${recipe.idMeal}')" class="text-center shadow-sm h-80 single-item" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <img class="img-fluid rounded" src="${recipe.strMealThumb}" alt="">
            <h4 class="h5 pt-3">${recipe.strMeal}</h4>
            </div>`;
        recipeCard.innerHTML = recipeInfo;
        recipesBox.appendChild (recipeCard);
      });
    } else {
      errorMessage.style.display = 'block';
    }
  };
}

const getDetails = recipeName => {
  const recipeAPI = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeName}`;
  fetch (recipeAPI).then (res => res.json ()).then (data => {
    displayDetails (data.meals[0]);
  });
};

const displayDetails = recipe => {
  const recipeDetailsContainer = document.getElementById ('recipe-details');
  recipeDetailsContainer.innerHTML = `
  <div class="modal-header">
  <h2 class="modal-title">${recipe.strMeal}</h2>
  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body">
    <img class="img-fluid" src="${recipe.strMealThumb}" alt="">
    <h3>Ingredients:</h3>
    <ul>
        <li>${recipe.strIngredient1} - ${recipe.strMeasure1}</li>
        <li>${recipe.strIngredient2} - ${recipe.strMeasure2}</li>
        <li>${recipe.strIngredient3} - ${recipe.strMeasure3}</li>
        <li>${recipe.strIngredient4} - ${recipe.strMeasure4}</li>
        <li>${recipe.strIngredient5} - ${recipe.strMeasure5}</li>
        <li>${recipe.strIngredient6} - ${recipe.strMeasure6}</li>
        <li>${recipe.strIngredient7} - ${recipe.strMeasure7}</li>
        <li>${recipe.strIngredient8} - ${recipe.strMeasure8}</li>
    </ul>
    <h3>How to cook:</h3>
    <p>${recipe.strInstructions}</p>

  </div>
`;
};

logo.addEventListener ('click', function () {
  location.reload ();
});
