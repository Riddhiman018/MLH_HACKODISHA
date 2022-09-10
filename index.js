const express = require('express');
const app = express();
const multer = require('multer');
const Tesseract = require("tesseract.js");

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'./uploads/');
  },
  filename:(req,file,cb)=>{
    cb(null,file.originalname)
  }
})

const upload =  multer({storage:storage})

app.post('/api/upload', upload.single('UploadedImage'),(req,res)=>{
  console.log(req.file);

  try{
    Tesseract.recognize(
      'uploads/'+req.file.filename,
      'eng',
      {logger:m =>console.log(m)}
    ).then(({data:{text}})=>{

      return res.json(
        {
          message:text
        }
      )
    })
  }catch(error){
    console.error(error)
  }

})

app.listen(4000, ()=>{
  console.log('server is up and running on port 3000')
})
