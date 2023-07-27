const router = require('express').Router();
// import todo model
import noteItemModel, { find, findByIdAndDelete } from '../models/noteItem';
import { API } from 'aws-amplify';
import { addNote } from '../graphql/mutations';
router.get('/', function (req, res) {});

// add note Item to database
router.post('/api/item', async (req, res) => {
  try {
    const newItem = new noteItemModel({
      title: req.body.title,
      content: req.body.content
    });
    // save this item to database via graphql
    // const saveItem = await newItem.save();
    const saveItem = await API.graphql({
      query: addNote,
      variables: {
        input: {
          title: newItem.title,
          content: newItem.content
        }
      }
    });
    res.status(200).json(saveItem);
    console.log('Saved to database');
  } catch (err) {
    res.json(err);
  }
});

// fetch data from database
router.get('/api/items', async (req, res) => {
  try {
    // find all
    const allNoteItems = await find({});
    res.status(200).json(allNoteItems);
  } catch (err) {
    res.json(err);
  }
});

// delete item from database
router.delete('/api/item/:id', async (req, res) => {
  try {
    // find the item by its id and delete it
    const deleteItem = await findByIdAndDelete(req.params.id);
    res.status(200).json('Item Deleted');
  } catch (err) {
    res.json(err);
  }
});

// export router
export default router;
