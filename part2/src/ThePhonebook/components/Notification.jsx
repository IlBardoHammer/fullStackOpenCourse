const Notification = ({ message, type }) => {
  if ( message === null ) {
    return null
  }

  return (
    <div className={ type === 201 ? 'success' : 'error'}>
      { message }
    </div>
  )
}

export default Notification;