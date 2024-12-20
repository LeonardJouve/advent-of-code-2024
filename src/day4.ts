import {readFileSync} from "fs";

type Input = string[];

enum Direction {
    HORIZONTAL,
    VERTICAL,
    NEGATIVE_DIAGONAL,
    POSITIVE_DIAGONAL,
}

type Position = {
    x: number;
    y: number;
};

const move = ({x, y}: Position, direction: Direction, reverse: boolean): Position => {
    let incrementX = 0;
    let incrementY = 0;
    switch (direction) {
    case Direction.HORIZONTAL:
        incrementX = 1;
        break;
    case Direction.VERTICAL:
        incrementY = 1;
        break;
    case Direction.NEGATIVE_DIAGONAL:
        incrementX = 1;
        incrementY = 1;
        break;
    case Direction.POSITIVE_DIAGONAL:
        incrementX = 1;
        incrementY = -1;
        break;
    }

    if (reverse) {
        incrementX *= -1;
        incrementY *= -1;
    }

    return {
        x: x + incrementX,
        y: y + incrementY,
    };
};

const getPosition = (input: Input, position: Position): string => input[position.y]?.[position.x] ?? "";

const search = (input: Input, position: Position, char: string): boolean => getPosition(input, position) === char;

const testPosition = (input: Input, position: Position, word: string): number => [Direction.HORIZONTAL, Direction.VERTICAL, Direction.NEGATIVE_DIAGONAL, Direction.POSITIVE_DIAGONAL].reduce((acc, direction) => acc + [false, true].reduce((accReverse, reverse) => accReverse + Number(testDirection(input, position, word, direction, reverse)), 0), 0);

const testDirection = (input: Input, position: Position, word: string, direction: Direction, reverse: boolean): boolean => {
    let currentPosition = {...position};

    return word.split("")
        .every((char) => {
            const found = search(input, currentPosition, char);
            currentPosition = move(currentPosition, direction, reverse);

            return found;
        });
};

const parseInput = (file: string): Input => readFileSync(file, "utf8")
    .split("\n")
    .filter(Boolean);

export const day4 = (exemple: boolean): void => {
    const file = exemple ? "./input/4_exemple.txt" : "./input/4.txt";

    firstPart(parseInput(file));
    secondPart(parseInput(file));
};

const testReverseX = (input: Input, {x, y}: Position, reverse: boolean): boolean => testDirection(input, {x, y}, "MAS", Direction.NEGATIVE_DIAGONAL, reverse) && (testDirection(input, {x, y: y + (reverse ? -2 : 2)}, "MAS", Direction.POSITIVE_DIAGONAL, reverse) || testDirection(input, {x: x + (reverse ? -2 : 2), y}, "MAS", Direction.POSITIVE_DIAGONAL, !reverse));

const testX = (input: Input, position: Position): number => [false, true].reduce((acc, reverse) => acc + Number(testReverseX(input, position, reverse)), 0);

const firstPart = (input: Input): void => {
    const word = "XMAS";
    const result = input.reduce((acc, line, y) => acc + line.split("").reduce((accLine, char, x) => accLine + Number(word.startsWith(char) && testPosition(input, {x, y}, word)), 0), 0);

    console.log("Result: ", result);
};

const secondPart = (input: Input): void => {
    const result = input.reduce((acc, line, y) => acc + line.split("").reduce((accLine, _, x) => accLine + testX(input, {x, y}), 0), 0);

    console.log("Result: ", result);
};
