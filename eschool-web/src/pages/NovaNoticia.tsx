import { Button, FormGroup, Input, Label } from "reactstrap";
import InputComponent from "../components/Input";
import "../styles/formNovaNoticia.scss";
import getValidationErrors from "../utils/getValidationErrors";
import { Editor } from "@tinymce/tinymce-react";

import { Form } from "@unform/web";

import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useCallback, useState } from "react";
import { useRef } from "react";
import { FormHandles } from "@unform/core";
import api from "../services/api";
import { NavBar } from "../components/NavBar";
import { useAuth } from "../contexts/AuthContext";

export function NovaNoticia() {
    const formRef = useRef<FormHandles>(null);
    const { token } = useAuth();
    const [selectValue, setSelectValue] = useState("1");
    const editorRef = useRef<any>(null);
    const navigate = useNavigate();

    const handleSubmit = useCallback(
        async (data: any) => {
            try {
                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    titulo: Yup.string().required("Titulo obrigatório"),
                    subtitulo: Yup.string().required("Subtitulo obrigatório"),
                });
                await schema.validate(data, {
                    abortEarly: false,
                });

                const formData = {
                    titulo: data.titulo,
                    subtitulo: data.subtitulo,
                    id_categoria: Number(selectValue),
                    texto: editorRef.current.getContent(),
                    imagem: data.imagem,
                };

                await api.post("api/news", formData, {headers: {'Authorization': `Bearer ${token}`}});
                navigate("/area-editor");
            } catch (error) {
                console.log(error);
                if (error instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(error);
                    formRef.current?.setErrors(errors);
                    return;
                }
            }
        },
        [navigate, selectValue, token]
    );

    return (
        <div>
            <NavBar />
            <div className="formNovaNoticia">
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="titulo">Titulo</Label>
                        <InputComponent
                            name="titulo"
                            placeholder="digite o titulo da noticia"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="subtitulo">Subtitulo</Label>
                        <InputComponent
                            name="subtitulo"
                            placeholder="digite o subtitulo da noticia"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="imagem">URL da Capa (imagem)</Label>
                        <InputComponent
                            name="imagem"
                            placeholder="digite a url da imagem"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="categoria">Categoria</Label>
                        <Input
                            id="categoria"
                            name="categoria"
                            type="select"
                            value={selectValue}
                            onChange={(e) => setSelectValue(e.target.value)}
                        >
                            <option value="1">Manchetes</option>
                            <option value="2">Vestibulares</option>
                            <option value="3">Editais</option>
                            <option value="4">Eventos</option>
                            <option value="5">Estágios</option>
                            <option value="6">Editoriais</option>
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label>Texto da Noticia</Label>
                        <Editor
                            apiKey="aeo31rn6byr50gs8xk5ytcmwlusl6z1af30ezga4bvtmnbgs"
                            onInit={(evt, editor) =>
                                (editorRef.current = editor)
                            }
                            initialValue="<p>Digite aqui sua nova noticia...</p>"
                            init={{
                                height: 500,
                                menubar: false,
                                language: "pt_BR",
                                plugins: [
                                    "advlist autolink lists link image charmap print preview anchor",
                                    "searchreplace visualblocks code fullscreen",
                                    "insertdatetime media table paste help wordcount",
                                ],
                                toolbar:
                                    "undo redo | image | formatselect | " +
                                    "bold italic backcolor | alignleft aligncenter " +
                                    "alignright alignjustify | bullist numlist outdent indent | " +
                                    "removeformat",
                                image_title: true,
                                file_picker_types: "image",
                                automatic_uploads: true,
                                content_style:
                                    "body { font-family:Roboto,Arial,sans-serif; font-size:14px }",
                            }}
                        />
                    </FormGroup>

                    <Button type="submit" className="btnSub">
                        Salvar
                    </Button>
                </Form>
            </div>
        </div>
    );
}
