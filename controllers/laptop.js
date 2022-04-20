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

exports.laptop_delete =async function (req, res) {
    console.log("delete " + req.params.id)
    try {
    result = await Laptop.findByIdAndDelete( req.params.id)
    console.log("Removed " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send('{"error": Error deleting ${err}}');
}
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
        res.render('laptops', { title: 'Laptops avialble', results: lapto1 });
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};


exports.laptop_view_one_Page = async function (req, res) {
    console.log("single view for id " + req.query.id)
    try {
        result = await Laptop.findById(req.query.id)
        res.render('laptopdetail',
            { title: 'Laptop Details', toShow: result });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

exports.laptop_create_Page = function (req, res) {
    console.log("create view")
    try {
        res.render('laptopcreate', { title: 'Laptop Create' });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

exports.laptop_update_Page = async function (req, res) {
    console.log("update view for item " + req.query.id)
    try {
        let result = await Laptop.findById(req.query.id)
        res.render('laptopupdate', { title: 'Laptop Update', toShow: result });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};


exports.laptop_delete_Page = async function (req, res) {
    console.log("Delete view for id " + req.query.id)
    try {
        result = await Laptop.findById(req.query.id)
        res.render('laptopdelete', {title: 'Laptop Delete', toShow: result});
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};