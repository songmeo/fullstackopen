const Notification = ({ message, isError }) => {

    const notificationStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
      }

    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    if(message !== null && !isError) {
        return (
            <div style={notificationStyle}>
                {message}
            </div>
        )
    }
    else if(message !== null) {
        return (
            <div style={errorStyle}>
                {message}
            </div>
        )
    }

    return (
        <div></div>
    )
}

export default Notification
