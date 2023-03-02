import React from 'react'
import { eventBusService } from '../services/event-bus.service'

export class UserMsg extends React.Component {

  removeEvent

  state = {
    msg: null
  }

  componentDidMount() {
    console.log('userMsg Mount:',this.state.txt)
    // Here we listen to the event that we emitted, its important to remove the listener 
    this.removeEvent = eventBusService.on('show-user-msg', (msg, duration = 2500) => {
      this.setState({ msg })
      setTimeout(() => { this.setState({ msg: null }) }, duration)
    })
  }

  componentWillUnmount() {
    this.removeEvent()
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
