const StatsCard = ({ stats }) => {
  const cards = [
    {
      title: "Total Meetings",
      value: stats.totalMeetings,
      color: "bg-blue-500",
    },
    {
      title: "Busy Hours",
      value: `${(stats.busyMinutes / 60).toFixed(1)} hrs`,
      color: "bg-red-500",
    },
    {
      title: "Free Hours",
      value: `${(stats.freeMinutes / 60).toFixed(1)} hrs`,
      color: "bg-green-500",
    },
    {
      title: "Avg Duration",
      value: `${stats.averageDuration} mins`,
      color: "bg-yellow-500",
    },
    {
      title: "Longest Meeting",
      value: `${stats.longestMeeting} mins`,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl bg-white shadow-md p-5 transition hover:shadow-lg"
        >
          <div
            className={`mb-4 h-2 rounded-full ${card.color}`}
          />

          <h3 className="text-gray-500 text-sm font-medium">
            {card.title}
          </h3>

          <p className="mt-2 text-3xl font-bold text-gray-800">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;