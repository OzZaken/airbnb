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
            <span>
                {`$ ${stay.price} night`}
                <StayRate reviews={stay.reviews} />
            </span>
        </div>
    </section>
}