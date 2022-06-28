const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const uuid4 = require('uuid4');

const APP_URL = "http://localhost:8000/"
//const APP_URL = "https://ex-machina-turbo.herokuapp.com"

const pathImages = path.join(__dirname, "../temp/images");
const pathVideos = path.join(__dirname, "../temp/videos");

module.exports = {
    uploadImage : async(req, res) => {
        await new formidable.IncomingForm().parse(req, async(err, fields, files) => {
            console.log(fields)
            console.log(files);
            if(err){
                throw err;
            }
            try{
                const rawData = fs.readFileSync(files.image.filepath);
                id = uuid4();
                imagePath = path.join(pathImages, id + ".png");
                await fs.writeFile(imagePath, rawData, async(err) => {
                    if(err) {
                        console.log(err);
                        res.status(400).send({status: "Failed"});
                    }
    
                    res.status(200).send({status: "Done", id, path: `${APP_URL}/images/${id}.png`});
                });
            }
            catch(err){
                console.log(err)
                res.status(400).send({status: "Failed"});
            }
        })
    },

    uploadVideo : async(req, res) => {
        await new formidable.IncomingForm().parse(req, async(err, fields, files) => {
            console.log(files);
            if(err){
                throw err;
            }
            try{
                const rawData = fs.readFileSync(files.video.filepath);
                id = uuid4();
                videoPath = path.join(pathVideos, id + ".mp4");
                await fs.writeFile(videoPath, rawData, async(err) => {
                    if(err) {
                        console.log(err);
                        res.status(400).send({status: "Failed"});
                    }
    
                    res.status(200).send({status: "Done", id, path: `${APP_URL}/videos/${id}.mp4`});
                });
            }
            catch(err){
                console.log(err)
                res.status(400).send({status: "Failed"});
            }
        })
    },

    listFiles : async(req, res) => {
        files = []
        resp = fs.readdir(path.join(__dirname, '../temp/images'), (err, images) => {
            images = images.splice(1, images.length)
            files = files.concat(images)
            resp = fs.readdir(path.join(__dirname, '../temp/videos'), (err, videos) => {
                videos = videos.splice(1, videos.length)
                files = files.concat(videos)
                res.status(200).send({files, images: images.length, videos: videos.length})
            });
        });
    },

    removeFile : async(req, res) => {
        console.log(req.query)
        if(req.query.id == '.gitkeep'){
            res.status(500).send("Hoje não")
            return
        }
        filepath = path.join(__dirname, `../temp/${req.query.folder == 'images' ? 'images' : 'videos'}/${req.query.id.split('/')[0]}`)
        console.log(filepath)
        if (fs.existsSync(filepath)) {
            fs.unlink(filepath, (err) => {
                res.status(200).send("Apagado")
                return
            })
        }else{
            res.status(200).send("Nada")
        }
    }
}
