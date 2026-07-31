const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");


const app = express();


app.use(cors());

app.use(express.json());



// REQUEST LOGGER
app.use((req, res, next) => {

    console.log(
        "REQUEST:",
        req.method,
        req.url
    );

    next();

});




// FOLDERS

const uploadDir =
    path.join(
        __dirname,
        "uploads"
    );


const convertedDir =
    path.join(
        __dirname,
        "converted"
    );



// CREATE FOLDERS

if (!fs.existsSync(uploadDir)) {

    fs.mkdirSync(uploadDir);

}


if (!fs.existsSync(convertedDir)) {

    fs.mkdirSync(convertedDir);

}





// MULTER CONFIGURATION

const storage = multer.diskStorage({

    destination: function(req, file, cb) {

        cb(null, uploadDir);

    },


    filename: function(req, file, cb) {

        cb(null, file.originalname);

    }

});



const upload = multer({

    storage: storage

});







// WORD TO PDF

app.post(
    "/convert-word",
    upload.single("file"),
    (req, res) => {


        console.log(
            "===== CONVERT START ====="
        );



        if (!req.file) {


            console.log(
                "NO FILE RECEIVED"
            );


            return res
                .status(400)
                .send(
                    "No file uploaded"
                );


        }




        console.log(
            "FILE RECEIVED:"
        );

        console.log(req.file);





        const inputFile =
            path.join(
                uploadDir,
                req.file.originalname
            );



        const fileName =
            path.parse(
                req.file.originalname
            ).name;



        const outputPDF =
            path.join(
                convertedDir,
                fileName + ".pdf"
            );






        const libreOffice =
            "C:\\Program Files\\LibreOffice\\program\\soffice.exe";





        const command =
            `"${libreOffice}" --headless --convert-to pdf --outdir "${convertedDir}" "${inputFile}"`;





        console.log(
            "COMMAND:"
        );


        console.log(
            command
        );





        exec(
            command,
            {
                windowsHide:true
            },
            (error, stdout, stderr) => {



                console.log(
                    "LIBREOFFICE STDOUT:"
                );

                console.log(stdout);



                console.log(
                    "LIBREOFFICE STDERR:"
                );

                console.log(stderr);





                if(error){


                    console.log(
                        "EXEC ERROR:"
                    );


                    console.log(error);



                    return res
                        .status(500)
                        .send(
                            "Conversion failed"
                        );


                }





                if(!fs.existsSync(outputPDF)){



                    console.log(
                        "PDF NOT FOUND:"
                    );


                    console.log(
                        outputPDF
                    );



                    return res
                        .status(500)
                        .send(
                            "PDF was not created"
                        );


                }






                console.log(
                    "PDF CREATED:"
                );


                console.log(
                    outputPDF
                );





                res.download(
                    outputPDF,
                    fileName + ".pdf",
                    (err)=>{


                        if(err){

                            console.log(
                                "DOWNLOAD ERROR:",
                                err
                            );

                        }




                        // CLEANUP

                        if(fs.existsSync(inputFile)){

                            fs.unlinkSync(
                                inputFile
                            );

                        }



                        if(fs.existsSync(outputPDF)){

                            fs.unlinkSync(
                                outputPDF
                            );

                        }



                    }
                );



            }
        );



    }
);






// TEST ROUTE

app.get(
    "/",
    (req,res)=>{


        res.send(
            "Convertly Word Converter API running"
        );


    }
);






// SERVER START

app.listen(
    3000,
    ()=>{


        console.log(
            "Server running on port 3000"
        );


    }
);