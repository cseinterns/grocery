const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const { render } = require('@testing-library/react');

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://srijasriram:yaariyan2@cluster0.wya1v.mongodb.net/test", {
    dbName: "browser-buyer",
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected");
}).catch((err) => {
    console.log("Error" + err);
});

app.listen(8000, function() {
    console.log("App listening at port 8000");
});
const orderSchema = new mongoose.Schema({
    date: {
        type: "date",
        required: true
    },
    skuid: {
        type: "String",
        required: true,
        unique: true
    },
    orderid: {
        type: "String",
        required: true,
        unique: true
    },
    productName: {
        type: "String",
        required: true
    },
    origin: {
        type: "String",
        required: true
    },
    price: {
        type: "Number",
        required: true
    },
    store1order: {
        type: "Number",
        required: true
    },
    store2order: {
        type: "Number",
        required: true
    },
    store3order: {
        type: "Number",
        required: true
    },
    buyerOrder: {
        type: "Number"
    }
});
const orderModel = mongoose.model("orders", orderSchema);
//To display the results on the main page
app.get('/', (req, res) => {

    orderModel.find({}, (error, result) => {
        if (error) {
            console.log("Display Error:" + error);
        }
        res.send(result);
    });
});
//To insert order into the database
app.post('/add', (req, res) => {

    const date = req.body.date;
    const skuid = req.body.skuid;
    const orderid = req.body.orderid;
    const productName = req.body.productName;
    const origin = req.body.origin;
    const price = req.body.price;
    const store1 = req.body.store1order;
    const store2 = req.body.store2order;
    const store3 = req.body.store3order;

    const order = new orderModel({ date: date, skuid: skuid, orderid: orderid, productName: productName, origin: origin, price: price, store1order: store1, store2order: store2, store3order: store3 });

    try {
        order.save();
        res.send("Order Placed");
        console.log("Order Placed " + order);
    } catch (error) {
        console.log("Insertion Error:" + error);
    }

});

//delete list items from databse
app.delete("/delete/:arrayIds", async(req, res) => {

    let array = req.params.arrayIds.split(",");

    array.forEach(element => {
        orderModel.findByIdAndRemove(element).exec();
        console.log("Record Deleted");
    });

});


//Updating an order individually
app.put("/update", (req, res) => {
    const id = req.body.id,
        buyerOrder = req.body.buyerOrder;

    try {
        orderModel.findById(id, (err, order) => {
            order.buyerOrder = buyerOrder;
            order.save();
            res.send("Record Updated" + order);
            console.log("Record Updated:" + order);
        });
    } catch (error) {
        console.log("Error updating:" + error);
    }
});
