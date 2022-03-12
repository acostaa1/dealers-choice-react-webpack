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

app.post ('/api/groceries/:name/:section/:price', async (req,res,next)=> {
    try {
        const item = await Grocery.create(req.params);
        res.status(201).send(item)
    } catch (error) {
        next(error)
    }
})

app.post('/api/groceries', async (req, res, next)=> {
    try {
        res.status(201).send(await Grocery.generateRandom())
    } catch (error) {
        next (error)
    }
})

app.delete('/api/groceries/:id', async (req, res, next)=> {
    try {
        const item = await Grocery.findByPk(req.params.id);
        await item.destroy();
        res.sendStatus(204);
    } catch (error) {
        next(error)
    }
})