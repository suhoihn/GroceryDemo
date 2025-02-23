var express = require("express");
var router = express.Router();
var groceryModel = require('./db/model/GrocerySchema');

const { createTable, queryTable, addItem, removeItem, updateItem } = require('./db/dbHandler');

router.get("/", (req, res) => {
    res.send("Hello, World!");
});

router.post("/test", async (req, res) => {
    try {
        console.log(`Yo! I got`, req.body.recipe);
        res.status(200).json({ message: "That's cool" });
    } catch (err) {
        res.status(400).json({ message: "Error. tlqkf." });
    }
});

router.post("/addTest", async (req, res) => {
    try {
        console.log(`Yo! I got`, req.body);
        const newGrocery = new groceryModel({
            name: req.body.name,
            quantity: +req.body.quantity
        });
        console.log("nuh wool kay~", newGrocery);
        await newGrocery.save()
        res.status(200).json({ message: "That's cool" });
    } catch (err) {
        res.status(400).json({ message: "Error. tlqkf." });
    }
});

// For real this time!

router.put("/createTable", async (req, res) => {
    try {
        await createTable();
        res.status(200).json({ message: "New table created." })
    } catch (e) {
        res.status(400).json({ message: "Failed to initialise the table." });
    }
});

router.get("/queryTable", async (req, res) => {
    try {
        const result = await queryTable(req.query.searchString);
        //console.log("About to send the result!", result)
        res.status(200).json({ result: result });
    } catch (e) {
        res.status(400).json({ message: "Failed to query the table." });
    }

});

router.post("/addItem", async (req, res) => {
    try {
        console.log("HELLO?");
        console.log(req.body)
        const result = await addItem(req.body.newItem);
        res.status(200).json({ message: "New item added." })
    } catch (e) {
        res.status(400).json({ message: "Failed to initialise the table." });
    }

});

router.put("/removeItem", async (req, res) => {
    try {
        console.log("Removing!", req.body)
        await removeItem(req.body.id);
        res.status(200).json({ message: "Removed." })
    } catch (e) {
        res.status(400).json({ message: "Failed to remove the item." });
    }

});

router.put("/updateItem", async (req, res) => {
    try {
        await updateItem(req.body.id, req.body.newWeight);
        res.status(200).json({ message: "Item update." })
    } catch (e) {
        res.status(400).json({ message: "Failed to update the table." });
    }
});

module.exports = router;