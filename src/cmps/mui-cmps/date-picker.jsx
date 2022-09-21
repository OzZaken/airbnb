import { LocalizationProvider } from '@mui/x-date-pickers';

export const DatePicker = ({ AdapterDayjs }) => {
  if (!AdapterDayjs) return
  console.log('AdapterDayjs:', AdapterDayjs)
  return <LocalizationProvider dateAdapter={AdapterDayjs}>
   
  </LocalizationProvider>
}