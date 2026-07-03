import Meeting from "../models/Meeting.js";
import mergeIntervals from "../algorithms/mergeIntervals.js";
import findFreeSlots from "../algorithms/freeSlots.js";

import {
  formatMeeting,
  formatFreeSlot,
} from "../utils/timeUtils.js";

/* ===========================
   Create Meeting
=========================== */

const createMeeting = async (meetingData) => {
  const { title, startTime, endTime, date } = meetingData;

  if (!title || startTime === undefined || endTime === undefined || !date) {
    throw new Error("All fields are required.");
  }

  if (startTime >= endTime) {
    throw new Error("Start time must be less than end time.");
  }

  return await Meeting.create(meetingData);
};

/* ===========================
   Get All Meetings
=========================== */

const getAllMeetings = async (date) => {
  const meetings = await Meeting.find({ date }).sort({
    startTime: 1,
  });

  return meetings.map((meeting) =>
    formatMeeting(meeting.toObject())
  );
};

/* ===========================
   Delete Meeting
=========================== */

const deleteMeeting = async (id) => {
  const meeting = await Meeting.findByIdAndDelete(id);

  if (!meeting) {
    throw new Error("Meeting not found.");
  }

  return meeting;
};

/* ===========================
   Merge Meetings
=========================== */

const getMergedMeetings = async (date) => {
  const meetings = await Meeting.find({ date }).sort({
    startTime: 1,
  });

  const mergedMeetings = mergeIntervals(
    meetings.map((meeting) => ({
      title: meeting.title,
      startTime: meeting.startTime,
      endTime: meeting.endTime,
    }))
  );

  return mergedMeetings.map(formatMeeting);
};

/* ===========================
   Free Slots
=========================== */

const getFreeSlots = async (date) => {
  const meetings = await Meeting.find({ date }).sort({
    startTime: 1,
  });

  const mergedMeetings = mergeIntervals(
    meetings.map((meeting) => ({
      title: meeting.title,
      startTime: meeting.startTime,
      endTime: meeting.endTime,
    }))
  );

  const freeSlots = findFreeSlots(mergedMeetings);

  return freeSlots.map(formatFreeSlot);
};

/* ===========================
   Statistics
=========================== */

const getMeetingStats = async (date) => {
  const meetings = await Meeting.find({ date }).sort({
    startTime: 1,
  });

  if (meetings.length === 0) {
    return {
      totalMeetings: 0,
      busyMinutes: 0,
      freeMinutes: 540,
      averageDuration: 0,
      longestMeeting: 0,
    };
  }

  const mergedMeetings = mergeIntervals(
    meetings.map((meeting) => ({
      startTime: meeting.startTime,
      endTime: meeting.endTime,
    }))
  );

  let busyMinutes = 0;
  let longestMeeting = 0;

  for (const meeting of mergedMeetings) {
    const duration = meeting.endTime - meeting.startTime;

    busyMinutes += duration;

    longestMeeting = Math.max(longestMeeting, duration);
  }

  const workingDayMinutes = 540;

  return {
    totalMeetings: meetings.length,

    busyMinutes,

    freeMinutes: workingDayMinutes - busyMinutes,

    averageDuration: Math.round(
      busyMinutes / meetings.length
    ),

    longestMeeting,
  };
};

export default {
  createMeeting,
  getAllMeetings,
  deleteMeeting,
  getMergedMeetings,
  getFreeSlots,
  getMeetingStats,
};