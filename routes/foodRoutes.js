const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

// app routes
router.get('/', foodController.homePage);
router.get('/categories', foodController.seeCategories);
router.get('/recipes', foodController.seeAllRecipes);
router.get('/recipe/:id', foodController.recipeDetails);
router.get('/categories/:categoryName', foodController.seeCategoriesContent);
router.post('/search', foodController.searchRecipe);
router.get('/submit-recipe', foodController.submitNewRecipe);
router.post('/submit-recipe', foodController.submitNewRecipeWithPost);
router.delete('/deleteRecipe/:id', foodController.deleteRecipe);
router.get('/editRecipe/:id', foodController.editRecipeGet);
router.put('/editRecipe/:id', foodController.editRecipePut);






module.exports = router;