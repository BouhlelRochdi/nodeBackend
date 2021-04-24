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
        console.log(path.extname(file.originalname));
        callback(null, name );
    }
});

function fileFilterFn (req, file, cb) {
 
    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
   if (path.extname(file.originalname) == ".jpg" || path.extname(file.originalname) ==".jpeg" || path.extname(file.originalname) ==".png" ){

       // To accept the file pass `true`, like so:
       cb(null, true)
   }
    // To reject this file pass `false`, like so:
    cb(null, false)
   
    
   
    // You can always pass an error if something goes wrong:
    cb(new Error('Only images allowed'))
   
  }

const uploads = multer({ storage : myStorage, fileFilter : fileFilterFn});

router.post('/uploads', uploads.single('avatar') ,  (req, res) => {
    res.json({ message : 'image uploaded successfuly!'});
});




module.exports = router;
