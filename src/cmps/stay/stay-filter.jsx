import { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'react-router-dom';
// Services
import { stayService } from '../../services/stay.service.local'
// hooks
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { useFormRegister } from '../../hooks/useFormRegister'
// CMPS
import AppIcon from '../app-icon'
// import AliceCarousel from 'react-alice-carousel'

export const StayFilter = (props) => {
  // Search for filter in url params
  const [searchParams, setSearchParams] = useSearchParams()
  const [filterBy] = useFormRegister(
    {
      name: '',
      minPrice: Infinity,
      maxPrice: -Infinity,
    },
  )

  const renderFilterByQueryStringParams = () => {
    const queryStringParams = new URLSearchParams(window.location.search)
    const filterBy = {
      name: queryStringParams.get('name') || filterBy.name,
      maxPrice: queryStringParams.get('maxPrice') || filterBy.maxPrice,
      minRate: queryStringParams.get('minRate') || filterBy.minPrice,
    }
    if (
      !filterBy.maxPrice &&
      !filterBy.minRate &&
      !filterBy.name)
      return
    onSetFilterBy(filterBy)
  }
  const onSetFilterBy = (filterBy) => {
    const queryStringParams = `?max-price=${filterBy.maxPrice}&minn-rate=${filterBy.minRate}&stay-name=${filterBy.stayName}`
    const newUrl =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname +
      queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
  }
// Filter Modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalContainer = useRef()
  const toggleIsModalOpen = (ev) => {
    // TODO: ↓ Clicking on stay not move page 
    ev.stopPropagation()
    ev.preventDefault()
    document.body.classList.toggle('modal-open')
    setIsModalOpen(!isModalOpen)
  }
  useOnClickOutside(modalContainer, () => setIsModalOpen(false))

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

  // AliceCarousel for filterBys
  // useEffect(() => {
  //   console.log('props', props)
  //   setFilter(prevFilter => ({
  //     ...prevFilter,
  //     filterBy
  //   }))
  // }, [props])
  // const responsive = {
  //   0: { items: 1 },
  //   568: { items: 2 },
  //   1024: { items: 10 }
  // }
  // const renderNextBtn = ({ isDisabled }) => {
  //   return (
  //     <button
  //       className={`btn-next ${isDisabled ? 'disabled' : ''}`}>
  //       <AppIcon iconKey="nextBtn" />
  //     </button >
  //   )
  // }
  // const renderPrevBtn = ({ isDisabled }) => {
  //   return (
  //     <button
  //       className={`btn-prev ${isDisabled ? 'disabled' : ''}`}>
  //       <AppIcon iconKey="prevBtn" />
  //     </button >
  //   )
  // }

  return <section className="flex filter-bar">

    <button><AppIcon iconKey='prevBtn' /></button>
    <div className='filter-list-container'>
      {elStayFilterBys()}
      <button><AppIcon iconKey='nextBtn' /></button>

      <div className="filter-btn-container">
        <button className="flex btn-big"
          ref={modalContainer}
          onClick={toggleIsModalOpen}>
          <AppIcon iconKey='filterBy' /> filter
        </button>

       {isModalOpen &&
          <div className="filter-modal-container">
            <h3> filters</h3>
            <hr />
            <h2>Price range</h2>
            <p>The average nightly price is <span>getAvgNight</span></p>
          </div>
        }

      </div>
    </div>
  </section>
}

//* Alice Carousel for filters
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
