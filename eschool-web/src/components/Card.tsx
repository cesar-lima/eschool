import { Link } from "react-router-dom";
import { CardBody, CardImg, CardSubtitle, CardText, CardTitle, Card, Col } from "reactstrap";

interface News{
    id: string;
    titulo: string;
    subtitulo: string;
    imagem: string;
}

export function CardComponent({ data} : {data: News}) {

    return (
        <Col sm="4">
            <div className="noticia">
                <Card>
                    <CardImg
                        alt="Card image cap"
                        src={data.imagem}
                        top
                        width="560px"
                        height="365px"
                    />
                    <Link to={`/noticia/${data.id}`}><CardBody>
                        <CardTitle tag="h5">
                            {data.titulo}
                        </CardTitle>
                        <CardSubtitle
                            className="mb-2 text-muted"
                            tag="h6"
                        >
                            {data.subtitulo}
                        </CardSubtitle>
                    </CardBody></Link>
                </Card>

            </div>
        </Col>
    );
}