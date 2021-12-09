import { Link } from "react-router-dom";

import "../styles/navbar.scss";
import "../styles/formLogin.scss";

import {
    Collapse,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarText,
    NavbarToggler,
    NavItem,
    NavLink,
} from "reactstrap";
import logoImg from "../assets/images/logo.png";
import { useAuth } from "../contexts/AuthContext";

export function NavBar() {
    const { user, signOut } = useAuth();

    return (
        <div>
            <Navbar color="light" expand="md" light>
                <NavbarBrand href="/"></NavbarBrand>
                <NavbarToggler onClick={function noRefCheck() {}} />
                <Collapse navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink>
                                <Link to="/">Manchetes</Link>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink>
                                <Link to="/vestibulares">Vestibulares</Link>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink>
                                <Link to="/editais">Editais</Link>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink>
                                <Link to="/eventos">Eventos</Link>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink>
                                <Link to="/estagios">Estágios</Link>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink>
                                <Link to="/editoriais">Editoriais</Link>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink>
                                <Link to="/cooperacao">Cooperação</Link>
                            </NavLink>
                        </NavItem>
                    </Nav>
                    {user &&
                        user.tipo_usuario &&
                        user.tipo_usuario.nome === "admin" && (
                            <NavbarText>
                                <Link to="/area-admin">Area do Admin</Link>
                            </NavbarText>
                        )}

                    {user &&
                        user.tipo_usuario &&
                        user.tipo_usuario.nome === "editor" && (
                            <NavbarText>
                                <Link to="/area-editor">Area do Editor</Link>
                            </NavbarText>
                        )}

                    {user ? (
                        <>
                            <NavbarText>Bem vindo, {user.nome}</NavbarText>
                            <svg
                                onClick={signOut}
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-power"
                                viewBox="0 0 16 16"
                            >
                                <path d="M7.5 1v7h1V1h-1z" />
                                <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
                            </svg>
                        </>
                    ) : (
                        <NavbarText>
                            <Link to="/login">Login</Link>
                        </NavbarText>
                    )}
                </Collapse>
            </Navbar>
            <div className="logo2">
                <img src={logoImg} alt="logo" />
            </div>
        </div>
    );
}
