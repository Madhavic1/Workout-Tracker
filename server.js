const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URL ||
     "mongodb://user:password1@ds261460.mlab.com:61460/heroku_nsdrv7kt", 
     { useNewUrlParser : true}
     );

app.get("/stats",(req,res)=>{
    res.sendFile(path.join(__dirname, "/public/stats.html"));
});
app.get("/exercise",(req,res)=>{
    res.sendFile(path.join(__dirname, "/public/exercise.html"));
});
app.get("/api/workouts",(req,res)=>{
    db.Workout.find({})
    .then(dbWorkouts => {
        res.json(dbWorkouts);
    })
    .catch(err => {
        res.json(err);
    });
});

app.put("/api/workouts/:id",(req,res)=>{
   db.Workout.findByIdAndUpdate(req.params.id,
        {
        $push:{
          "exercises" : req.body
        }
        },
        {
           new: true
        }
   ).then(dbUpdateWorkout => {
       res.json(dbUpdateWorkout);
   })
    .catch(err => {
        res.json(err);
    });
});

app.post("/api/workouts",(req,res)=>{
    var newWorkout = new db.Workout(req.body);
    db.Workout.create(newWorkout)
    .then(dbWorkout => {
        res.send(dbWorkout);
    })
    .catch(error =>{
        res.json(error);
    });
});

app.get("/api/workouts/range",(req,res)=>{
    db.Workout.find({})
    .then(dbWorkouts =>{
        res.json(dbWorkouts);
    });
});
app.listen(PORT,()=>{
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});