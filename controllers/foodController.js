// require model
const Category = require('../models/categogry');
const Recipe = require('../models/recipe');


// get homepage
const homePage = async(req, res)=>{
    try{
        const numContent = 5;
        const categories = await Category.find().limit(numContent);
        
        const latest = await Recipe.find().sort({createdAt: -1}).limit(numContent);
        const soup = await Recipe.find({category: 'SOUP'}).limit(numContent);
        const rice = await Recipe.find({category: 'RICE'}).limit(numContent);
        const beans = await Recipe.find({category: 'BEANS'}).limit(numContent);
        const snacks = await Recipe.find({category: 'SNACKS'}).limit(numContent);
        const porridge = await Recipe.find({category: 'PORRIDGE'}).limit(numContent);
        // const food = {latest};

        res.render('index', {title: 'home-page', categories, latest, soup, rice, beans,snacks, porridge});
    }
     
    catch(err){
        console.log(err);
    }
}
     
       ///  OR
// const homePage = (req, res)=>{
//    Category.find()
//    .then((categories)=>{
//     res.render('index', {title: 'home-page', categories});
//    })
//    .catch((err)=>{
//        console.log(err);
//    })
// }

// get all Categories
const seeCategories = async(req,res)=>{
    try{
        const numContent = 10;
        const categories = await Category.find().limit(numContent);
        res.render('categories', {title: 'All-Categories', categories});
    }
     
    catch(err){
        console.log(err);
    }
}



// get all recipes
const seeAllRecipes = async(req,res)=>{
    try{
        const allRecipes = await Recipe.find()
        res.render('recipes', {title: 'All-recipies', allRecipes});
    }
     
    catch(err){
        console.log(err);
    }
}

// get Categories contents
const seeCategoriesContent = async(req,res)=>{
    try{
        let categogry_Name = req.params.categoryName;
        const categoryRecipes = await Recipe.find({category: categogry_Name})
        res.render('category_recipes', {title: 'category_recipe', categoryRecipes});
    }
     
    catch(err){
        console.log(err);
    }
}

// get recipe details
const recipeDetails = async(req,res)=>{
    try{
        let recipeId = req.params.id;
        const recipeDetail = await Recipe.findById(recipeId);
        res.render('recipedetails', {title: 'recipe-details', recipeDetail});
    }
     
    catch(err){
        console.log(err);
    }
}

// search recipe

const searchRecipe = async(req, res)=>{
 // we need the name of the input field to make our query
    try{
        // let searchRecipe = req.body.nameOfInputField
        let searchRecipe = req.body.searchRecipe;
        let recipes = await Recipe.find( {$text: {$search: searchRecipe, $diacriticSensitive: true}} );
        // res.json(recipes);
        res.render('search', {title: 'recipe_search', recipes});
    }

    catch(err){
      console.log(err);
    }

    
}


// get submit new recipe page

const submitNewRecipe = async(req, res)=>{
    try{
       const myErrorsObj = req.flash('myErrors');
       const formSubmittedObj = req.flash('formSubmitted');
       res.render('submit', {title: 'submit_new_recipe', myErrorsObj, formSubmittedObj});
    }
    catch(err){
        console.log(err)
    }
}

// post new recipe to db
const submitNewRecipeWithPost = async(req, res)=>{
    
        let imageUploadFile;
        let uploadPath;
        let newImageName;

         if(!req.files || Object.keys(req.files).length === 0){
            console.log('no file to upload');
        } 
        else{

            imageUploadFile = req.files.image;  // name of image is image
            newImageName = imageUploadFile.name;

            uploadPath = require('path').resolve('./') + '/public/imgs_recipe' + newImageName;

            imageUploadFile.mv(uploadPath, function(err){
                if(err){
                    console.log(err);
                }
            })
        
        }

       const newRecipe = new Recipe({
            'name': req.body.recipeName,
            'description': req.body.description,
            'ingredients': req.body.ingredients,
            'category': req.body.category,
            'image': newImageName,
            'email': req.body.email,                
       }); 
      try{ 
       await newRecipe.save();     
 
       req.flash('formSubmitted', 'Recipe submitted sucessfully');
       res.redirect('/submit-recipe');
    }
    catch(err){
        // res.json(err);
        req.flash('myErrors', err.message);
        res.redirect('/submit-recipe');
    }
}


// delete recipe

const deleteRecipe = async(req, res)=>{
    try{
        let id = req.params.id
        const delete_recipe = await Recipe.findByIdAndDelete(id);
        res.redirect('/recipes');
    }

    catch(err){
        console.log(err);
    }
    
}

// get edit recipe
const editRecipeGet = async(req, res)=>{
    try{
        let id = req.params.id
        const get_recipe = await Recipe.findById(id);
        res.render('update', {title: 'edit_recipe', get_recipe});
    }
    catch(err){
        console.log(err);
    }
    
}

// edit recipe post
const editRecipePut = async(req, res)=>{

    let imageUploadFile;
        let uploadPath;
        let newImageName;

         if(!req.files || Object.keys(req.files).length === 0){
            console.log('no file to upload');
        } 
        else{

            imageUploadFile = req.files.image;  // name of image is image
            newImageName = imageUploadFile.name;

            uploadPath = require('path').resolve('./') + '/public/imgs_recipe' + newImageName;

            imageUploadFile.mv(uploadPath, function(err){
                if(err){
                    console.log(err);
                }
            })
        
        }

    
    try{
        let id = req.params.id
        const edit_recipe = await Recipe.findByIdAndUpdate(id);
        edit_recipe.name = req.body.recipeName,
        edit_recipe.description = req.body.description,
        edit_recipe.ingredients = req.body.ingredients,
        edit_recipe.category = req.body.category,
        edit_recipe.image = newImageName,
        edit_recipe.email = req.body.email,

        await edit_recipe.save();
        res.redirect(`/recipe/${edit_recipe._id}`);
    }

    catch(err){
        console.log(err);
    }
    
}


//For categories- use the below code to insert Categories

// const insertCategory = async(req, res)=>{
//     try{
//         await Category.insertMany([
//             {
//                 'name': 'SOUP',
//                 'image': 'soup.jpg'
//             },
//             {
//                 'name': 'BEANS',
//                 'image': 'beans.jpg'
//             },
//             {
//                 'name': 'RICE',
//                 'image': 'rice.jpg'
//             },
//             {
//                 'name': 'SNACKS',
//                 'image': 'snack.jpg'
//             },
//             {
//                 'name': 'PORRIDGE',
//                 'image': 'porridge.jpg'
//             },
//         ])
//     }

//     catch(err){
//         console.log(err)
//     }
// }

//insertCategory();





module.exports = {homePage, seeCategories, recipeDetails, seeCategoriesContent, searchRecipe, seeAllRecipes, submitNewRecipe, submitNewRecipeWithPost, deleteRecipe,editRecipeGet, editRecipePut};