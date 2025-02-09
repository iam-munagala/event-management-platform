const express = require("express");
const Event = require("../models/event");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, async (req, res) => {
  const { title, description, date } = req.body;
  const event = new Event({ title, description, date, createdBy: req.user.id });

  await event.save();
  res.json(event);
});

router.get("/", async (req, res) => {
  const events = await Event.find().populate("createdBy", "name");
  res.json(events);
});

router.get("/:id", async (req, res) => {
  const event = await Event.findById(req.params.id).populate(
    "createdBy",
    "name"
  );
  res.json(event);
});

router.delete("/:id", authMiddleware, async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: "Event deleted" });
});

module.exports = router;
