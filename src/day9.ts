import {readFileSync} from "fs";

type File = {
    name: number;
    size: number;
};

type Free = {
    size: number;
};

type Entry = ({
    used: true;
    content: File;
} | {
    used: false;
    content: Free;
});

type Input = Entry[];

const removeEmpty = (entry: Entry): boolean => Boolean(entry.content.size);

const parseInput = (file: string): Input => readFileSync(file, "utf8")
    .split("")
    .filter((value) => value.match(/\d/g))
    .map(Number)
    .map<Entry>((size, i) => i % 2 ? {
        used: false,
        content: {size},
    } : {
        used: true,
        content: {
            name: i / 2,
            size,
        },
    })
    .filter(removeEmpty);

export const day9 = (exemple: boolean): void => {
    const file = exemple ? "./input/9.txt" : "./input/9_exemple.txt";

    firstPart(parseInput(file));
    secondPart(parseInput(file));
};

const firstPart = (input: Input): void => {
    let entries = [...input];
    while (entries.some(({used}) => !used)) {
        const fileIndex = entries.findLastIndex(({used}) => used);
        const file = entries[fileIndex];
        if (file === undefined) {
            continue;
        }

        const freeIndex = entries.findIndex((entry) => !entry.used);
        const free = entries[freeIndex];
        if (free === undefined) {
            continue;
        }

        const size = Math.min(free.content.size, file.content.size);
        file.content.size -= size;
        free.content.size -= size;
        entries.splice(freeIndex, 0, {
            ...file,
            content: {
                ...file.content,
                size,
            },
        } as Entry);

        entries = entries.filter(removeEmpty);
    }

    let i = 0;
    let result = 0;
    for (const {used, content} of entries) {
        if (!used) {
            continue;
        }

        for (let j = 0; j < content.size; ++j) {
            result += content.name * i++;
        }
    }

    console.log("Result: ", result);
};

const secondPart = (input: Input): void => {
    let entries = [...input];
    for (let name = entries.filter(({used}) => used).length - 1; name > 0; --name) {
        const fileIndex = entries.findIndex(({used, content}) => used && content.name === name);
        const file = entries[fileIndex];
        if (file === undefined) {
            continue;
        }

        const freeIndex = entries.findIndex((entry, freeIndex) => !entry.used && entry.content.size >= file.content.size && freeIndex < fileIndex);
        const free = entries[freeIndex];
        if (free === undefined) {
            continue;
        }


        entries.splice(freeIndex, 0, {
            ...file,
            content: {...file.content},
        } as Entry);
        free.content.size -= file.content.size;
        file.used = false;
        Reflect.deleteProperty(file.content, "name");
    }

    entries = entries.filter(removeEmpty);

    let i = 0;
    let result = 0;
    for (const {used, content} of entries) {
        if (!used) {
            i += content.size;
            continue;
        }

        for (let j = 0; j < content.size; ++j) {
            result += content.name * i++;
        }
    }

    console.log("Result: ", result);
};
