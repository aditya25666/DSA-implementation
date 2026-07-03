const findFreeSlots = (
    mergedMeetings,
    dayStart = 540,
    dayEnd = 1080
) => {

    const freeSlots = [];

    let current = dayStart;

    for (const meeting of mergedMeetings) {

        if (meeting.startTime > current) {

            freeSlots.push({
                startTime: current,
                endTime: meeting.startTime,
            });

        }

        current = Math.max(current, meeting.endTime);
    }

    if (current < dayEnd) {

        freeSlots.push({
            startTime: current,
            endTime: dayEnd,
        });

    }

    return freeSlots;
};

export default findFreeSlots;