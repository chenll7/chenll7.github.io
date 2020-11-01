const child_process = require("child_process");
const readline = require("readline");
const fs = require('fs');
const { promises: fsPromises } = require("fs");
const getFrontMatter = require('gray-matter');
const { stringify: stringifyFrontMatter } = require('gray-matter');
const path = require("path");
const moment = require("moment");
const { exit, listenerCount } = require("process");

const problems = [];

function isCategoriesValid(categories, filePath) {
    //console.log(Array.isArray(categories))
    if (!Array.isArray(categories)) return false;
    const filePathSplited = filePath.split(path.sep);

    console.log(filePathSplited);
    if (filePathSplited.length - categories.length !== 3) return false;
    for (let i = 0; i < categories.length; i++) {
        if (categories[i] !== filePathSplited[i + 2]) return false;
    }
    return true;
}

async function lint(filePath) {
    if (!filePath.match(/^.*\.md$/i, filePath)) return;

    console.log("\n#################################");
    console.log(`Check file ${filePath}`);
    console.log("#################################");

    const fileContent = await fsPromises.readFile(filePath);
    const frontMatter = getFrontMatter(fileContent);
    const { data: attrs } = frontMatter;
    console.log(attrs);

    // Check attribute.
    if (!attrs.title) {
        const s = `Front matter of file ${filePath} has no title attribute.`;
        problems.push(s);
        //console.log(s);
    }
    if (!attrs.date) {
        const s = `Front matter of file ${filePath} has no date attribute.`;
        problems.push(s);
        //console.log(s);
    }
    if (!isCategoriesValid(attrs.categories, filePath)) {
        const s = `Front matter of file ${filePath} has no categories attribute or it is invalid.`;
        problems.push(s);
    }
}

async function traverse(dirPath) {
    const files = await fsPromises.readdir(dirPath, { withFileTypes: true });
    for (const file of files) {
        const filePath = path.join(dirPath, file.name);
        if (file.isDirectory()) {
            await traverse(filePath);
        }
        if (file.isFile()) {
            await lint(filePath);
        }
    }
}

async function main() {
    await traverse("source/_posts");

    console.log("\n#################################");
    console.log(`Result`);
    console.log("#################################");

    console.log(problems.join("\n"));
    if (problems.length !== 0) exit(1);
}

main().catch(err => {
    console.error(err);
    exit(1);
});