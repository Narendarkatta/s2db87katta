var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var costume_controller = require('../controllers/costume');
var laptop_controller = require('../controllers/laptop');

/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// costume ROUTES ///
// POST request for creating a costume.
router.post('/costumes', costume_controller.costume_create_post);
// DELETE request to delete costume.
router.delete('/costumes/:id', costume_controller.costume_delete);
// PUT request to update costume.
router.put('/costumes/:id', costume_controller.costume_update_put);
// GET request for one costume.
router.get('/costumes/:id', costume_controller.costume_detail);
// GET request for list of all costume items.
router.get('/costumes', costume_controller.costume_list);


// POST request for creating a laptop.
router.post('/laptops', laptop_controller.laptop_create_post);
// DELETE request to delete laptop.
router.delete('/laptops/:id', laptop_controller.laptop_delete);
// PUT request to update laptop.
router.put('/laptops/:id', laptop_controller.laptop_update_put);
// GET request for one laptop.
router.get('/laptops/:id', laptop_controller.laptop_detail);
// GET request for list of all laptop items.
router.get('/laptops', laptop_controller.laptop_list);
module.exports = router;
