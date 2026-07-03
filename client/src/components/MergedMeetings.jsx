const MergedMeetings = ({ meetings, loading }) => {
  return (
    <div className="rounded-xl bg-white p-6 shadow-md">

      <h2 className="mb-6 text-2xl font-semibold text-gray-700">
        Merged Meetings
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : meetings.length === 0 ? (
        <p className="text-gray-500">
          No merged meetings available.
        </p>
      ) : (
        <div className="space-y-4">
          {meetings.map((meeting, index) => (
            <div
              key={index}
              className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">

                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {meeting.title || "Merged Meeting"}
                  </h3>

                  <p className="mt-1 text-gray-600">
                    {meeting.start} → {meeting.end}
                  </p>
                </div>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                  Merged
                </span>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MergedMeetings;