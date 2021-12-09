import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/card.scss'

import { CardGroup } from 'reactstrap';
import { CarouselComponent } from '../components/Carousel';
import { NavBar } from '../components/NavBar';
import { CardComponent } from '../components/Card';
import { FooterComponent } from '../components/Footer';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import api from '../services/api';
import { useEffect, useState } from 'react';

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
    id: string;
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

export function Manchetes() {
    const [noticias, setNoticia] = useState<News[]>([]);

    useEffect(() => {
        api.get<{data: News[]}>('api/news', {})
        .then(response => {
            setNoticia(response.data.data);
        })
    }, [])

    return (
        <div>
            <NavBar />
            <CarouselComponent data={noticias}/>
            <CardGroup >
                {noticias.map(noticia => (
                    <CardComponent key={noticia.id} data={noticia} />
                ))}
            </CardGroup> 
            <FooterComponent/>
        </div>
    );
}