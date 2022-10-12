const toggler = document.querySelector('.toggler');
const navbarlinks = document.querySelector('.nav-links');
const navbarSearch = document.querySelector('input[type="search"]');

toggler.addEventListener('click', ()=> {
    navbarlinks.classList.toggle('active');
    toggler.classList.toggle('toggler_small_screen');
    navbarSearch.classList.toggle('active');
});

// ingredients. Clonning the ingredients div. clonning is done with respect to the direct parent element;

const ingredients_btn = document.querySelector('#ingredients_btn');
const ingredients_lists = document.querySelector('#ingredients_lists');
const ingredientDiv = document.querySelector('.ingredientDiv');

ingredients_btn.addEventListener('click', ()=>{
    let newIngredient = ingredientDiv.cloneNode(true);
    // grab the cloned input and reset their values
     let input = newIngredient.querySelector('input');
    input.value = '';

    // append new input to grand_parent div
    ingredients_lists.appendChild(newIngredient);
})