import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Comentarios } from "../components/Comentarios";
import { FooterComponent } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import api from "../services/api";
import '../styles/noticia.scss'

export interface Categoria {
    id: number;
    nome_categoria: string;
}

export interface Editor {
    nome: string;
    sobrenome: string;
    email: string;
}

export interface Visitante {
    nome: string;
    sobrenome: string;
    email: string;
}

export interface Comentario {
    texto: string;
    data_criacao: Date;
    visitante: Visitante;
}

export interface News {
    id: number;
    titulo: string;
    subtitulo: string;
    texto: string;
    data_criacao: Date;
    data_atualizacao: Date;
    ativo: boolean;
    imagem: string;
    rascunho: boolean;
    id_categoria: number;
    id_usuario_editor: number;
    categoria: Categoria;
    editor?: Editor;
    comentarios?: Comentario[];
}

export interface NewsReturn {
    data: News;
}

export function Noticia() {
    const { id } = useParams();
    const [news, setNews] = useState<News>();

    useEffect(()=> {
        api.get<NewsReturn>(`api/news/${id}`)
        .then((response) => {
            setNews(response.data.data);
        });
    },[id])

    console.log(news);

    return (
        <div>
            <NavBar />
            <h1 className="tituloNoticia">
                {news?.titulo}
            </h1>

            <div className="imagemDentroNoticia">
                <img src={news?.imagem} alt="imagem da noticia" />
            </div>

            <h4 className="subtituloNoticia">
                {news?.subtitulo}
            </h4>

            <article className="conteudo">
                <div className="dataEditor">
                    <div>
                        <span>{news?.data_criacao.toString().substring(0, 10)}</span>
                    </div>
                    <div>
                        <span><strong>Escrito por:</strong> {news?.editor && news?.editor.nome}</span>
                    </div>
                </div>

                <div className="texto" dangerouslySetInnerHTML={{__html: news?.texto || ''}}></div>
            </article>

            {/* <Comentarios/> */}

            <FooterComponent/>

        </div>
    );
}