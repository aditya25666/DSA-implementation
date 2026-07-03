import { useEffect, useState } from "react";

import MeetingForm from "../components/MeetingForm";
import MeetingList from "../components/MeetingList";
import MergedMeetings from "../components/MergedMeetings";
import FreeSlots from "../components/FreeSlots";
import StatsCard from "../components/StatsCard";

import meetingService from "../services/meetingService";

const Dashboard = () => {
  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);

  const [meetings, setMeetings] = useState([]);
  const [mergedMeetings, setMergedMeetings] = useState([]);
  const [freeSlots, setFreeSlots] = useState([]);
  const [stats, setStats] = useState({
    totalMeetings: 0,
    busyMinutes: 0,
    freeMinutes: 0,
    averageDuration: 0,
    longestMeeting: 0,
  });

  const [loading, setLoading] = useState(false);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [
        meetingsRes,
        mergedRes,
        freeSlotsRes,
        statsRes,
      ] = await Promise.all([
        meetingService.getMeetings(selectedDate),
        meetingService.getMergedMeetings(selectedDate),
        meetingService.getFreeSlots(selectedDate),
        meetingService.getStats(selectedDate),
      ]);

      setMeetings(meetingsRes.data.data);
      setMergedMeetings(mergedRes.data.data);
      setFreeSlots(freeSlotsRes.data.data);
      setStats(statsRes.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, [selectedDate]);

  return (
    <div className="min-h-screen bg-slate-100">

  <div className="mx-auto max-w-7xl p-8">

    {/* Header */}

    <div className="mb-8 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-10 text-white shadow-xl">

      <h1 className="text-4xl font-bold">
        Meeting Slot Finder
      </h1>

      <p className="mt-2 text-blue-100">
        Organize meetings, detect overlaps and discover available slots effortlessly.
      </p>

    </div>

    {/* Date */}

    <div className="mb-8 flex justify-end">

      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="rounded-xl border bg-white px-5 py-3 shadow"
      />

    </div>

    <StatsCard stats={stats} />

    <div className="mt-8">
      <MeetingForm
        selectedDate={selectedDate}
        onMeetingAdded={loadDashboard}
      />
    </div>

    <div className="mt-8 grid gap-8 lg:grid-cols-2">

      <MeetingList
        meetings={meetings}
        loading={loading}
        onDelete={loadDashboard}
      />

      <MergedMeetings
        meetings={mergedMeetings}
        loading={loading}
      />

    </div>

    <div className="mt-8">

      <FreeSlots
        slots={freeSlots}
        loading={loading}
      />

    </div>

  </div>

</div>
  );
};

export default Dashboard;