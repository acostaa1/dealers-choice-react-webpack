const { syncDB, Grocery } = require("./db.js");
const express = require("express");
const app = express();
const path = require("path");

//adding path to connect HTML
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

//adding static path webpack file sent to client
app.use('/dist', express.static(path.join(__dirname, 'dist')));

//adding this to connect to my CSS file
app.use('/assets', express.static(path.join(__dirname, 'assets')))

const startUp = async () => {
  try {
    await syncDB(); //syncs DB
    console.log("Connected to DB!");

    //connect to local host
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

startUp();

app.get('/api/groceries', async (req, res, next) => {
    try {
        const groceries = await Grocery.findAll()
        res.send(groceries);
    } catch (error) {
        next (error)
    }

})

app.post ('/api/groceries', async (req,res,next)=> {
    try {
        const item = await Grocery.create(req.body)
    } catch (error) {
        next(error)
    }
})