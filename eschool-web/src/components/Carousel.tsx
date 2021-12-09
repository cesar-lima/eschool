import { useState } from "react";
import "../styles/carousel.scss";

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

export function CarouselComponent({ data }: { data: News[] }) {
    const [itemSelected, setItemSelected] = useState<number>(1);

    function nextCarouselItem() {
        if (itemSelected < 3) {
            setItemSelected(itemSelected + 1);
        } else {
            setItemSelected(1);
        }
    }

    function prevCarouselItem() {
        if (itemSelected > 1) {
            setItemSelected(itemSelected - 1);
        } else {
            setItemSelected(3);
        }
    }

    return (
        <div
            id="carouselExampleCaptions"
            className="carousel slide"
            data-bs-ride="carousel"
        >
            <div className="carousel-indicators">
                <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                ></button>
                <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                ></button>
                <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                ></button>
            </div>
            <div className="carousel-inner bg-black">
                <div
                    className={`carousel-item ${
                        itemSelected === 1 ? "active" : ""
                    }`}
                >
                    <img
                        src={data[0]?.imagem || ""}
                        className="d-block w-50 mx-auto mx-auto"
                        alt="..."
                    />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>{data[0]?.titulo || ""}</h5>
                        <p>{data[0]?.subtitulo || ""}</p>
                    </div>
                </div>
                <div
                    className={`carousel-item ${
                        itemSelected === 2 ? "active" : ""
                    }`}
                >
                    <img
                        src={data[1]?.imagem || ""}
                        className="d-block w-50 mx-auto"
                        alt="..."
                    />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>{data[1]?.titulo  || ""}</h5>
                        <p>{data[1]?.subtitulo || ""}</p>
                    </div>
                </div>
                <div
                    className={`carousel-item ${
                        itemSelected === 3 ? "active" : ""
                    }`}
                >
                    <img
                        src={data[2]?.imagem || ""}
                        className="d-block w-50 mx-auto"
                        alt="..."
                    />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>{data[2]?.titulo || ""}</h5>
                        <p>{data[2]?.subtitulo || ""}</p>
                    </div>
                </div>
                <div
                    className={`carousel-item ${
                        itemSelected === 4 ? "active" : ""
                    }`}
                >
                    <img
                        src={data[3]?.imagem || ""}
                        className="d-block w-50 mx-auto"
                        alt="..."
                    />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>{data[3]?.titulo || ""}</h5>
                        <p>{data[3]?.subtitulo || ""}</p>
                    </div>
                </div>
            </div>
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev"
                onClick={prevCarouselItem}
            >
                <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                ></span>
                <span className="visually-hidden">Anterior</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next"
                onClick={nextCarouselItem}
            >
                <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                ></span>
                <span className="visually-hidden">Proximo</span>
            </button>
        </div>
    );
}
