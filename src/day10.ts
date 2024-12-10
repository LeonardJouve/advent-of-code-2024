import {readFileSync} from "fs";

type Input = string[];

type Position = {
    x: number;
    y: number;
};

enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT,
}

const getPosition = (input: Input, {x, y}: Position): string => input[y]?.[x] ?? "";

const isValidMove = (input: Input, from: Position, to: Position): boolean => Boolean(getPosition(input, to).length) && Number(getPosition(input, from)) + 1 === Number(getPosition(input, to));

const move = (position: Position, direction: Direction): Position => {
    const newPositon = {...position};
    switch (direction) {
    case Direction.UP:
        newPositon.y -= 1;
        break;
    case Direction.DOWN:
        newPositon.y += 1;
        break;
    case Direction.LEFT:
        newPositon.x -= 1;
        break;
    case Direction.RIGHT:
        newPositon.x += 1;
        break;
    }

    return newPositon;
};

const getKey = ({x, y}: Position): string => x + ":" + y;

const testPosition = (input: Input, position: Position, useSet = true, summit = new Set<string>()): number => {
    if (getPosition(input, position) === "9") {
        if (useSet && summit.has(getKey(position))) {
            return 0;
        }

        summit.add(getKey(position));
        return 1;
    }

    return [Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT].reduce((acc, direction) => acc + (isValidMove(input, position, move(position, direction)) ? testPosition(input, move(position, direction), useSet, summit) : 0), 0);
};

const parseInput = (file: string): Input => readFileSync(file, "utf8")
    .split("\n")
    .filter(Boolean);

export const day10 = (exemple: boolean): void => {
    const file = exemple ? "./input/10_exemple.txt" : "./input/10.txt";

    firstPart(parseInput(file));
    secondPart(parseInput(file));
};

const firstPart = (input: Input): void => {
    const result = input.reduce((acc, line, y) => acc + line.split("").reduce((accLine, char, x) => accLine + (char === "0" ? testPosition(input, {x, y}) : 0), 0), 0);

    console.log("Result: ", result);
};

const secondPart = (input: Input): void => {
    const result = input.reduce((acc, line, y) => acc + line.split("").reduce((accLine, char, x) => accLine + (char === "0" ? testPosition(input, {x, y}, false) : 0), 0), 0);

    console.log("Result: ", result);
};
