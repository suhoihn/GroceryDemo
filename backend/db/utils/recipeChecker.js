import { updateItem, removeItem } from '../dbHandler';
const groceryModel = require('../model/GrocerySchema');

// Validates whether the recipe can be made with the current groceries
export default async function canMakeFood(recipe) {
    const updateList = [];
    const removeList = [];

    for (let currentRecipeItem of recipe.ingredients) {
        const matchingItem = await groceryModel.find({
            name: currentRecipeItem.name,
        }). sort(0, matchingItem.length - 1);
        
        if (matchingItem.length === 0) { return false; }

        if (matchingItem.map(item => item.weight).sum() < currentRecipeItem.weight) { 
            return false;
        }

        const matchingItemSorted = matchingItem
            .map((item) => item.boughtAt + item.lastsFor)
            .sort((a, b) => a - b);
        
        let weightSum = currentRecipeItem.weight;
            
        for (let item of matchingItemSorted) { 
            weightSum -= item.weight;
            if (weightSum < 0) {
                // Total weight used: weightSum + item.weight
                // New weight of the item: item.weight - total weight used

                // Update this. Validate after all items in recipe are checked
                updateList.push({ id: item._id, weight: item.weight - (currentRecipeItem.weight - weightSum) });
                break;
            } else {
                removeList.push({ id: item._id });
            }
        }
    }

    updateList.forEach((item) => updateItem(item));
    removeList.forEach((item) => removeItem(item));
    return true;      
}
