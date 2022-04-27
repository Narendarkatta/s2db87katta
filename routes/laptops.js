var express = require('express');
const laptop_controller = require('../controllers/laptop');
var router = express.Router();

/* GET home page. */

// router.get('/', function(req, res, next) {
//   res.render('laptops', { title: 'Search Results' });
// });
const secured = (req, res, next) => {
    if (req.user) {
      return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect("/login");
  }
/* GET Laptops */
router.get('/', laptop_controller.laptop_view_all_Page );
/* GET detail laptop page */
router.get('/detail', laptop_controller.laptop_view_one_Page);
/* GET create laptop page */
router.get('/create',secured, laptop_controller.laptop_create_Page);
/* GET create update page */
router.get('/update',secured, laptop_controller.laptop_update_Page);
/* GET delete laptop page */
router.get('/delete',secured, laptop_controller.laptop_delete_Page);

module.exports = router;
