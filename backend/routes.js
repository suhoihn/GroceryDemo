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

router.post("/createTable", async (req, res) => {
    try {
        createTable();
        res.status(200).json({ message: "New table created." })
    } catch (e) {
        res.status(400).json({ message: "Failed to initialise the table." });
    }
});

router.post("/queryTable", async (req, res) => {
    try {
        const result = queryTable(req.body.searchString);
        res.status(200).json({ result: result });
    } catch (e) {
        res.status(400).json({ message: "Failed to query the table." });
    }

});

router.post("/addItem", async (req, res) => {
    try {
        addItem(req.body.newItem);
        res.status(200).json({ message: "New item added." })
    } catch (e) {
        res.status(400).json({ message: "Failed to initialise the table." });
    }

});

router.post("/removeItem", async (req, res) => {
    try {
        removeItem(req.body.id);
        res.status(200).json({ message: "Removed." })
    } catch (e) {
        res.status(400).json({ message: "Failed to remove the item." });
    }

});

router.post("/updateItem", async (req, res) => {
    try {
        updateItem(req.body.id, req.body.newWeight);
        res.status(200).json({ message: "Item update." })
    } catch (e) {
        res.status(400).json({ message: "Failed to update the table." });
    }
});

module.exports = router;