import { stayService } from "../../services/stay.service.local"
import { StayRate } from "./rate"

export const StayOrder = ({ stay }) => {
    if (!stay) return
    // const [register] = useFormRegister(
    // )
    // useEffect(() => {
    // }, [])
    return <section className="stay-order">
        <div className="order-container">
            <div className="flex space-between">
                {`$ ${stay.price} night`}
                <StayRate reviews={stay.reviews} />
            </div>
            {/* <LocalizationProvider/> */}
            <input type="date" name="order" id="order" />
        </div>
    </section>
}