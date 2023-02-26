export const uploadService = {
    uploadImg
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
