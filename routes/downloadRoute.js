const { Router } = require("express");
const File = require('./../models/fileModel')
const router = Router()

//------------------------------ Route to Download Page Link ----------------------------------------
router.get('/:uuid',async (req,res) => {
    try{
        const resp = await File.findOne({ uuid:req.params.uuid})
        console.log(resp)
        if(!resp) {
            res.render('download',{ error:"Link has been expired" })
        }

        res.render('download',{ 
            uuid:resp.uuid,
            filename:resp.name,
            fileSize:resp.size,
//             download: `${process.env.BASE_URL}/files/download/${resp.uuid}`
            download: `http://127.0.0.1:8000/files/download/${resp.uuid}`
            
         })
    
    }catch(err) {
        res.render('download',{ error:`Something went wrong- ${err}` }) 
    }
})

//------------------------------ Route to Download Button Link ----------------------------------------
router.get('/download/:uuid',async (req,res) => {
    try {
        const resp = await File.findOne({ uuid:req.params.uuid })
        if(!resp) {
            res.render('download',{ error:"Link has been expired" })
        }
        
        const filepath = `${__dirname}/../${resp.path}`
        res.download(filepath)

    } catch (err) {
        res.render('download',{ error:`Something went wrong - ${err}` }) 
    }
})

module.exports = router
