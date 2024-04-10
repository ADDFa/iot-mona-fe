import { Container } from "react-bootstrap"
import NavbarEl from "react-bootstrap/Navbar"

const Navbar = () => {
    return (
        <NavbarEl expand="lg" className="bg-body-teritary shadow-sm">
            <Container>
                <NavbarEl.Brand>Perhitungan Jumlah Telur</NavbarEl.Brand>
                <NavbarEl.Toggle aria-controls="nav-list" />

                {/* <NavbarEl.Collapse id="nav-list">
                    <Nav className="me-auto">

                    </Nav>
                </NavbarEl.Collapse> */}
            </Container>
        </NavbarEl>
    )
}

export default Navbar
