const { Router } = require("express");
const multer = require('multer');
const path = require("path");
const { v4: uuid4 } = require('uuid')

const File = require('../models/fileModel')
const router = Router()

// ----------------- MULTER CONFIGURATION For Uploading Multimedia File Through Form----------------

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'uploads/')
    },
    filename: (req,file,cb) => {
        const ext = path.extname(file.originalname)
        cb(null,`${Date.now()}+${file.fieldname}${ext}`)    
    }
})

const upload = multer({ 
    storage:storage,
    limit : { fileSize: 1000000 * 100 }
}) 

// -------------------------------Route to UPLOAD FILES To Server----------------------------------------

router.post('/',upload.single('imageFile'),async (req,res) => {
    if(!req.file) {
        return res.status(404).json({
            error: 'File field is required'
        })
    }

    try {
        const resp = await File.create({
            name : req.file.filename,
            uuid: uuid4(),
            path: req.file.path,
            size: req.file.size
        })
//         res.status(200).json({file:`${process.env.BASE_URL}/files/${resp.uuid}`})
        res.status(200).json({file:`http://127.0.0.1:8000/files/${resp.uuid}`})
        
    } catch (err) {
        console.log(err)
        res.status(404).json({
            err
        })   
    }                                                                                                                                                                                                                                                                                                                                                                                
})

// ----------------------------------Route to Send Email-------------------------------------------

router.post('/send-email', async (req,res) => {

})

module.exports = router
