import { Collapse, Nav, Navbar, NavbarToggler, NavItem, NavLink } from "reactstrap";

export function Toggler() {
    return (
        <div>
            <Navbar
                color="faded"
                light
            >
                <NavbarToggler
                    className="me-2"
                    onClick={function noRefCheck() { }}
                />
                <Collapse navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink href="/components/">
                                Components
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://github.com/reactstrap/reactstrap">
                                GitHub
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}