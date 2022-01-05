import { Spinner } from "react-bootstrap"
import "../../Styles/Loading.css"

export default function Loading(props) {
    return (
        <Spinner animation="border" role="status" style={{height: props.size, width: props.size, border: `${1 * props.size / 200}em solid black`}}>
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )
}