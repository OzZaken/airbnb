import React from 'react'
import { eventBusService } from '../../services/event-bus.service'

export class UserMsg extends React.Component {
  unsubscribe

  state = {
    msg: null,
  }

  // listen to the event emitted
  componentDidMount() {
      console.log('userMsg Mount msg:', this.props.msg)
      this.unsubscribe = eventBusService.on('show-user-msg', (msg, duration = 2500) => {
      this.setState({ msg })
      setTimeout(() => { this.setState({ msg: null }) }, duration)
    })
  }

  // important to remove the listener 
  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    if (!this.state.msg) return <span></span>
    const msgClass = this.state.msg.type || ''
    return (
      <section className={'user-msg ' + msgClass}>
        <button onClick={() => {
          this.setState({ msg: null })
        }}>x</button>
        {this.state.msg.txt}
      </section>
    )
  }
}