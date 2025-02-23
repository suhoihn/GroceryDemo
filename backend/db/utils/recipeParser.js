export default function parseRecipes(recipes) {
    const recipeMap = new Map();
  
    recipes.forEach((recipe) => {
      if (!recipeMap.has(recipe.name)) {
        recipeMap.set(recipe.name, {
          name: recipe.name,
          ings: [],
        });
      } else {
        recipeMap.get(recipe.name).ings.push({
          ingName: recipe.ingName,
          weight: recipe.weight,
        });
      }
    });

    const result = [];
    recipeMap.forEach((recipeName, ings) => {
      result.push({
          name: recipeName,
          ings: ings,
      });
    });
  
    return result;
}
