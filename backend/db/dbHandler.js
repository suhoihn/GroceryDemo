const fs = require('fs');
const csv = require('csv-parser');
const groceryModel = require('./model/GrocerySchema');

const readCSV = async (filename) => {
    return new Promise((resolve, reject) => {
        const result = [];
        
        fs.createReadStream(filename)
            .pipe(csv())
            .on('data', (row) => {
                result.push(row);
            })
            .on('end', () => {
                console.log('CSV file successfully processed!');
                resolve(result); // Resolving the Promise with the result
            })
            .on('error', (err) => {
                reject(err); // Reject the Promise if there is an error
            });
    });
};

module.exports.createTable = async () => {
    await groceryModel.deleteMany({});
    const listOfJSONs = await readCSV('db/data/groceries.csv');
    //console.log("creating new table.", listOfJSONs)
    const result = await groceryModel.insertMany(listOfJSONs)
        .then(result => {
            console.log("Insertion result...");
            console.log(result);
            return result;
        })
        .catch(e => {
            console.log("Error inserting data...");
            console.log(e);
        });
}

module.exports.queryTable = async (searchString) => {
    console.log("Searching for: ", searchString);
    try {
        const result = await groceryModel.find({
            name: {
                $regex: searchString,
                $options: 'i' // case-insensitive
            }}
        )
        console.log("Query result...");
        //console.log(result);
        return result;
    } catch (e) {
        console.log("Error querying data...");
        console.log(e);   
    }
}

module.exports.addItem = async (newObject) => {
    const newGrocery = new groceryModel(newObject);
    try {
        const result = await newGrocery.save()
        console.log("Insertion result...");
        console.log(result);
    } catch(e) {
        console.log("Error inserting data...");
        console.log(e);
    };
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