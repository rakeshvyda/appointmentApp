import './index.css'

const AppointmentItem = props => {
  const {details, starredStatusChange} = props
  const {id, name, date, isStarred} = details

  const changeStarredStatus = () => {
    starredStatusChange(id)
  }
  const favoriateImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const element = (
    <li className="appointment-item">
      <div className="title-starred-container">
        <p className="title">{name}</p>
        <button
          className="button"
          type="button"
          onClick={changeStarredStatus}
          data-testid="star"
        >
          <img src={favoriateImgUrl} className="favoriate-image" alt="star" />
        </button>
      </div>
      <p className="date">{date}</p>
    </li>
  )
  return element
}

export default AppointmentItem
