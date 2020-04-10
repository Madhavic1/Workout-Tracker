const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const WorkoutSchema = new Schema({
    //day
    day:{
        type: Date,
        default: Date.now()
    },
    exercises:Array
    //exercise array
});

const Workout = mongoose.model("Workout",WorkoutSchema);
module.exports = Workout;