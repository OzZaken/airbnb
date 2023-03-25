export const imgService = {
    uploadImg,
    loadImgs,
    loadImgsPrm,
}

/**Uploads an image to Cloudinary,
 * returns a promise that resolves with the response data. */
async function uploadImg(ev) {
    const CLOUD_NAME = 'pukicloud'
    const UPLOAD_PRESET = 'CHECK'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    const formData = new FormData()
    formData.append('upload_preset', UPLOAD_PRESET)
    formData.append('file', ev.target.files[0])
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        return res.json()
    } catch (error) {
        console.error(error, 'upload failed')
    }
}

/**Loads multiple images using dynamic imports,
 * returns a promise resolves with an object containing the loaded images. */
async function loadImgs(names, type) {
    const imgMap = {}

    try {
        for (const name of names) {
            const img = await import(`../assets/imgs/${type}/${name}.${type}`)
            imgMap[name] = img.default
        }

        return imgMap
    } catch (error) {
        console.log(`can't find `, imgMap, error)
        throw error
    }
}

/**more suitable for loading a large number of images.
 *  similar to `loadImgs`, but it uses promises.  */
async function loadImgsPrm(names, type) {
    const promises = []
    const imgMap = {}

    try {
        names.forEach(img => {
            (function (name) {
                const prm = import(`../assets/imgs/${type}/${name}.${type}`)
                    // handle errors that occur 
                    .then(img => [name, img.default])
                    .catch(err => {
                        console.log(`during the resolution image${name}`)
                        throw err
                    })
                promises.push(prm)
            })(img)
        })

        const results = await Promise.all(promises)
        results.forEach(res => imgMap[res[0]] = res[1])

        return imgMap
    } catch (error) {
        console.log(`cant find `, imgMap, error)
        // Handle the error here or re-throw it to the caller
        throw error
    }
}