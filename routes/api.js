const router = require("express").Router();
const { Workout } = require("../models/index");

router.post("/api/workouts", function (req, res) {
    Workout
        .create(req.body)
        .then(dbData => { res.json(dbData) })
        .catch(err => res.json(err))
});

router.get("/api/workouts", function (req, res) {
    // this needs to return total duration
    Workout
        .find({})
        .then(dbData => { res.json(dbData) })
        .catch(err => res.json(err))
});

router.put("/api/workouts/:id", async function (req, res){
    const foundWorkout = await Workout.findById(req.params.id)
    foundWorkout.exercises.push(req.body)
    await foundWorkout.save()
    res.json(foundWorkout)
})

router.get("/api/workouts/range", function (req, res){
    // this is meant to send back the last seven workouts
})

module.exports = router;