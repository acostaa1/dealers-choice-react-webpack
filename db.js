const { STRING, INTEGER, ENUM } = require('sequelize');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/grocery_list')

//creating models
const Grocery = sequelize.define('grocery', {
    name: {
        type: STRING,
        allowNull: false,
    },
    section: {
        type: ENUM('Produce', 'Deli & Bakery', 'Meat & Seafood', 'Canned Goods', 'Dairy', 'Beer & Wine'),
        allowNull:false
    },
    price: {
        type: INTEGER,
        allowNull:false
    }
})

Grocery.generateRandom = () => {
    return Grocery.create({name: `Green Eggs & Ham`, section: 'Dairy', price: 10000})
}

const syncDB = async () => {
    try {
       await sequelize.sync({force:true});

        //Grocery List
        await Grocery.create({name: 'Broccoli', section: 'Produce', price: 30})
        await Grocery.create({name: 'Bread', section: 'Deli & Bakery', price: 50})
        await Grocery.create({name: 'Tuna', section: 'Canned Goods', price: 100})
        await Grocery.create({name: 'Eggs', section: 'Dairy', price: 60})
        await Grocery.create({name: 'Milk', section: 'Dairy', price: 40})
        await Grocery.create({name: 'Cheese', section: 'Deli & Bakery', price: 50})
        await Grocery.create({name: 'Peanut Butter', section: 'Canned Goods', price: 80})
        await Grocery.create({name: 'Beef', section: 'Meat & Seafood', price: 1000})
        await Grocery.create({name: 'Salmon', section: 'Meat & Seafood', price: 2000})
        await Grocery.create({name: 'Chicken', section: 'Meat & Seafood', price: 500})
        await Grocery.create({name: 'Beans', section: 'Canned Goods', price: 50})
        await Grocery.create({name: 'Tomato Paste', section: 'Canned Goods', price: 30})
        await Grocery.create({name: 'Mixed Salad', section: 'Produce', price: 70})

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    syncDB, Grocery
}