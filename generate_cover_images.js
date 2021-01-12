#!/usr/bin/node
const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;

const srcDirPath = "images/cover-original";
const dstDirPath = "images/cover";

async function emptyDirectory(dirPath) {
    const subFilesOrDirs = await fsPromises.readdir(dirPath, { withFileTypes: true });
    for (const subFileOrDir of subFilesOrDirs) {
        if (subFileOrDir.isDirectory()) {
            const subDir = subFileOrDir;
            const subDirPath = path.join(dirPath, subDir.name);
            await fsPromises.rmdir(subDirPath, { maxRetries: 3, recursive: true });
        } else {
            const subFile = subFileOrDir;
            const subFilePath = path.join(dirPath, subFile.name);
            await fsPromises.unlink(subFilePath);
        }
    }
}

async function main() {
    try {
        process.chdir("source");
        if (!(fs.existsSync(srcDirPath) || fs.existsSync(dstDirPath))) {
            throw new Error("Source directory or destination directory does not exist.");
        }
        const srcFiles = await fsPromises.readdir(srcDirPath, { withFileTypes: true });
        await emptyDirectory(dstDirPath);
        let count = 0;
        for (const srcFile of srcFiles) {
            if (srcFile.isFile()) {
                const matchResult = /^.*(\.jpg|\.jpeg|\.png|\.bmp)$/i.exec(srcFile.name);
                if (matchResult) {
                    const srcFilePath = path.join(srcDirPath, srcFile.name);
                    const dstFilePath = path.join(dstDirPath, `${count}${matchResult[1]}`);
                    count++;
                    // console.log(srcFilePath);
                    console.log(`    - ${dstFilePath}`);
                    await fsPromises.copyFile(srcFilePath, dstFilePath);
                }
            }
        }
    } catch (err) {
        throw err;
    }
}

main().catch(err => console.error(err));