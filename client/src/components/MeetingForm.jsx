import { useState } from "react";
import meetingService from "../services/meetingService";

const MeetingForm = ({ selectedDate, onMeetingAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    startTime: "",
    endTime: "",
    date: selectedDate,
  });

  const [loading, setLoading] = useState(false);

  const convertToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.startTime ||
      !formData.endTime
    ) {
      alert("Please fill all fields.");
      return;
    }

    const payload = {
      title: formData.title,
      startTime: convertToMinutes(formData.startTime),
      endTime: convertToMinutes(formData.endTime),
      date: selectedDate,
    };

    try {
      setLoading(true);

      await meetingService.createMeeting(payload);

      setFormData({
        title: "",
        startTime: "",
        endTime: "",
        date: selectedDate,
      });

      onMeetingAdded();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-semibold text-gray-700">
        Add New Meeting
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid gap-5 md:grid-cols-2"
      >
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">
            Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Team Meeting"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Start Time
          </label>

          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            End Time
          </label>

          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">
            Date
          </label>

          <input
            type="date"
            value={selectedDate}
            disabled
            className="w-full rounded-lg border bg-gray-100 px-4 py-3"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Meeting"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MeetingForm;