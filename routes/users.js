var express = require('express');
var router = express.Router();
const userController = require("../controllers/user.controller")
// 
/* GET users listing. */
router.post(
  "/signup",
  userController.signup,
  
);

router.get("/signin", userController.signin);

module.exports = router;
