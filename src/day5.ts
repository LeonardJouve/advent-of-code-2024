import {readFileSync} from "fs";

type Dependances = Record<number, number[]>;

type Update = number[];

type Input = {
    dependances: Dependances;
    updates: Update[];
};

const parseInput = (file: string): Input => {
    const [dependances, updates] = readFileSync(file, "utf8").split("\n\n");
    if (!dependances || !updates) {
        return {
            dependances: {},
            updates: [],
        };
    }

    return {
        dependances: dependances.split("\n")
            .filter(Boolean)
            .reduce<Dependances>((acc, dependance) => {
                const [first, second] = dependance.split("|").map(Number);
                if (first !== undefined && second !== undefined) {
                    acc[second] = [
                        ...acc[second] ?? [],
                        first,
                    ];
                }

                return acc;
            }, {}),
        updates: updates.split("\n")
            .filter(Boolean)
            .map((update) => update.split(",").map(Number)),
    };
};

const sortUpdate = (update: Update, dependances: Dependances): Update => update.sort((a, b) => (dependances[a] ?? []).includes(b) ? 1 : -1);

const isUpdateCorrect = (update: Update, dependances: Dependances): boolean => {
    const set = new Set();
    for (const page of update) {
        const pageDependances = dependances[page];
        if (pageDependances !== undefined && !pageDependances.every((dependance) => set.has(dependance) || !update.includes(dependance))) {
            return false;
        }

        set.add(page);
    }

    return true;
};

export const day5 = (exemple: boolean): void => {
    const file = exemple ? "./input/5_exemple.txt" : "./input/5.txt";

    firstPart(parseInput(file));
    secondPart(parseInput(file));
};

const firstPart = ({dependances, updates}: Input): void => {
    const result = updates.reduce((acc, update) => acc + (isUpdateCorrect(update, dependances) ? update[Math.floor(update.length / 2)] ?? 0 : 0), 0);

    console.log("Result: ", result);
};

const secondPart = ({dependances, updates}: Input): void => {
    const result = updates.reduce((acc, update) => acc + (isUpdateCorrect(update, dependances) ? 0 : sortUpdate(update, dependances)[Math.floor(update.length / 2)] ?? 0), 0);

    console.log("Result: ", result);
};
