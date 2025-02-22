cors = require("cors");
express = require('express');

grocerySchema = require('./db/model/GrocerySchema');
const app = express();
const PORT = 5000;

const db = require('./db/db');
db();

// Defining routes here...
console.log("Hello? WORLD?!?!?!?");
app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.post("/api/test", async (req, res) => {
    try {
        console.log(`Yo! I got`, req.body.recipe);
        res.status(200).json({ message: "That's cool" });
    } catch (err) {
        res.status(400).json({ message: "Error. tlqkf." });
    }
});

app.post("/api/addTest", async (req, res) => {
    try {
        console.log(`Yo! I got`, req.body);
        const newGrocery = new grocerySchema({
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}. Lick my ass.`);
});


module.exports = app;