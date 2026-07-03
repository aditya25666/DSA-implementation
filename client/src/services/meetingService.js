import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

const getMeetings = (date) =>
  API.get(`/meetings?date=${date}`);

const createMeeting = (data) =>
  API.post("/meetings", data);

const deleteMeeting = (id) =>
  API.delete(`/meetings/${id}`);

const getMergedMeetings = (date) =>
  API.get(`/meetings/merged?date=${date}`);

const getFreeSlots = (date) =>
  API.get(`/meetings/free-slots?date=${date}`);

const getStats = (date) =>
  API.get(`/meetings/stats?date=${date}`);

export default {
  getMeetings,
  createMeeting,
  deleteMeeting,
  getMergedMeetings,
  getFreeSlots,
  getStats,
};