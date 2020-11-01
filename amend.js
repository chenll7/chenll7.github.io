const child_process = require("child_process");
const readline = require("readline");
const fs = require('fs');
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
    return filePathSplited.slice(2, filePathSplited.length - 1);
}

function amend(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', function (err, data) {
            console.log("\n#################################");
            console.log(`Check and amend file ${filePath}`);
            console.log("#################################");
            if (err) {
                reject(err);
                return;
            }
            const frontMatter = getFrontMatter(data);
            //console.log(frontMatter);
            const { data: attrs } = frontMatter;

            const fileState = fs.statSync(filePath);
            const { mtime, birthtime } = fileState;

            // Amend.
            if (!attrs.title) {
                if (filePath.match(/^.*\.[^\.]*$/))
                    attrs.title = path.basename(filePath).replace(/^(.*)\.[^\.]*$/, "$1");
                else
                    attrs.title = path.basename(filePath);
            }

            if (!attrs.date) {
                console.log("Attribute date dose not exist, use the file birthtime: " + attrs.date)
                attrs.date = moment(birthtime).utc(8).format("YYYY-MM-DD HH:mm:ss");
            } else {
                console.log("Attribute date exists: " + attrs.date)
                attrs.date = moment(attrs.date).utc(8).format("YYYY-MM-DD HH:mm:ss");
            }

            console.log("Use the file modified time: " + mtime);
            attrs.updated = moment(mtime).utc(8).format("YYYY-MM-DD HH:mm:ss");

            try {
                const categories = getCategories(filePath);
                attrs.categories = categories;
            } catch (err) {
                reject(err);
                return;
            }
            // End amending.

            const output = stringifyFrontMatter(frontMatter)
            console.log(output)

            fs.writeFile(filePath, output, err => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        })
    });
}

async function main() {
    const argv = process.argv;

    console.log("\n#################################");
    console.log("The following files are in git staging area:");
    console.log("#################################");
    const filePaths = [];
    //console.log(argv);
    if (argv.length < 3) {
        await new Promise((resolve, reject) => {
            const p = child_process.exec("git diff --name-only --diff-filter=ACMRTUXB head source/_posts");
            p.stderr.pipe(p.stdout);
            const rl = readline.createInterface({ input: p.stdout });
            rl.on("line", line => {
                line = line.replace(/^"(.*)"$/, "$1");
                console.log(line);
                filePaths.push(line);
            });
            p.on('exit', (exitCode) => {
                if (exitCode === 0) {
                    resolve();
                } else {
                    reject(exitCode);
                }
            });
        });
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