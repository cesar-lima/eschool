import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/card.scss";
import { Link } from "react-router-dom";

import { NavBar } from "../components/NavBar";
import { FooterComponent } from "../components/Footer";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Button, ButtonGroup, Table } from "reactstrap";
import { useCallback, useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";

export interface TipoUsuario {
    id: number;
    nome: string;
}

export interface User {
    id: number;
    nome: string;
    sobrenome: string;
    celular: string;
    email: string;
    id_tipo_usuario: number;
    tipo_usuario: TipoUsuario;
}

export interface UsersReturn {
    data: User[];
}

export function AreaAdmin() {
    const { token } = useAuth();
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        api.get<UsersReturn>(`api/users`, {
            headers: { Authorization: `Bearer ${token}` },
        }).then((response) => {
            const users = response.data.data;
            setUsers(users);
        });
    }, [token]);

    const changeRole = useCallback(
        (userId: number, role: string, roleId: number) => {
            api.put(
                `api/users/${userId}/${role}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            ).then(() => {
                setUsers((users) =>
                    users.map((n) =>
                        n.id === Number(userId)
                            ? {
                                  ...n,
                                  id_tipo_usuario: roleId,
                                  tipo_usuario: {
                                      ...n.tipo_usuario,
                                      id: roleId,
                                      nome: role,
                                  },
                              }
                            : n
                    )
                );
            });
            console.log(userId, roleId);
        },
        [token]
    );

    return (
        <div>
            <NavBar />
            <header className="d-flex justify-content-between p-5">
                <h1>Usuarios Cadastrados</h1>
            </header>
            <Table striped className="px-5">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>Email</th>
                        <th>Celular</th>
                        <th>Função</th>
                        <th>Aplicar Função</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.nome}</td>
                            <td>{user.sobrenome.substring(0, 60)}</td>
                            <td>{user.email}</td>
                            <td>{user.celular}</td>
                            <td>{user.tipo_usuario.nome}</td>
                            <td>
                                <ButtonGroup>
                                    {user.id_tipo_usuario !== 1 && (
                                        <Button
                                            size="sm"
                                            onClick={() =>
                                                changeRole(user.id, "admin", 1)
                                            }
                                        >
                                            Admin
                                        </Button>
                                    )}
                                    {user.id_tipo_usuario !== 2 && (
                                        <Button
                                            size="sm"
                                            onClick={() =>
                                                changeRole(user.id, "editor", 2)
                                            }
                                        >
                                            Editor
                                        </Button>
                                    )}
                                    {user.id_tipo_usuario !== 3 && (
                                        <Button
                                            size="sm"
                                            onClick={() =>
                                                changeRole(
                                                    user.id,
                                                    "visitante",
                                                    3
                                                )
                                            }
                                        >
                                            Visitante
                                        </Button>
                                    )}
                                </ButtonGroup>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <FooterComponent />
        </div>
    );
}
