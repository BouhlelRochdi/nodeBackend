const express = require('express')
const multer = require('multer')
const router = express.Router();

const upload = multer({ dest: 'uploads/' })

router.post('/upload', upload.single('avatar'), async (req, res) => {
    res.json({ message: 'file uploaded successfuly' });
});



module.exports = router;
