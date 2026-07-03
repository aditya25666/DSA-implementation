const FreeSlots = ({ slots, loading }) => {
  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-semibold text-gray-700">
        Available Free Slots
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : slots.length === 0 ? (
        <p className="text-gray-500">
          No free slots available.
        </p>
      ) : (
        <div className="space-y-4">
          {slots.map((slot, index) => {
            const duration =
              slot.endTime - slot.startTime;

            return (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border-l-4 border-green-500 bg-green-50 p-4 transition hover:shadow-md"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {slot.start} → {slot.end}
                  </h3>

                  <p className="mt-1 text-sm text-gray-600">
                    Duration: {duration} mins
                  </p>
                </div>

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  Free
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FreeSlots;