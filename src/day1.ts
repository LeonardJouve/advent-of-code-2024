import {readFileSync} from "node:fs";

type Input = {
    left: number[];
    right: number[];
};

const parseInput = (file: string): Input => readFileSync(file, "utf-8")
    .split("\n")
    .filter(Boolean)
    .reduce<Input>((acc, line) => {
        const [left, right] = line
            .split(/\s+/g)
            .map(Number);

        if (left !== undefined && right !== undefined) {
            acc.left.push(left);
            acc.right.push(right);
        }

        return acc;
    }, {left: [], right: []});

export const day1 = (exemple: boolean): void => {
    const file = exemple ? "./input/1_exemple.txt" : "./input/1.txt";

    firstPart(parseInput(file));
    secondPart(parseInput(file));
};

const firstPart = (input: Input): void => {
    input.left.sort((a, b) => a - b);
    input.right.sort((a, b) => a - b);

    const distance = input.left.reduce((acc, left, i) => acc + Math.abs(left - (input.right[i] ?? 0)), 0);

    console.log("Distance: ", distance);
};

const secondPart = (input: Input): void => {
    const similarity = input.left.reduce((accLeft, leftValue) => accLeft + leftValue * input.right.reduce((accRight, rightValue) => leftValue === rightValue ? accRight + 1 : accRight, 0), 0);

    console.log("Similarity: ", similarity);
};
