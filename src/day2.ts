import {readFileSync} from "fs";

type Input = number[][];

const parseInput = (file: string): Input => readFileSync(file, "utf-8")
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split(" ").map(Number));

const isReportSafe = (report: number[]): boolean => {
    let isSortedAsc = true;
    let isSortedDesc = true;
    let isAdjacent = true;
    for (let i = 0; i < report.length - 1; ++i) {
        const current = report[i] ?? 0;
        const next = report[i + 1] ?? 0;
        isSortedAsc &&= current < next;
        isSortedDesc &&= current > next;
        isAdjacent &&= current !== next && Math.abs(current - next) <= 3;
    }

    return isAdjacent && (isSortedAsc || isSortedDesc);
};

export const day2 = (exemple: boolean): void => {
    const file = exemple ? "./input/2_exemple.txt" : "./input/2.txt";

    firstPart(parseInput(file));
    secondPart(parseInput(file));
};

const firstPart = (input: Input): void => {
    const safeReportAmount = input.reduce((acc, report) => acc + Number(isReportSafe(report)), 0);

    console.log("Safe report amount: ", safeReportAmount);
};

const secondPart = (input: Input): void => {
    const safeReportAmount = input.reduce((acc, report) => acc + Number(report.some((_, i) => {
        const reportCopy = [...report];
        reportCopy.splice(i, 1);

        return isReportSafe(reportCopy);
    })), 0);

    console.log("Safe report amount: ", safeReportAmount);
};
