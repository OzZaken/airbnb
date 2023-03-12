const fs = require('fs')
export const fileService = {
    saveToFile
}
function saveToFile(path, entity) {
    const data = JSON.stringify(entity)
    fs.writeFile(`data/${entity}.json`, data, (err) => {
        if (err) return console.log('err',err)
    })
}
