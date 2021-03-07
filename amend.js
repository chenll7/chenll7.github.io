const child_process = require("child_process");
const readline = require("readline");
const fs = require('fs');
const fsPromises = fs.promises
const getFrontMatter = require('gray-matter');
const { stringify: stringifyFrontMatter } = require('gray-matter');
const path = require("path");
const moment = require("moment");
const { exit } = require("process");

function getCategories(filePath) {
    const filePathSplited = filePath.split("/");
    //console.log(filePathSplited)
    if (filePathSplited.length < 4) throw new Error("Length of file path splited is less than 4.");
    if (filePathSplited[0] !== "source") throw new Error("\"source\" is not in the file path.");
    if (filePathSplited[1] !== "_posts") throw new Error("\"_posts\" is not in the file path.");
    return filePathSplited.slice(2, filePathSplited.length - 1).map(e => e.replace(/_/g, " "));
}

async function amend(filePath) {
    try {
        // Read file.
        const fileContent = await fsPromises.readFile(filePath, 'utf8')
        console.log("\n#################################");
        console.log(`Check and amend file ${filePath}`);
        console.log("#################################");
        const frontMatter = getFrontMatter(fileContent);
        // console.debug(frontMatter);
        const { data: attrs, content: fileContentWithoutFrontMatter } = frontMatter;

        const fileState = await fsPromises.stat(filePath);
        const { mtime, birthtime } = fileState;

        // Start amending.

        // Amend attribute title.
        if (!attrs.title) {
            const splited = fileContentWithoutFrontMatter.split('\n')
            console.debug(splited)
            let title = null
            if (splited.length > 0) {
                const matchResult = /^#\s(.*)\r*/.exec(splited[0])
                if (matchResult) {
                    title = matchResult[1]
                }
            }
            if (title) {
                attrs.title = title
            } else {
                const matchResult = /^.*\.[^\.]*$/.exec(filePath)
                if (matchResult) {
                    attrs.title = matchResult[1]
                } else {
                    attrs.title = filePath
                }
            }
        }

        // Amend attribute date.
        if (!attrs.date) {
            console.log("Attribute date dose not exist, use the file birthtime: " + attrs.date)
            attrs.date = moment(birthtime).utc(8).format("YYYY-MM-DD HH:mm:ss");
        } else {
            console.log("Attribute date exists: " + attrs.date)
            attrs.date = moment(attrs.date).utc(8).format("YYYY-MM-DD HH:mm:ss");
        }

        // Amend attribute updated.
        console.log("Use the file modified time: " + mtime);
        attrs.updated = moment(mtime).utc(8).format("YYYY-MM-DD HH:mm:ss");

        // Amend attribute categories.
        try {
            const categories = getCategories(filePath);
            attrs.categories = categories;
        } catch (err) {
            reject(err);
            return;
        }

        // End amending.

        // console.debug(frontMatter)

        // Write file.
        const output = stringifyFrontMatter(frontMatter)
        console.debug(output)
        // console.log(output)
        await fsPromises.writeFile(filePath, output)
    } catch (err) {
        throw err;
    }
}

function getFilePaths(command, filePaths) {
    return new Promise((resolve, reject) => {
        const p = child_process.exec(command);
        p.stderr.pipe(p.stdout);
        const rl = readline.createInterface({ input: p.stdout });
        rl.on("line", line => {
            // 去掉双引号
            line = line.replace(/^"(.*)"$/, "$1");
            // 只处理md文件
            if (line.match(/^.*\.md$/)) {
                console.log(line);
                filePaths.push(line);
            }
        });
        p.on('exit', (exitCode) => {
            if (exitCode === 0) {
                resolve();
            } else {
                reject(exitCode);
            }
        });
    });
}

async function main() {
    const argv = process.argv;

    console.log("\n#################################");
    console.log("The following files are untracked or in the git staging area:");
    console.log("#################################");
    const filePaths = [];
    //console.log(argv);
    if (argv.length < 3) {
        await getFilePaths("git diff --name-only --diff-filter=ACMRTUXB head source/_posts", filePaths)
        await getFilePaths("git ls-files --others --exclude-standard", filePaths)
    } else {
        console.log(argv[2]);
        filePaths.push(argv[2]);
    }

    const tasks = [];
    for (const filePath of filePaths) {
        tasks.push(amend(filePath));
    }
    await Promise.all(tasks);
}

main().catch(err => { console.error(err); exit(1) })