const FileType = require("file-type");
const fs = require("fs");

async function isFileCorrect(file) {
    const maxFileSize = 64000
    const allowedExtentions = ["jpg", "png", "jpeg"]
    const  buf = new Uint8Array(file.buffer)
    const fileTipe = await FileType.fromBuffer(buf);
    const fileExtension = fileTipe.ext
    let err = ""
     if (!allowedExtentions.includes(fileExtension)) {
       err +=  "this file extension is not suitable ";
    }
    if (file.size > maxFileSize) {
        err +=  "file cannot be more than 64kb";
    }
    return err;
}

async function saveFileFromRequest(file) {
  const fileName = process.env.IMAGE_PATH + (new Date().getTime()+"_"+file.originalname);
  await fs.writeFile(`./static/${fileName}`,file.buffer,()=>{
               console.log("file was written");
   })
    return fileName;
}

module.exports.isFileCorrect = isFileCorrect
module.exports.saveFileFromRequest = saveFileFromRequest
