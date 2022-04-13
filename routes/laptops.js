var express = require('express');
const laptop_controller = require('../controllers/laptop');
var router = express.Router();

/* GET home page. */

// router.get('/', function(req, res, next) {
//   res.render('laptops', { title: 'Search Results' });
// });


/* GET costumes */
router.get('/', laptop_controller.laptop_view_all_Page );

module.exports = router;
