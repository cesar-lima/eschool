import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/card.scss";
import { Link } from "react-router-dom";

import { NavBar } from "../components/NavBar";
import { FooterComponent } from "../components/Footer";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Button, Table } from "reactstrap";
import { useCallback, useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";

interface News {
    id: number;
    titulo: string;
    subtitulo: string;
    texto: string;
    data_criacao: Date;
    data_atualizacao: Date;
    imagem: string;
    rascunho: boolean;
    categoria: Categoria;
    id_categoria: number;
    id_usuario_editor: number;
}

interface Categoria {
    id: number;
    nome_categoria: string;
}

interface NewsReturn {
    data: News[];
}

export function AreaEditor() {
    const { token } = useAuth();
    const [news, setNews] = useState<News[]>([]);

    useEffect(() => {
        api.get<NewsReturn>(`api/edit/news`, {
            headers: { Authorization: `Bearer ${token}` },
        }).then((response) => {
            const newsFormated = response.data.data;
            setNews(newsFormated);
        });
    }, [token]);

    const publishNews = useCallback((newsId: number) => {
        api.put(
            `api/news/${newsId}/publish`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        ).then(() => {
            setNews((news) => (news.map((n) => (n.id === Number(newsId) ? { ...n, rascunho: false } : n))));
        });
    }, [token]);

    return (
        <div>
            <NavBar />
            <header className="d-flex justify-content-between p-5">
                <h1>Minhas noticias</h1>
                <Link
                    className="btn btn-primary d-flex align-items-center"
                    to="/nova-noticia"
                >
                    Nova Noticia
                </Link>
            </header>
            <Table striped className="px-5">
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Subtitulo</th>
                        <th>Categoria</th>
                        <th>Data de Criação</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {news.map((news) => (
                        <tr key={news.id}>
                            <td>{news.titulo.substring(0, 40)}</td>
                            <td>{news.subtitulo.substring(0, 60)}</td>
                            <td>{news.categoria.nome_categoria}</td>
                            <td>
                                {news.data_criacao.toString().substring(0, 10)}
                            </td>
                            <td>
                                {news.rascunho ? (
                                    <Button color="primary" size="sm" onClick={() => publishNews(news.id)}>Publicar</Button>
                                ) : (
                                    <Button color="primary" size="sm" disabled>
                                        Publicado
                                    </Button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <FooterComponent />
        </div>
    );
}
