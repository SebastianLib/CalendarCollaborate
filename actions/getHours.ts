export const getAllHours = () => {
    let hours = [];
    for (let i = 0; i < 24; i++) {
      const quarters = [[`${i}:00`], [`${i}:15`], [`${i}:30`], [`${i}:45`]];
      hours.push(quarters[0],quarters[1],quarters[2],quarters[3]);
    }
    return hours
}
