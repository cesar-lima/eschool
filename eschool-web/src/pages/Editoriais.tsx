import { useEffect, useState } from 'react';
import { CardGroup } from 'reactstrap';
import { CardEditorial } from '../components/CardEditorial';
import { FooterComponent } from '../components/Footer'
import { NavBar } from '../components/NavBar';
import api from '../services/api';

interface News{
    id: string;
    titulo: string;
    subtitulo: string;
    imagem: string;
}

export function Editoriais() {

    const [noticias, setNoticia] = useState<News[]>([]);

    useEffect(() => {
        api.get<{data: News[]}>('api/news/category/editoriais', {})
        .then(response => {
            setNoticia(response.data.data);
        })
    }, [])

    console.log(noticias);
    return (
        <div>
            <NavBar />
            <CardGroup >
                {noticias.map(noticia => (
                    <CardEditorial key={noticia.id} data={noticia} />
                ))}
            </CardGroup> 
            <FooterComponent/>
        </div>
    );
}