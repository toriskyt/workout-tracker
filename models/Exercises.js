const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExercisesSchema = new Schema({
    day: {
        type: Date,
        default: () => new Date()
    },
    exercises: {

        type: String,

        name: String,

        duration: Number,

        distance:  Number,

        weight:  Number,

        reps:  Number,

        sets:  Number
    }    
});

const Exercises = mongoose.model("Exercises", ExercisesSchema);

//exporting Exercises
module.exports = Exercises;