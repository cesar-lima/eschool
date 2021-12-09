import { Link } from "react-router-dom";
import { CardBody, CardImg, CardSubtitle, CardTitle, Card, Col } from "reactstrap";
import '../styles/cardEditorial.scss';

interface News {
    id: string;
    titulo: string;
    subtitulo: string;
    imagem: string;
}

export function CardEditorial({ data }: { data: News }) {
    return (
        <Col sm="6">
            <div className="noticia">
                <Card>
                    <CardImg

                        alt="Card image cap"
                        src={data.imagem}
                        top
                        width="880px"
                        height="530px"
                    />
                    <CardBody>
                        <Link to={`/noticia/${data.id}`} >
                            <CardTitle tag="h5">
                                {data.titulo}
                            </CardTitle>
                            <CardSubtitle
                                className="mb-2 text-muted"
                                tag="h6"
                            >
                                {data.subtitulo}
                            </CardSubtitle>
                        </Link>
                    </CardBody>
                </Card>
            </div>
        </Col >
    );
}