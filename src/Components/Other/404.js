import Header from "../Header";

export default function NotFound() {
    return (
        <div style={{overflowY: 'hidden'}}>
            <Header/>
            <h1 style={{position: 'absolute', top: '50vh', left: '50vw', transform: 'translate(-50%, -50%)'}}>Could not find what you where looking for!</h1>
        </div>
    )
}