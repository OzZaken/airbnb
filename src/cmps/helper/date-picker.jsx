//* //  ///   /////      MUI     \\\\\    \\\  *\\
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'

export const DatePicker = ({ AdapterDayjs }) => {
  if (!AdapterDayjs) return
  console.log('AdapterDayjs:', AdapterDayjs)
  return <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DateTimePicker
      renderInput={(props) => <TextField {...props} />}
      label="DateTimePicker"
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
      }}
    />
  </LocalizationProvider>
}

//* //  ///   /////      react      \\\\\    \\\  *\\
// https://github.com/gpbl/react-day-picker
//   import React from 'react';

// import { format } from 'date-fns';
// import { DayPicker } from 'react-day-picker'
// import 'react-day-picker/dist/style.css';

// export default function Example() {
//   const [selected, setSelected] = React.useState<Date>()

//   let footer = <p>Please pick a day.</p>
//   if (selected) {
//     footer = <p>You picked {format(selected, 'PP')}.</p>
//   }
//   return (
//     <DayPicker
//       mode="single"
//       selected={selected}
//       onSelect={setSelected}
//       footer={footer}
//     />
//   );
// }

//* //  ///   /////    reactDateRangePicker       \\\\\    \\\  *\\
//* https://blog.logrocket.com/top-react-date-pickers-for-2021/
// import React, { useState } from "react"
// import "react-dates/initialize"
// import "react-dates/lib/css/_datepicker.css"
// import { SingleDatePicker } from "react-dates"

// export default function ReactdatesDatepicker() {
//   const [date, setDate] = useState(null)
//   const [isFocused, setIsFocused] = useState(false)

//   function onDateChange(date) {
//     setDate(date);
//   }

//   function onFocusChange({ focused }) {
//     setIsFocused(focused)
//   }

//   return (
//     <SingleDatePicker
//       id="date_input"
//       date={date}
//       focused={isFocused}
//       onDateChange={onDateChange}
//       onFocusChange={onFocusChange}
//     />
//   )
// }