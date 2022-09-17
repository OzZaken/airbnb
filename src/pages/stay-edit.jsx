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

    const stayTypes = [
        'apartment',
        'house',
        'secondary unit',
        'Unique space',
        'bad and breakfast',
        'boutique hotel',
    ]

    const stayOptions = stayTypes.map(stayType =>{
        return (
            <option
            key={`${stayType}`}
            value={`${stayType}`}
        >
            {`${stayType}`}
        </option>
        )
    }
        
    )

    return (
        <section className="stay-edit">
            <form action="add-stay">
                <h1>Stay Edit</h1>
                <hr />

                <label htmlFor="name">
                    <input
                        name="name"
                        placeholder="Stay name"
                        {...register('name', 'text')} />
                </label>

                <div className="flex">
                    ⭐
                    New
                    <span>
                        (0 reviews)
                    </span>

                    <li>
                        <label htmlFor="address">
                            Address
                            <input {...register('address', 'text')} />
                        </label>
                    </li>
                </div>


                <label htmlFor="imgs">
                    <div className="imgs-upload-container">
                        <div className="img-uploader1">
                            item1
                            <ImgUploader />
                        </div>
                        <div className="img-uploader2">
                        item2                           
                            <ImgUploader />
                        </div>
                        <div className="img-uploader3">
                        item3
                            <ImgUploader />
                        </div>
                        <div className="img-uploader4">
                        item4
                            <ImgUploader />
                        </div>
                        <div className="img-uploader5">
                            
                        item5
                        <ImgUploader />
                        </div>
                    </div>
                </label>
                <select id="stayTypes" >

                </select >

                <label htmlFor="capacity">
                    <input
                        placeholder="Capacity"
                        {...register('capacity', 'number')} />
                </label>

                <label htmlFor="stayType">
                    <select name="stayTypes" id="stayTypes">
                        {stayOptions}
                    </select>
                </label>


            </form>




        </section>
    )
}


