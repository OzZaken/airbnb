import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
// Services
import { stayService } from '../../services/stay.service.local'
// CMPS
import AppIcon from '../app-icon'
import { useFormRegister } from '../../hooks/useFormRegister'
import AliceCarousel from 'react-alice-carousel'

export const StayFilter = (props) => {
  const [register] = useFormRegister(
    {
      name: '',
      minPrice: 0,
    },
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const [searchParams, setSearchParams] = useSearchParams()
  const onSetFilterBy = (filterBy) => setSearchParams({
     filterBy 
    })

  const elStayFilterBys = () => {
    const filters = stayService.getFilterBys()
    const elFilters = []
    for (const filterBy in filters) {
      const currFilter = filters[filterBy]
      elFilters.push(
        <button className="flex center column btn-filter-by"
          key={Object.keys(currFilter)}
          onClick={() => {
            onSetFilterBy(
              String(Object.values(currFilter))
                .replace(/[^a-zA-Z ]/g, '')
                .split(' ')
                .join('-')
                // TODO: ↓ replace with regex
                .toLowerCase()
            )
          }}
        >
          <AppIcon iconKey={Object.keys(currFilter)} />
          <p className='flex txt-filter-by'>
            {Object.values(currFilter)}
          </p>
        </button >
      )
    }
    return elFilters
  }

  // AliceCarousel
  useEffect(() => {
    console.log('props', props)
  }, [props])
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 10 }
  }
  const renderNextBtn = ({ isDisabled }) => {
    return (
      <button
        className={`btn-next ${isDisabled ? 'disabled' : ''}`}>
        <AppIcon iconKey="nextBtn" />
      </button >
    )
  }
  const renderPrevBtn = ({ isDisabled }) => {
    return (
      <button
        className={`btn-prev ${isDisabled ? 'disabled' : ''}`}>
        <AppIcon iconKey="prevBtn" />
      </button >
    )
  }

return <section className="flex filter-bar">

<button><AppIcon iconKey='prevBtn'/></button>
<div className='filter-list-container'>
  {elStayFilterBys()}
<button><AppIcon iconKey='nextBtn' /></button>

<div className="filter-btn-container">
  <button className="flex btn-big"
    onClick={() => { setIsModalOpen(true) }}>
    <AppIcon iconKey='filterBy' /> filter
  </button>
</div>
</div>
</section>
}



// return <section className="flex filter-bar">

// <AliceCarousel
//   responsive={responsive}
//   className="filter-list-container"
//   disableDotsControls
//   controlsStrategy='responsive'
//   items={elStayFilterBys()}
//   renderPrevButton={renderPrevBtn}
//   renderNextButton={renderNextBtn}
// />


// <div className="filter-btn-container">
//   <button className="flex btn-big"
//     onClick={() => { setIsModalOpen(true) }}>
//     <AppIcon iconKey='filterBy' /> filter
//   </button>
// </div>
// </section >
