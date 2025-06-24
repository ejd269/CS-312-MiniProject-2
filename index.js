// import dependencies
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

// set up express server
const app = express();
const port = 3000;

// set up bodyparser to parse data
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// start web server
app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
})

// grab home page
app.get("/", async (req, res) => {
    try {
        res.render("index.ejs");
    // error handling
    } catch (error) {
        console.error("Failed to complete request:", error.message);
        res.render("index.ejs", {
            error: error.message,
        })
    }
});

// when the form is submitted, fetch API request and update
app.post("/", async (req, res) => {
    try {
        // logging purposes
        console.log(req.body);
        // set up variables to read form data
        const lat = req.body.lat;
        const long = req.body.long;
        // fetch API data
        const response = await axios.get(`https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${long}&alt=100&dt=`, {
            headers: {
                "x-access-token": "openuv-frkrmc9sduhq-io", //ejd269 token openuv-frkrmc9ng2l6-io, ederr token openuv-frkrmc9r9dyy-io, 2417 token openuv-frkrmc9sduhq-io
                "Content-Type": "application/json"
            }
        });
        // interpret data
        const result = response.data;
        // logging purposes
        console.log(result);
        // render data on page
        res.render("index.ejs", { data: result.result });
    // error handling
    } catch (error) {
        console.error("Failed to complete request:", error.message);
        res.render("index.ejs", {
            error: error.message,
        })
    }
});