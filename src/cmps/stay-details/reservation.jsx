import { stayService } from "../../services/stay.service.local"
import { StayRate } from "./rate"

export const StayReservation = ({ stay }) => {
    if (!stay) return
    // const [register] = useFormRegister(
    // )
    // useEffect(() => {
    // }, [])
    return <section className="stay-reservation">
        <div className="reservation-container">
            <div className="flex space-between">
                {`$ ${stay.price} night`}
                <StayRate reviews={stay.reviews} />
            </div>
            {/* <LocalizationProvider/> */}
            <input type="date" name="order" id="order" />
        </div>
    </section>
}