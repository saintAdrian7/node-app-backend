const express = require('express');
const router = express.Router();
const upload = require('..upload');
const User = require('./models/User');

// Endpoint to handle image upload
router.post('/upload', upload.single('image'), async (req, res) => {
  const userId = req.body.userId;

  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found.');
    }

   
    user.image = req.file.path;
    await user.save();

    res.status(200).send({ imagePath: req.file.path });
  } catch (error) {
    res.status(500).send('Error uploading image.');
  }
});

module.exports = router;
