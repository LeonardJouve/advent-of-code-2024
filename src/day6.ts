import {readFileSync} from "fs";

type Position = {
    x: number;
    y: number;
};

type Dimensions = Position;

type Guard = {
    position: Position;
    direction: Direction;
};

enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT,
}

type Input = {
    obstacles: Set<string>;
    guard: Guard;
    dimensions: Dimensions;
};

const isValidPosition = ({x, y}: Position, dimensions: Dimensions): boolean => x >= 0 && x < dimensions.x && y >= 0 && y < dimensions.y;

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

const turn = (direction: Direction): Direction => {
    switch (direction) {
    case Direction.UP:
        return Direction.RIGHT;
    case Direction.DOWN:
        return Direction.LEFT;
    case Direction.LEFT:
        return Direction.UP;
    default:
        return Direction.DOWN;
    }
};

const testLoop = (visited: Set<string>, position: Position, direction: Direction, dimensions: Dimensions, obstacles: Set<string>): boolean => {
    const currentVisited = new Set<string>(visited);
    const currentObstacles = new Set<string>(obstacles);
    currentObstacles.add(getKey(move(position, direction)));
    let currentPosition = {...position};
    let currentDirection = turn(direction);

    while (isValidPosition(currentPosition, dimensions)) {
        const key = getKeyWithDirection(currentPosition, currentDirection);
        if (currentVisited.has(key)) {
            return true;
        }

        currentVisited.add(key);

        while (currentObstacles.has(getKey(move(currentPosition, currentDirection)))) {
            currentDirection = turn(currentDirection);
            continue;
        }

        currentPosition = move(currentPosition, currentDirection);
    }

    return false;
};

const getKey = ({x, y}: Position): string => x + ":" + y;

const getKeyWithDirection = (position: Position, direction: Direction): string => getKey(position) + ":" + direction;

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

        let currentPosition = -1;
        while ((currentPosition = line.indexOf("#", currentPosition + 1)) !== -1) {
            acc.obstacles.add(getKey({x: currentPosition, y}));
        }

        if (line.includes("^")) {
            acc.guard.position = {
                x: line.indexOf("^"),
                y,
            };
        }

        return acc;
    }, {
        obstacles: new Set(),
        guard: {
            position: {
                x: 0,
                y: 0,
            },
            direction: Direction.UP,
        },
        dimensions: {
            x: 0,
            y: 0,
        },
    });

export const day6 = (exemple: boolean): void => {
    const file = exemple ? "./input/6_exemple.txt" : "./input/6.txt";

    firstPart(parseInput(file));
    secondPart(parseInput(file));
};

const firstPart = (input: Input): void => {
    const visited = new Set<string>();
    while (isValidPosition(input.guard.position, input.dimensions)) {
        visited.add(getKey(input.guard.position));

        while (input.obstacles.has(getKey(move(input.guard.position, input.guard.direction)))) {
            input.guard.direction = turn(input.guard.direction);
        }

        input.guard.position = move(input.guard.position, input.guard.direction);
    }

    console.log("Result: ", visited.size);
};

const secondPart = (input: Input): void => {
    let amount = 0;
    const visited = new Set<string>();
    while (isValidPosition(input.guard.position, input.dimensions)) {
        visited.add(getKeyWithDirection(input.guard.position, input.guard.direction));

        while (input.obstacles.has(getKey(move(input.guard.position, input.guard.direction)))) {
            input.guard.direction = turn(input.guard.direction);
            continue;
        }

        amount += Number(isValidPosition(move(input.guard.position, input.guard.direction), input.dimensions) && testLoop(visited, input.guard.position, input.guard.direction, input.dimensions, input.obstacles));

        input.guard.position = move(input.guard.position, input.guard.direction);
    }

    console.log("Result: ", amount);
};
