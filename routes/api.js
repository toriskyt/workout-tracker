const router = require("express").Router();
const Workout = require("../models/index");

router.post("/api/workouts", function (req, res){
    Workout.create(req.body).then(dbData => {res.json (dbData)}).catch (err => res.json(err))
})

module.exports = router;