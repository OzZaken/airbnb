import { useFormRegister } from '../../hooks/useFormRegister'
import AppIcon from '../app-icon'

export const StayOrder = ({ stay, avgRate, reviewsCount }) => {
  const { price } = stay

  const [register] = useFormRegister({
    checkIn: new Date(Date.now()),
    checkOut: '',
    guests: '',
    stayId: stay.id,
  },)

  const BtnRadialGradient = () => {
    const btnColumns = []
    for (let i = 0; i < 100; i++) {
      btnColumns.push(<div key={i} className="cell"></div>)
    }
    return <div className="btn-container">
      {btnColumns}
      <div className="content">
        <button className="action-btn">
          <span>reserve</span>
        </button>
      </div>
    </div>
  }

  return <form>
    <section className="order-container">
      <div className="order-form-header">
        <p><span className="cost"> {'$'}{price}</span> / night</p>
        <p>{avgRate || 4.75}<span className="reviews">({reviewsCount} reviews)</span></p>
      </div>

      <div className="order-data">

        <div className="date-picker">
          <div className="date-input">
            <label htmlFor="check-in">CHECK IN</label>
            <input  {...register('check-in', 'date')} />

          </div>

          <div className="date-input">
            <label htmlFor="check-out">CHECK OUT</label>
            <input  {...register('check-out', 'date')} />
          </div>
        </div>

        <div className="guest-input">
          <label htmlFor="guests">GUESTS</label>
          <input value="2" {...register('guests', 'number')} />
          <AppIcon iconKey="AngleDown" />
        </div>

      </div>
      <BtnRadialGradient />
      <p>You won't be charged yet</p>

    </section>

    <p className="footer">iconFlag Report this listing</p>
  </form>
}