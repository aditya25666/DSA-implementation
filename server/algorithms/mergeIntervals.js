const MergeIntervals = (meetings) => {
  if (meetings.length <= 1) return meetings;

  // Sort meetings by start time
  const sortedMeetings = [...meetings].sort(
    (a, b) => a.startTime - b.startTime
  );

  const merged = [sortedMeetings[0]];

  for (let i = 1; i < sortedMeetings.length; i++) {
    const current = sortedMeetings[i];
    const lastMerged = merged[merged.length - 1];

    if (current.startTime <= lastMerged.endTime) {
      lastMerged.endTime = Math.max(lastMerged.endTime, current.endTime);
    } else {
      merged.push({ ...current });
    }
  }

  return merged;
};

export default MergeIntervals;