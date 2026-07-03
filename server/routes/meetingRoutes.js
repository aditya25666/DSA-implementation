import express from "express";

import {
  createMeeting,
  getAllMeetings,
  deleteMeeting,
  getMergedMeetings,
  getFreeSlots,
  getMeetingStats,
} from "../controllers/meetingController.js";

const router = express.Router();

router.post("/", createMeeting);

router.get("/", getAllMeetings);

router.get("/merged", getMergedMeetings);

router.get("/free-slots", getFreeSlots);

router.get("/stats", getMeetingStats);

router.delete("/:id", deleteMeeting);



export default router;