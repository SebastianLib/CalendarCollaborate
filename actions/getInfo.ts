export const getInfo = (start:string, end:string) => {
    const startingTimeParts = start.split(":");
    const endingTimeParts = end.split(":");

    const startingHour = parseInt(startingTimeParts[0]);
    const startingMinute = parseInt(startingTimeParts[1]);
    const endingHour = parseInt(endingTimeParts[0]);
    const endingMinute = parseInt(endingTimeParts[1]);

    const totalStarting = startingHour * 60 + startingMinute;

    const totalEnding = endingHour * 60 + endingMinute;

    const timeDifferenceInMinutes =
      endingHour * 60 + endingMinute - (startingHour * 60 + startingMinute);
    const width = (timeDifferenceInMinutes / 15) * 30;

    return {totalStarting, totalEnding, width}
}