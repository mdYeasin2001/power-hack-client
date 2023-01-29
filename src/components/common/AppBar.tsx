import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
const AppBar = () => {
    return (
        <Navbar bg="light" variant="light">
            <Container>
                <NavLink to="/" className="navbar-brand">Hack</NavLink>
                <Nav className="ms-auto">
                    <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Login
                    </NavLink>
                    <NavLink to="/registration" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Registration
                    </NavLink>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default AppBar;