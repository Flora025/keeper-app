const router = require('express').Router();
// import todo model
const noteItemModel = require('../models/noteItem');

// add note Item to database
router.post('/api/item', async (req, res) => {
  try {
    console.log('server');
    const newItem = new noteItemModel({
      title: req.body.title,
      content: req.body.content
    });
    // save this item to database
    const saveItem = await newItem.save();
    res.status(200).json(saveItem);
  } catch (err) {
    res.json(err);
  }
});

// fetch data from database
router.get('/api/items', async (req, res) => {
  try {
    // find all
    const allNoteItems = await noteItemModel.find({});
    res.status(200).json(allNoteItems);
  } catch (err) {
    res.json(err);
  }
});

// delete item from database
router.delete('/api/item/:id', async (req, res) => {
  try {
    // find the item by its id and delete it
    const deleteItem = await noteItemModel.findByIdAndDelete(req.params.id);
    res.status(200).json('Item Deleted');
  } catch (err) {
    res.json(err);
  }
});

// export router
module.exports = router;
