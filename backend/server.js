cors = require("cors");
express = require('express');

const app = express();
const PORT = 5000;

const db = require('./db/db');
db();

const routes = require('./routes');

// Defining routes here...
console.log("Hello? WORLD?!?!?!?");
app.use(cors())
app.use(express.json());
app.use("/api", routers);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}. Lick my ass.`);
});


module.exports = app;