// import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useFormRegister } from '../../hooks/useFormRegister'

export const StayFilter = (props) => {
  const [register] = useFormRegister(
    {
      name: '',
      minPrice: 0,
      inStock: '',
    },
    props.onChangeFilter
  )

  return (
    <form className="stay-filter">
      <section>
        <label htmlFor="name">Name</label>
        <input {...register('name', 'text')} />
      </section>
      <section>
        <label htmlFor="minPrice">Min Price</label>
        <input {...register('minPrice', 'number')} />
      </section>
    </form>
  )
}