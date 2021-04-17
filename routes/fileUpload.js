const express = require('express')
const multer = require('multer')
const router = express.Router();
const path = require('path');
// const upload = multer({ dest: 'Uploads/' })

// router.post('/upload', upload.single('avatar'), async (req, res) => {
//     res.json({ message: 'file uploaded successfuly' });
// });

const myStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        const destFile = path.resolve('./Uploads');
        // console.log(destFile);
        callback(null, destFile);
    }, 
    filename: (req, file, callback) => {
        const name = Date.now() + path.extname(file.originalname);
        callback(null, name );
    }
});

const uploads = multer({ storage : myStorage });

router.post('/uploads', uploads.single('avatar') ,  (req, res) => {
    res.json({ message : 'image uploaded successfuly!'});
});




module.exports = router;
