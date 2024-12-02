import {day1} from "./day1.js";
import {day2} from "./day2.js";

const exemple = false;
const day = 2;

const days = [
    day1,
    day2,
];

days[day - 1]?.(exemple);
