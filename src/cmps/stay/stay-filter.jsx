// import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useFormRegister } from '../../hooks/useFormRegister'
import { useRef } from 'react'
export const StayFilter = (props) => {
  const [register] = useFormRegister(
    {
      name: '',
      minPrice: 0,
    },
    props.onChangeFilter
  )

  return (
    <form className="stay-filter">

      <label htmlFor="checkIn">
        <input placeholder='date'
          {...register('date', 'date')} />
      </label>
      <label htmlFor="checkOut">
        <input placeholder='date'
          {...register('date', 'date')} />
      </label>



      {/*//* Later on filter btn */}
      {/* <label htmlFor="name">
        <input placeholder='Stay name'
          {...register('name', 'text')} />
      </label> */}

      {/* <label htmlFor="minPrice">
        Min Price
        <input placeholder='Price'
          {...register('minPrice', 'number')} />
      </label> */}

    </form>
  )
}

// https://www.youtube.com/watch?v=WT827YsMJCc