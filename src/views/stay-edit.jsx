import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ImgUploader } from "../cmps/img-uploader1"
import { useFormRegister } from '../hooks/useFormRegister'
import { useForm } from "../hooks/useForm"

import { stayService } from '../services/stay.service.local'

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
            amenities: [],
            summary: '',
        }
    )
    useEffect(() => {
        const stayId = params.id
        if (!stayId) return

        stayService.getById(stayId)
            .then(stay => {
                // setStay(stay)
            })
            .catch(err => {
                console.log('err:', err);
            })
    }, [])
    // const stayTypes = toysService.etStayTypes()
    const stayTypes = [
        'apartment',
        'house',
        'secondary unit',
        'Unique space',
        'bad and breakfast',
        'boutique hotel',
    ]

    const stayOptions = stayTypes.map(stayType => {
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

                <div className="flex space-between">
                    <div> ⭐ New (0 reviews)
                        <label
                            htmlFor="address">
                            · Address
                            <input {...register('address', 'text')} />
                        </label>
                    </div>

                    <div>
                        <span>share</span>
                        <span>save</span>
                    </div>

                </div>


                <label htmlFor="imgs">
                    <div className="imgs-grid-container imgs-edit">
                    
                    {/* <div><ImgUploader /></div> */}

                        <div>
                            <ImgUploader />
                        </div>
                        <div>
                            <ImgUploader />
                        </div>
                        <div>
                            <ImgUploader />
                        </div>
                        <div>
                            <ImgUploader />
                        </div>
                        <div>
                            <ImgUploader />
                        </div>
                    </div>
                </label>

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


