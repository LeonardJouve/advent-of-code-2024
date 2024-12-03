import {readFileSync} from "fs";

type Input = string;

const parseInput = (file: string): Input => readFileSync(file, "utf8");

export const day3 = (exemple: boolean): void => {
    const file = exemple ? "./input/3_exemple.txt" : "./input/3.txt";

    firstPart(parseInput(file));
    secondPart(parseInput(file));
};

const firstPart = (input: Input): void => {
    const result = Array.from(input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g))
        .reduce((acc, value) => {
            const [, first, second] = value.map(Number);
            if (first === undefined || second === undefined) {
                return acc;
            }

            return acc + first * second;
        }, 0);

    console.log("Result: ", result);
};

const secondPart = (input: Input): void => {
    let enable = true;
    const result = Array.from(input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)|don't\(\)|do\(\)/g))
        .reduce((acc, value) => {
            const [instruction] = value;
            switch (true) {
            case instruction.includes("mul"): {
                const [, first, second] = value.map(Number);
                if (!enable || first === undefined || second === undefined) {
                    return acc;
                }

                return acc + first * second;
            }
            case instruction.includes("don't"):
                enable = false;
                break;
            case instruction.includes("do"):
                enable = true;
                break;
            }

            return acc;
        }, 0);

    console.log("Result: ", result);
};
