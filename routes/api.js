const router = require("express").Router();
const { Workout } = require("../models/index");

router.post("/api/workouts", function (req, res) {
    Workout
        .create(req.body)
        .then(dbData => { res.json(dbData) })
        .catch(err => res.json(err))
});

router.get("/api/workouts", function (req, res) {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration"
                }
            }
        }
    ])
        .then(dbData => { res.json(dbData) })
        .catch(err => res.json(err))
});

router.put("/api/workouts/:id", async function (req, res) {
    const foundWorkout = await Workout.findById(req.params.id)
    foundWorkout.exercises.push(req.body)
    await foundWorkout.save()
    res.json(foundWorkout)
})

router.get("/api/workouts/range", function (req, res) {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration"
                },
                totalWeight: {
                    $sum: "$exercises.weight"
                }
            }
        }
    ])
        .sort({ day: "desc" })
        .limit(7)
        .sort({ day: "asc" })
        .then(dbData => { res.json(dbData) })
        .catch(err => res.json(err))
})

module.exports = router;