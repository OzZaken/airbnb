const fs = require('fs')
const { promisify } = require('util')
/* use the promisify function from the built-in util module to convert the callback-based writeFile function into a version that returns a Promise. */
const writeFileAsync = promisify(fs.writeFile) /* create an asynchronous version of the fs.writeFile */

export const fileService = {
    loadFromFile,
    saveToFileSync,
    saveToFileAsync,
    saveToFileFast,
}

// The built-in fs module writes data to a file asynchronously, meaning that the function will return immediately without waiting for the write operation to complete.
function saveToFileSync(name, data) {
    const str = JSON.stringify(data)
    try {
        fs.writeFileSync(`data/${name}.json`, str)
    } catch (err) {
        throw err
    }
}

// possible for errors to occur after the function has returned, which could cause data loss or other issues.
function saveToFileFast(name, data) {
    const stringify = JSON.stringify(data)
    fs.writeFile(`data/${name}.json`, stringify, (err) => {
        if (err) throw err 
    })
}

async function saveToFileAsync(name, data) {
    const str = JSON.stringify(data)
    try {
        await writeFileAsync(`data/${name}.json`, str)
    } catch (err) {
        throw err
    }
}

async function loadFromFile(name) {
    try {
        const data = await fs.promises.readFile(`data/${name}.json`, 'utf-8')
        return JSON.parse(data)
    } catch (err) {
        console.log(`Error loading file ${name}: ${err.message}`)
        throw err
    }
}