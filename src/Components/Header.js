import { Container, Nav, Navbar } from "react-bootstrap"
import Logo from "../images/ski-logo-no-text.png"
import "../Styles/Header.css"

export default function Header(props) {
    return (
        <Navbar bg="light" expand="md">
            <Container>
                <Navbar.Brand><img src={Logo} alt="You Ski Logo" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="me-auto">
                        <Nav.Link href="/" style={props.active === 0 ? {color: 'black', borderColor: 'black'} : {color: undefined}}>Home</Nav.Link>
                        <Nav.Link href="/about" style={props.active === 1 ? {color: 'black', borderColor: 'black'} : {color: undefined}}>About me</Nav.Link>
                        <Nav.Link href="/contact" style={props.active === 2 ? {color: 'black', borderColor: 'black'} : {color: undefined}}>Contact</Nav.Link>
                        <Nav.Link href="/rooms" style={props.active === 3 ? {color: 'black', borderColor: 'black'} : {color: undefined}}>Resorts</Nav.Link>
                        <Nav.Link href="/account" style={props.active === 4 ? {color: 'black', borderColor: 'black'} : {color: undefined}}>{sessionStorage.getItem('user') === null ? "Log in" : "Account" }</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}