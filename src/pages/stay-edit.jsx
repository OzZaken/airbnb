import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ImgUploader } from "../cmps/img-uploader1"
import { useForm } from "../hooks/useForm"
import { Image } from 'cloudinary-react'

export const StayEdit = () => {
    const params = useParams()
    const navigate = useNavigate()


    return (
        <section className="stay-edit">
            <h1>Stay Edit</h1>
            <hr />
            <div className="imgs-upload-container">
                <div className="img-uploader item1">
                <ImgUploader/>
                </div>
                <div className="img-uploader">
                <ImgUploader/>
                </div>
                <div className="img-uploader">
                <ImgUploader/>
                </div>
                <div className="img-uploader">
                <ImgUploader/>
                </div>
                <div className="img-uploader">
                <ImgUploader/>
                </div>
            </div>
        </section>
    )
}


