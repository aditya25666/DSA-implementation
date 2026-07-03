import meetingService from "../services/meetingService";
import { minutesToTime } from "../utils/timeUtils";

const MeetingList = ({
  meetings,
  loading,
  onDelete,
}) => {

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this meeting?"
    );

    if (!confirmDelete) return;

    try {

      await meetingService.deleteMeeting(id);

      onDelete();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Unable to delete meeting."
      );

    }

  };

  return (

    <div className="rounded-xl bg-white p-6 shadow-md">

      <h2 className="mb-6 text-2xl font-semibold text-gray-700">

        Today's Meetings

      </h2>

      {loading ? (

        <p className="text-gray-500">

          Loading meetings...

        </p>

      ) : meetings.length === 0 ? (

        <p className="text-gray-500">

          No meetings scheduled.

        </p>

      ) : (

        <div className="space-y-4">

          {meetings.map((meeting) => (

            <div
              key={meeting._id}
              className="flex items-center justify-between rounded-lg border p-4"
            >

              <div>

                <h3 className="text-lg font-semibold">

                  {meeting.title}

                </h3>

                <p className="mt-1 text-gray-600">

                  {minutesToTime(meeting.startTime)}

                  {"  →  "}

                  {minutesToTime(meeting.endTime)}

                </p>

              </div>

              <button
                onClick={() => handleDelete(meeting._id)}
                className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
              >

                Delete

              </button>

            </div>

          ))}

        </div>

      )}

    </div>

  );

};

export default MeetingList;