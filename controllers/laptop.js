var Laptop = require('../models/laptop');

exports.laptop_list = async function (req, res) {
    try {
        lapto1 = await Laptop.find();
        res.send(lapto1);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

exports.laptop_detail = async function (req, res) {
    console.log("detail" + req.params.id)
    try {
        result = await Laptop.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};

exports.laptop_create_post = async function (req, res) {
    console.log(req.body)
    let document = new Laptop();
    document.laptop_brand = req.body.laptop_brand;
    document.laptop_model = req.body.laptop_model;
    document.laptop_cost = req.body.laptop_cost;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

exports.laptop_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: Laptop delete DELETE ' + req.params.id);
};

exports.laptop_update_put = async function (req, res) {
    console.log(`update on id ${req.params.id} with body
    ${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await Laptop.findById(req.params.id)
        // Do updates of properties
        if (req.body.laptop_brand) toUpdate.laptop_brand = req.body.laptop_brand;
        if (req.body.laptop_cost)  toUpdate.laptop_model = req.body.laptop_model;
        if (req.body.laptop_color) toUpdate.laptop_cost = req.body.laptop_cost;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
    }
};

exports.laptop_view_all_Page = async function (req, res) {
    try {
        lapto1 = await Laptop.find();
        res.render('laptops', { title: 'Laptop Search Results', results: lapto1 });
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};