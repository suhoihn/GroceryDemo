const fs = require('fs');
const csv = require('csv-parser');
const groceryModel = require('./model/GrocerySchema');

parseCSV = () => {
    const result = [];
    fs.createReadStream('data/groceries.csv')
        .pipe(csv())
        .on('data', (row) => {
            result.push(row);
        })
        .on('end', () => {
            console.log('CSV file successfully processed!');
        })
}

module.exports.createTable = async () => {
    const listOfJSONs = parseCSV();
    const result = await groceryModel.insertMany(listOfJSONs)
        .then(result => {
            console.log("Insertion result...");
            console.log(result);
        })
        .catch(e => {
            console.log("Error inserting data...");
            console.log(e);
        });
    return result;
}

module.exports.queryTable = async (searchString) => {
    const result = await groceryModel.find({
        name: {
            $regex: searchString,
            $options: 'i' // case-insensitive
        }
    })
        .then(result => {
            console.log("Insertion result...");
            console.log(result);
        })
        .catch(e => {
            console.log("Error inserting data...");
            console.log(e);
        });
    return result;
}

module.exports.addItem = async (newObject) => {
    const newGrocery = new groceryModel(newObject);
    await newGrocery.save()
        .then(result => {
            console.log("Insertion result...");
            console.log(result);
        })
        .catch(e => {
            console.log("Error inserting data...");
            console.log(e);
        });
    return result;
};

module.exports.updateItem = async (id, newWeight) => {
    const result = await groceryModel.findOneAndUpdate({
        _id: id
    }, {
        weight: newWeight
    })
        .then(result => {
            console.log("Update result...");
            console.log(result);
        })
        .catch(e => {
            console.log("Error updating data...");
            console.log(e);
        });

    return result;
};

module.exports.removeItem = async (id) => {
    const result = await groceryModel.findByIdAndDelete(id) 
        .then(result => {
            console.log("Update result...");
            console.log(result);
        })
        .catch(e => {
            console.log("Error updating data...");
            console.log(e);
    }) 
    return result;
};