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
            .split("   ")
            .map((value) => parseInt(value, 10));

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
    let distance = 0;
    while (input.left.length && input.right.length) {
        const minLeft = Math.min(...input.left);
        input.left.splice(input.left.indexOf(minLeft), 1);

        const minRight = Math.min(...input.right);
        input.right.splice(input.right.indexOf(minRight), 1);

        distance += Math.abs(minLeft - minRight);
    }

    console.log("Distance: ", distance);
};

const secondPart = (input: Input): void => {
    const similarity = input.left.reduce((accLeft, leftValue) => accLeft + leftValue * input.right.reduce((accRight, rightValue) => leftValue === rightValue ? accRight + 1 : accRight, 0), 0);

    console.log("Similarity: ", similarity);
};
