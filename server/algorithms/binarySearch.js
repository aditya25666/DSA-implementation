const binarySearch = (meetings, targetTime) => {
  let left = 0;
  let right = meetings.length - 1;
  let answer = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (meetings[mid].startTime >= targetTime) {
      answer = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return answer;
};

export default binarySearch;