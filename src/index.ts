import {day1} from "./day1.js";
import {day2} from "./day2.js";
import {day3} from "./day3.js";
import {day4} from "./day4.js";
import {day5} from "./day5.js";
import {day6} from "./day6.js";
import {day7} from "./day7.js";
import {day8} from "./day8.js";
import {day9} from "./day9.js";

const exemple = false;
const day = 9;

const days = [
    day1,
    day2,
    day3,
    day4,
    day5,
    day6,
    day7,
    day8,
    day9,
];

console.log("Day " + day + (exemple ? " exemple" : "")); // eslint-disable-line @typescript-eslint/no-unnecessary-condition

days[day - 1]?.(exemple);
