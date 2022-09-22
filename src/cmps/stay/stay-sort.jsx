// import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useFormRegister } from '../../hooks/useFormRegister'

export const StaySort = (props) => {
  const [register] = useFormRegister(
    {
      sortBy: '',
    },
    props.onChangeSort
  )

  return (
    <section className="stay-sort">
      <FormControl sx={{ minWidth: 100 }}>
        <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          {...register('sortBy')}
        >
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="price">Price</MenuItem>
        </Select>
      </FormControl>
    </section>
  )
}