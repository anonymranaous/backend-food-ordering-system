var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/addCategory', async(req, res)=>{
  const categoryObject  = req.body;
  //create a new category
  const newCategory = await Category.create(categoryObject);
  if (newCategory)
    res.status(200).json(newCategory)
  else
    res.status(401).json({ message: 'Cannot add category (Invalid or missing details)' })

})
module.exports = router;
