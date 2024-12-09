import {readFileSync} from "fs";

type Operation = {
    result: number;
    operands: number[];
};

type Operator = (a: number, b: number) => number;

type Input = Operation[];

const addition: Operator = (a, b) => a + b;
const multiply: Operator = (a, b) => a * b;
const concatenation: Operator = (a, b) => Number(String(a) + String(b));

const testOperation = ({result, operands}: Operation, operators: Operator[], operator = addition, current = 0): boolean => {
    const [operand, ...rest] = operands;
    if (operand === undefined) {
        return current === result;
    }

    return operators.some((nextOperator) => testOperation({
        result,
        operands: rest,
    }, operators, nextOperator, operator(current, operand)));
};

const parseInput = (file: string): Input => readFileSync(file, "utf8")
    .split("\n")
    .filter(Boolean)
    .map<Operation>((value) => {
        const [result, operands] = value.split(": ");

        return {
            result: Number(result),
            operands: operands?.split(" ")
                .map(Number) ?? [],
        };
    });

export const day7 = (exemple: boolean): void => {
    const file = exemple ? "./input/7_exemple.txt" : "./input/7.txt";

    firstPart(parseInput(file));
    secondPart(parseInput(file));
};

const firstPart = (input: Input): void => {
    const result = input.reduce((acc, operation) => acc + (testOperation(operation, [multiply, addition]) ? operation.result : 0), 0);

    console.log(result);
};

const secondPart = (input: Input): void => {
    const result = input.reduce((acc, operation) => acc + (testOperation(operation, [multiply, addition, concatenation]) ? operation.result : 0), 0);

    console.log(result);
};
