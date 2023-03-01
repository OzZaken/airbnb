import { useSelector } from 'react-redux'
import { useFormRegister } from '../../hooks/useFormRegister'
import AppIcon from '../app-icon'

export const StayOrder = ({ stay, avgRate, reviewsCount }) => {
  const { checkIn, checkOut, guests  } = useSelector(state => state.orderModule.order)
  const [register] = useFormRegister({
    checkIn,
    checkOut,
    guests,
    stayId: stay._id,
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

  const { price } = stay
  return <form className="order-container">
    <header className="order-form-header">
      {/* Price */}
      <p>
        <span className="cost">
          {'$'}{price}
        </span> / night
      </p>
      {/* avg rate */}
      <p>
        {avgRate || 4.75}
        <span className="reviews">
          ({reviewsCount} reviews)
        </span>
      </p>
    </header>

    <main className="order-data">
      <div className="date-picker">
        <div className="date-input">
          <label htmlFor="check-in">CHECK IN</label>
          <input name="check-in" {...register('check-in', 'date')} />
        </div>

        <div className="date-input">
          <label htmlFor="check-out">CHECK OUT</label>
          <input name="check-out"  {...register('check-out', 'date')} />
        </div>
      </div>

      <div className="guest-input">
        <label htmlFor="guests">GUESTS</label>
        <input name="guests" {...register('guests', 'number')} />
        <AppIcon iconKey="AngleDown" />
      </div>
    </main>

    <BtnRadialGradient />

    <p className='txt-center'>You won't be charged yet</p>

    <footer className="order-footer tag-txt">
      <AppIcon iconKey="flag" className="fs-small" />
      Report this listing
    </footer>
  </form>
}