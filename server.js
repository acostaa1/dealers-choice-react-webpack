const {syncDB, Grocery} = require('./db.js'); 

const startUp = async () => {
    await syncDB();
    
}