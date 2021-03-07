#!/usr/bin/node
const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;
const sharp = require('sharp');

const srcDirPath = "../cover-original";
const dstDirPath = "images/cover";
const cfgFilePath = "../_config.butterfly.yml";

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
        if (!fs.existsSync(srcDirPath)) {
            throw new Error(`Source directory ${srcDirPath} does not exist.`);
        }
        if (!fs.existsSync(dstDirPath)) {
            throw new Error(`Destination directory ${dstDirPath} does not exist.`);
        }
        if (!fs.existsSync(cfgFilePath)) {
            throw new Error(`Configuration file ${cfgFilePath} does not exist.`);
        }
        const srcFiles = await fsPromises.readdir(srcDirPath, { withFileTypes: true });
        await emptyDirectory(dstDirPath);
        let count = 0;
        let coverList = "";
        for (const srcFile of srcFiles) {
            if (srcFile.isFile()) {
                const matchResult = /^.*(\.jpg|\.jpeg|\.png|\.bmp)$/i.exec(srcFile.name);
                if (matchResult) {
                    const srcFilePath = path.join(srcDirPath, srcFile.name);
                    // const dstFilePath = path.join(dstDirPath, `${count}${matchResult[1]}`);
                    const dstFilePath = path.join(dstDirPath, `${count}.jpg`);
                    count++;
                    const coverListItem = `    - ${dstFilePath.replace(/\\/g, '/')}\n`;
                    coverList += coverListItem;
                    console.log(coverListItem)
                    // await fsPromises.copyFile(srcFilePath, dstFilePath);
                    // await webp.cwebp(srcFilePath, dstFilePath, "-q 80");
                    await sharp(srcFilePath).jpeg().toFile(dstFilePath);
                }
            }
        }
        const cfgFileContent = await fsPromises.readFile(cfgFilePath);
        const replaceResult = cfgFileContent.toString().replace(/default_cover:\r?\n((    - .*\r?\n)*)/, `default_cover:\n${coverList}`);
        console.log(replaceResult);
        await fsPromises.writeFile(cfgFilePath, replaceResult);
    } catch (err) {
        throw err;
    }
}

main().catch(err => console.error(err));