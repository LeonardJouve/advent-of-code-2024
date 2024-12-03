import {day1} from "./day1.js";
import {day2} from "./day2.js";
import {day3} from "./day3.js";

const exemple = false;
const day = 3;

const days = [
    day1,
    day2,
    day3,
];

days[day - 1]?.(exemple);
