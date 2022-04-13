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

exports.laptop_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: Laptop detail: ' + req.params.id);
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

exports.laptop_update_put = function (req, res) {
    res.send('NOT IMPLEMENTED: Laptop update PUT' + req.params.id);
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