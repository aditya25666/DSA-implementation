/**
 * Convert minutes since midnight to HH:MM format
 * Example:
 * 540 -> "09:00"
 * 615 -> "10:15"
 */
export const minutesToTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
};

/**
 * Convert HH:MM to minutes since midnight
 * Example:
 * "09:30" -> 570
 */
export const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

/**
 * Format a meeting object by adding readable start/end time.
 * Keeps the original numeric values for DSA algorithms.
 */
export const formatMeeting = (meeting) => ({
  ...meeting,
  start: minutesToTime(meeting.startTime),
  end: minutesToTime(meeting.endTime),
});

/**
 * Format a free slot object by adding readable start/end time.
 */
export const formatFreeSlot = (slot) => ({
  ...slot,
  start: minutesToTime(slot.startTime),
  end: minutesToTime(slot.endTime),
});