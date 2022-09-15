import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { stayService } from '../services/stay.service'

export const StayDetails = () => {
  const [stay, setStay] = useState(null)
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    loadStay()
  }, [params.id])

  const loadStay = () => {
    const stayId = params.id
    stayService.getById(stayId).then((stay) => {
      setStay(stay)
    })
  }

  const onBack = () => {
    navigate('/stay')
  }

  if (!stay) return <div>Loading...</div>
  return (
    <div className="stay-details">
      <section>
        <h3>Name: {stay.name}</h3>
      </section>
      <section>
        <h3>Price: {stay.price}</h3>
      </section>
      <section>
        <h3>
          Labels:
          <ul>
            {stay.labels &&
              stay.labels.map((label) => <li key={label}>{label}</li>)}
          </ul>
        </h3>
      </section>
    </div>
  )
}
