import {readFileSync} from "node:fs";

type Input = {
    left: number[];
    right: number[];
};

const parseInput = (file: string): Input => (readFileSync(file, "utf-8") as string)
    .split("\n")
    .filter(Boolean)
    .reduce<Input>((acc, line) => {
        const result = /(\d+)\s+(\d+)/g.exec(line);
        if (!result?.length) {
            console.log("no match");
            return acc;
        }

        const [_, left, right] = result.map((value) => parseInt(value, 10));
        if (left !== undefined && right !== undefined) {
            acc.left.push(left);
            acc.right.push(right);
        }

        return acc;
    }, {left: [], right: []});

export const day1 = (exemple: boolean): void => {
    firstPart(exemple);
};

const firstPart = (exemple: boolean): void => {
    const file = exemple ? "./input/1_1_exemple.txt" : "./input/1_1.txt";

    const input = parseInput(file);

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
