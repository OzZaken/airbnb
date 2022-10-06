import { useState } from 'react'
import { useSearchParams } from 'react-router-dom';
// import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
// Services
import { stayService } from '../../services/stay.service.local'
// CMPS
import AppIcon from '../app-icon'
import { useFormRegister } from '../../hooks/useFormRegister'



export const StayFilter = (props) => {
  const [register] = useFormRegister(
    {
      name: '',
      minPrice: 0,
    },
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const onSetFilterBy = (filterBy) => setSearchParams({ filterBy })
  const getStayFilterBy = () => {
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
                // Todo: ↓ replace with regex
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


  return <div className="flex main-layout filter-bar">

    <div className="flex">
      <button><AppIcon iconKey='prevBtn' /></button>
      <div className='filter-list-container'>
        {getStayFilterBy()}
      </div>
      <button><AppIcon iconKey='nextBtn' /></button>

      <div className="filter-btn-container">
        <button className="flex btn-big"
          onClick={() => { setIsModalOpen(true) }}>
          <AppIcon iconKey='filterBy' /> filter
        </button>

      </div>
    </div>
  </div>
}