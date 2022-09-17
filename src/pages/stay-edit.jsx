import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ImgUploader } from "../cmps/img-uploader1"
import { useForm } from "../hooks/useForm"
import { Image } from 'cloudinary-react'
import { useFormRegister } from '../hooks/useFormRegister'

export const StayEdit = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [register] = useFormRegister(
        {
            name: '',
            address: '',
            capacity: '',
            stayType: '',
            propertyType: '',
            price: '',
            amenities: '',
            summary: '',
        }
    )

    return (
        <section className="stay-edit">
            <form action="add-stay">
                <h1>Stay Edit</h1>
                <hr />

                <label htmlFor="name">
                    <input {...register('name', 'text')} />
                </label>

                {/* 
                <label htmlFor="address">
                    Address
                    <input {...register('address', 'text')} />
                    </label>
                 */}

                <label htmlFor="imgs">
                    <div className="imgs-upload-container">
                        <div className="img-uploader item1">
                            <ImgUploader />
                        </div>
                        <div className="img-uploader">
                            <ImgUploader />
                        </div>
                        <div className="img-uploader">
                            <ImgUploader />
                        </div>
                        <div className="img-uploader">
                            <ImgUploader />
                        </div>
                        <div className="img-uploader">
                            <ImgUploader />
                        </div>
                    </div>
                </label>

                <label htmlFor="capacity">
                    <input {...register('capacity', 'number')} />
                </label>

                <label htmlFor="stayType">
                   {/* <select name="" id=""></select> */}
                </label>


            </form>




        </section>
    )
}


