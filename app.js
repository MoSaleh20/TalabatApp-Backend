const express = require('express')
const mongoose = require('mongoose')
// const url = 'mongodb://localhost/AlienDBex'
const url = 'mongodb+srv://ahmad:ahmad123@cluster0.zdiw4.mongodb.net/Talabat?retryWrites=true&w=majority'
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()
const { MongoClient } = require('mongodb');
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));


async function main() {
    const url = "mongodb+srv://ahmad:ahmad123@cluster0.zdiw4.mongodb.net/Talabat?retryWrites=true&w=majority";
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        
        await client.connect();
        // await listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        // await client.close();
    }
}
main().catch(console.error);

// async function listDatabases(client) {
//     databasesList = await client.db().admin().listDatabases();
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };


app.use(bodyParser.json());


mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connecteds')
})

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Ahmad Horyzat application." });
});

app.use(express.json())

const restaurantRouter = require('./routes/restaurant.router');
const menuRouter = require('./routes/menu.router');
const customerRouter = require('./routes/customer.router');
const ordersRouter = require('./routes/orders.router');
const restRatingRouter = require('./routes/restaurant.rating.router');
const usersRouter = require('./routes/user.router');


app.use('/restaurants', restaurantRouter)
app.use('/menus', menuRouter)
app.use('/customers', customerRouter)
app.use('/orders', ordersRouter)
app.use('/restRatig', restRatingRouter)
app.use('/users', usersRouter)

app.listen(9000, () => {
    console.log('Server started')
})