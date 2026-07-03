import meetingService from "../services/meetingService.js";

/* ===========================
   Create Meeting
=========================== */

const createMeeting = async (req, res) => {
  try {
    const meeting = await meetingService.createMeeting(req.body);

    res.status(201).json({
      success: true,
      data: meeting,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   Get All Meetings
=========================== */

const getAllMeetings = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required.",
      });
    }

    const meetings = await meetingService.getAllMeetings(date);

    res.status(200).json({
      success: true,
      count: meetings.length,
      data: meetings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   Delete Meeting
=========================== */

const deleteMeeting = async (req, res) => {
  try {
    await meetingService.deleteMeeting(req.params.id);

    res.status(200).json({
      success: true,
      message: "Meeting deleted successfully.",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   Get Merged Meetings
=========================== */

const getMergedMeetings = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required.",
      });
    }

    const mergedMeetings =
      await meetingService.getMergedMeetings(date);

    res.status(200).json({
      success: true,
      count: mergedMeetings.length,
      data: mergedMeetings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   Get Free Slots
=========================== */

const getFreeSlots = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required.",
      });
    }

    const freeSlots =
      await meetingService.getFreeSlots(date);

    res.status(200).json({
      success: true,
      count: freeSlots.length,
      data: freeSlots,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   Meeting Statistics
=========================== */

const getMeetingStats = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required.",
      });
    }

    const stats =
      await meetingService.getMeetingStats(date);

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  createMeeting,
  getAllMeetings,
  deleteMeeting,
  getMergedMeetings,
  getFreeSlots,
  getMeetingStats,
};