import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    name: '',
    date: '',
    starredButton: false,
  }

  onNameEnter = event => {
    this.setState({name: event.target.value})
  }

  onDateEnter = event => {
    this.setState({
      date: format(new Date(event.target.value), 'dd MMMM yyyy, EEEE'),
    })
  }

  createAppointmentItem = event => {
    event.preventDefault()

    const {name, date} = this.state

    const newAppointmentItem = {
      id: uuidv4(),
      name,
      date,
      isStarred: false,
    }

    this.setState(previousState => ({
      appointmentList: [...previousState.appointmentList, newAppointmentItem],
      name: '',
      date: '',
    }))
  }

  changeFaviourateStatus = id => {
    this.setState(previousState => ({
      appointmentList: previousState.appointmentList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  onStarredLit = () => {
    this.setState(previousState => ({
      appointmentList: previousState.appointmentList.filter(
        eachItem => eachItem.isStarred === true,
      ),
      starredButton: !previousState.starredButton,
    }))
  }

  render() {
    const {appointmentList, starredButton, name, date} = this.state

    const color = starredButton ? 'starredButton' : ''
    const element = (
      <div className="bg-container">
        <div className="appointments">
          <div className="heading-container">
            <h1 className="heading">Add Appointment</h1>
          </div>
          <div className="appointments-parent-container">
            <form
              className="appointment-form-container"
              onSubmit={this.createAppointmentItem}
            >
              <label htmlFor="name" className="label">
                TITLE
              </label>
              <input
                id="name"
                type="text"
                className="title-input"
                placeholder="Title"
                onChange={this.onNameEnter}
                value={name}
              />
              <label htmlFor="date" className="label">
                DATE
              </label>
              <input
                id="date"
                type="date"
                className="title-input"
                onChange={this.onDateEnter}
                placeholder="dd/mm/yyyy"
                value={date}
              />
              <button className="add-button" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="appointment-image"
              alt="appointments"
            />
          </div>
          <hr className="seaprating-line" />
          <div className="title-container">
            <h1 className="appiontment">Appointments</h1>
            <button
              className={`starred-button ${color}`}
              type="button"
              onClick={this.onStarredLit}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-items-container">
            {appointmentList.map(eachItem => (
              <AppointmentItem
                details={eachItem}
                key={eachItem.id}
                starredStatusChange={this.changeFaviourateStatus}
              />
            ))}
          </ul>
        </div>
      </div>
    )
    return element
  }
}

export default Appointments
