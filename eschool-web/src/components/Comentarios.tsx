import { Form } from "@unform/web";
import { Button, Card, CardText, CardTitle, FormGroup, Label } from "reactstrap";
import InputComponent from "./Input";
import * as Yup from 'yup';
import getValidationErrors from "../utils/getValidationErrors";
import { FormHandles } from "@unform/core";
import { useCallback, useEffect, useRef, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";
import '../styles/noticia.scss'

export interface Comentarios {
    id: number;
    texto: string;
    data_criacao: Date;
    id_noticia: number;
    id_usuario_visitante: number;
}

export interface ComentarioReturn {
    data: Comentarios;
}

export function Comentarios() {
    const { id } = useParams();
    const formRef = useRef<FormHandles>(null);
    const [comentarios, setComentario] = useState<Comentarios[]>([]);

    const handleSubmit = useCallback(async (data: object) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                nome: Yup.string().required('Nome obrigatório'),
                sobrenome: Yup.string().required('Sobrenome obrigatório'),
            });
            await schema.validate(data, {
                abortEarly: false,
            });

            await api.post(`api/news/${id}/comments`, data);
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationErrors(error);
                formRef.current?.setErrors(errors);
                return;
            }
        }
    }, []);

    useEffect(() => {
        api.get<{ data: Comentarios[] }>(`api/news/${id}/comments`, {})
            .then(response => {
                setComentario(response.data.data);
            })
    }, [id])

    return (
        <div className="comentarios">
            <h4>Comentários</h4>
            <Form ref={formRef} onSubmit={handleSubmit} className="formComentario">
                <FormGroup>
                    <Label for="exampleFname">
                        Nome
                    </Label>
                    <InputComponent
                        name="nome"
                        placeholder="digite seu nome"
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="exampleLname">
                        Comentário
                    </Label>
                    <InputComponent
                        name="comentario"
                        placeholder="digite seu comentário"
                    />
                </FormGroup>

                <Button>
                    Enviar
                </Button>
            </Form>

            <div>
                <h4>
                    Lista de comentários
                </h4>
                {comentarios.map(comentario => (
                    <Card body key={comentario.id}>
                        <CardTitle tag="h5">
                            Nome do usuário
                        </CardTitle>
                        <CardText>
                            {comentario.texto}
                        </CardText>
                    </Card>
                ))}
            </div>

        </div>
    );
}