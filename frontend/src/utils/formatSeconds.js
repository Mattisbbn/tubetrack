import dayjs from "dayjs";
import duration from "dayjs/plugin/duration.js";

dayjs.extend(duration);

export function formatSeconds(totalSeconds) {
    const secondsNumber = Number(totalSeconds) || 0;
    const d = dayjs.duration(secondsNumber, 'seconds');
    const hours = Math.floor(d.asHours());
    const minutes = d.minutes();
    const seconds = d.seconds();
    const pad = (n) => String(n).padStart(2, '0');
    return hours > 0
        ? `${hours}:${pad(minutes)}:${pad(seconds)}`
        : `${minutes}:${pad(seconds)}`;
};

