import {readFileSync} from "fs";

type Position = {
    x: number;
    y: number;
};

type Dimensions = Position;

type Input = {
    dimensions: Dimensions;
    antennas: Record<string, Position[]>;
};

const isValidPosition = ({x, y}: Position, dimensions: Dimensions): boolean => x >= 0 && x < dimensions.x && y >= 0 && y < dimensions.y;

const getKey = ({x, y}: Position): string => x + ":" + y;

const mirrorPosition = ({x: fromX, y: fromY}: Position, {x: toX, y: toY}: Position): Position => ({
    x: 2 * fromX - toX,
    y: 2 * fromY - toY,
});

const parseInput = (file: string): Input => readFileSync(file, "utf8")
    .split("\n")
    .filter(Boolean)
    .reduce<Input>((acc, line, y, input) => {
        if (!y) {
            acc.dimensions = {
                x: line.length,
                y: input.length,
            };
        }

        for (let x = 0; x < line.length; ++x) {
            const name = line[x];
            if (name === undefined || name === ".") {
                continue;
            }

            acc.antennas[name] = [
                ...acc.antennas[name] ?? [],
                {x, y},
            ];
        }

        return acc;
    }, {
        dimensions: {x: 0, y: 0},
        antennas: {},
    });

export const day8 = (exemple: boolean): void => {
    const file = exemple ? "./input/8_exemple.txt" : "./input/8.txt";

    firstPart(parseInput(file));
    secondPart(parseInput(file));
};

const firstPart = (input: Input): void => {
    const result = Object.values(input.antennas).reduce<Set<string>>((acc, frequency) => {
        for (let i = 0; i < frequency.length; ++i) {
            for (let j = 0; j < frequency.length; ++j) {
                const first = frequency[i];
                const second = frequency[j];
                if (i === j || first === undefined || second === undefined) {
                    continue;
                }

                const position = mirrorPosition(first, second);
                if (isValidPosition(position, input.dimensions)) {
                    acc.add(getKey(position));
                }
            }
        }

        return acc;
    }, new Set<string>());

    console.log("Result: ", result.size);
};

const secondPart = (input: Input): void => {
    const result = Object.values(input.antennas).reduce<Set<string>>((acc, frequency) => {
        for (let i = 0; i < frequency.length; ++i) {
            for (let j = 0; j < frequency.length; ++j) {
                let first = frequency[i];
                let second = frequency[j];
                if (i === j || first === undefined || second === undefined) {
                    continue;
                }

                acc.add(getKey(first));

                let position: Position;
                while (isValidPosition(position = mirrorPosition(first, second), input.dimensions)) {
                    second = first;
                    first = position;
                    acc.add(getKey(position));
                }
            }
        }

        return acc;
    }, new Set<string>());

    console.log("Result: ", result.size);
};
