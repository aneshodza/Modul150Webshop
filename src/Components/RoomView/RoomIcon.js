export default function RoomIcon(props) {
    return (
        <div className="room-icon">
            <div className="room-icon-header">
                <h2>{props.room.name}</h2>
            </div>
            <div className="room-icon-description">
                <p>{props.room.description.length > 80 ? props.room.description.substring(0, 80) + '...' : props.room.description}</p>
            </div>
        </div>
    )
}