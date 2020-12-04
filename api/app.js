const express = require("express");
const path = require("path");
const app = express();
const fs = require('fs');
const multer = require('multer');
const musicClass = require("./musicModel");
const db = path.join(__dirname, "data/db.json");
const port = 8000;
const baseUrl = `http://localhost:${port}`;

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
            cb(null, 'images')
        }else{
            cb(null, 'musics');
        }
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + "-" + file.originalname.replace(/\s/g, ''));
    }
});

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(multer({ storage: fileStorage }).array('files', 2));
app.use(express.static(path.join(__dirname,'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
});
app.use(function(req,res,next){
    console.log("requested url is:",req.url);
    next();
});


// Routes handlers for uploading.

app.get("/",function(req,res){
    return res.render('index',{title:'upload songs'});
});

app.post("/upload",function(req,res){
    const { songname,artistname,duration,releasedate, filmname, company } = req.body;
    const songImage = req.files[0].path.replace(/\s/g, '');
    const songUrl = req.files[1].path.replace(/\s/g, '');
    const musicModal = new musicClass(songname,artistname,duration,releasedate,songImage,songUrl,filmname,company);
    return musicModal.save().then(()=>{
        return res.send(
            '<h1>Song sucessfully added</h1><br/><a href="/">Go home</a> '
        );
    }).catch(err=>{
        return res.send(
            '<h1>Error occured</h1><br/><a href="/">Go home</a> '
        );
    })
});


//Routes handlers for playlist.

app.get("/songs/:id",function(req,res,next){
    const _id = req.params.id;
    return musicClass.get(_id).then(function (song) {
        const songObj = {
            ...song,
            songurl: `${baseUrl}/${song.songurl}`,
            songimage:`${baseUrl}/${song.songimage}`
        };
        return res.status(200).json({msg:'success',data:songObj});
    }).catch(function (err) {
        return res.status(500).json({msg:'Error',data:null});
    })
});

app.get("/songs",function(req,res,next){
    return musicClass.all().then(function (songs) {
        const allSongs = songs.map(song=>{
            const {songurl, ...rest} = song;
            return {
                ...rest,
                songimage:`${baseUrl}/${rest.songimage}`
            };
        });
        return res.status(200).json({msg:'success',data:allSongs});
    }).catch(function (err) {
        return res.status(500).json({msg:"Error",data:null});
    })
});

app.get("/musics/:filename",function(req,res,next){
    const filename = req.params.filename;
    const file = path.join(__dirname,'musics',filename);
    fs.exists(file,(exists)=>{
        if(exists){
            const src = fs.createReadStream(file);
            src.pipe(res);
        }else{
            return res.status(500).json({msg:"file not found",data:null}); 
        }
    });  
})

app.use(function(req,res,next){
    return res.status(500).json({msg:"No route found"});
});



app.listen(port,function(){
    fs.exists(db,(exists) => {
        if (!exists) {
            var writeStream = fs.createWriteStream(db);
            writeStream.write("[]");
            writeStream.end();
            console.log("Musics data file created");
        }
    })
    console.log("server listening at 8000..")
})