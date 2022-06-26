const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const uuid4 = require('uuid4');

const pathImages = path.join(__dirname, "../temp/images");
const pathVideos = path.join(__dirname, "../temp/videos");

module.exports = {
    uploadImage : async(req, res) => {
        await new formidable.IncomingForm().parse(req, async(err, fields, files) => {
            if(err){
                throw err;
            }
            console.log("files", files);
            const rawData = fs.readFileSync(files.image.filepath);
            id = uuid4();
            imagePath = path.join(pathImages, id + ".png");
            await fs.writeFile(imagePath, rawData, async(err) => {
                if(err) {
                    console.log(err);
                    res.status(400).send({status: "Failed"});
                }

                res.status(200).send({status: "Done", id, path: `${id}.png`});
            });
        })
    },

    uploadVideo : async(req, res) => {
        await new formidable.IncomingForm().parse(req, async(err, fields, files) => {
            if(err){
                throw err;
            }
            const rawData = fs.readFileSync(files.video.filepath);
            id = uuid4();
            videoPath = path.join(pathVideos, id + ".mp4");
            await fs.writeFile(videoPath, rawData, async(err) => {
                if(err) {
                    console.log(err);
                    res.status(400).send({status: "Failed"});
                }

                res.status(200).send({status: "Done", id, path: `${id}.mp4`});
            });
        })
    },
}
