import { Container, Nav, Navbar } from "react-bootstrap"

export default function NavBar(props) {
    return (
        <Navbar bg="light" expand="sm">
            <Container>
                <Navbar.Brand>RentARoom</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" >
                    <Nav className="me-auto">
                        <Nav.Link href="/" style={props.active === 0 ? {color: 'black'} : {color: undefined}}>Home</Nav.Link>
                        <Nav.Link href="/about" style={props.active === 1 ? {color: 'black'} : {color: undefined}}>About</Nav.Link>
                        <Nav.Link href="/contact" style={props.active === 2 ? {color: 'black'} : {color: undefined}}>Contact</Nav.Link>
                        <Nav.Link href="/rooms" style={props.active === 3 ? {color: 'black'} : {color: undefined}}>Rooms</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}