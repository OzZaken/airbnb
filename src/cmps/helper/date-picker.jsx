import React, { Component } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';

class StayDatesPicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      focusedInput: null,
    };
  }

  handleDatesChange = (startDate, endDate) => {
    // if (startDate?._d) this.props.setOrder({ ...this.props.order, startDate: startDate._d })
    // if (endDate?._d) this.props.setOrder({ ...this.props.order, endDate: endDate._d })
  }


  render() {
    return (
      <DateRangePicker
        startDateId="startDate"
        endDateId="endDate"
        startDate={this.props.startDate}
        endDate={this.props.endDate}
        // onDatesChange={({ startDate, endDate }) => this.handleDatesChange(startDate, endDate)}

        // onDatesChange={({ startDate, endDate }) => { this.props.setOrder({ ...this.props.order, startDate: startDate, endDate: endDate }) }}
        focusedInput={this.state.focusedInput}
        onFocusChange={(focusedInput) => { this.setState({ focusedInput }) }}
      />
    )
  }
}

export default StayDatesPicker