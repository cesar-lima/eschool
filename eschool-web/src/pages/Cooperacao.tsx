import { FormGroup, Label, Button } from "reactstrap";
import { FooterComponent } from "../components/Footer";
import InputComponent from "../components/Input";
import { NavBar } from "../components/NavBar";
import '../styles/cooperacao.scss';
import * as Yup from 'yup';
import { useCallback, useRef } from "react";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web"
import getValidationErrors from "../utils/getValidationErrors";

export function Cooperacao() {
    const formRef = useRef<FormHandles>(null);
    const handleSubmit = useCallback(async (data: object) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                cooperacao: Yup.string()
                    .required('Este campo é obrigatorio'),
            });
            await schema.validate(data, {
                abortEarly: false,
            });
            
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
              const errors = getValidationErrors(error);
              formRef.current?.setErrors(errors);
              return;
            }
        }
    }, []);

    return (
        <div>
            <NavBar />
            <div className="formCooperacao">
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="examplecooperacao">
                            <h5>Para cooperar conosco, digite abaixo, de forma sucinta, alguma sugestão ou fatos importantes para a elaboração de uma possivel noticia</h5>
                        </Label>
                        <InputComponent
                            className="txtCooperacao"
                            name="cooperacao"
                            type="text"
                        >
                        </InputComponent>
                    </FormGroup>
                    <Button className="btnSub">
                        Enviar
                    </Button>
                </Form>
            </div>
            <FooterComponent/>
        </div>
    );
}