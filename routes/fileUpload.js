const express = require('express')
const multer = require('multer')
const router = express.Router();
// const upload = multer({ dest: 'Uploads/' })

// router.post('/upload', upload.single('avatar'), async (req, res) => {
//     res.json({ message: 'file uploaded successfuly' });
// });

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './Uploads')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = file.mimetype;
        callback('null', name );
        console.log(file.mimetype);
        console.log(name);
    },
    onFileUploadStart: (file) => {
        if (file.mimetype == 'jpg' || file.mimetype == 'jpeg' || file.mimetype == 'png' || file.mimetype == 'gif'){
            console.log('thats ok');
            return true;
        }
        else return false;
    }
});

const uploads = multer({ storage });

router.post('/uploads', uploads.single('avatar') ,  (req, res) => {
    res.json({ message : 'image uploaded successfuly!'});
});




module.exports = router;
