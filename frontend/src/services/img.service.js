export const imgService = {
    uploadImg,
    loadImgs
}

async function uploadImg(ev) {
    const CLOUD_NAME = 'pukicloud'
    const UPLOAD_PRESET = 'CHECK'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    const FROM_DATA = new FormData()
    FROM_DATA.append('upload_preset', UPLOAD_PRESET)
    FROM_DATA.append('file', ev.target.files[0])
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: FROM_DATA
        })
        return res.json()
    } catch (error) {
        console.error(error, 'upload failed')
    }
}

async function loadImgs(names, type) {
    const promises = []
    const imgMap = {}

    try {
        names.forEach(img => {
            (function (name) {
                const prm = import(`../assets/imgs/${type}/${name}.${type}`)
                    // handle errors that occur during the resolution
                    .then(img => [name, img.default])
                    .catch(error => {
                        throw error
                    })
                promises.push(prm)
            })(img)
        })

        const results = await Promise.all(promises)
        results.forEach(res => imgMap[res[0]] = res[1])
        console.log(`🚀 ~ iconMap:`, imgMap)

        return imgMap
    } catch (error) {
        console.log(`cant find `, imgMap, error)
        // Handle the error here or re-throw it to the caller
        throw error
    }
}