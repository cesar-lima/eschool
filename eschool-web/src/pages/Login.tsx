import { Button, FormGroup, Label } from "reactstrap";
import '../styles/formLogin.scss';
import logoImg from '../assets/images/logo.png';
import { Link, useNavigate } from "react-router-dom";
import InputComponent from "../components/Input";
import * as Yup from 'yup';
import { useCallback, useRef } from "react";
import getValidationErrors from "../utils/getValidationErrors";
import { FormHandles } from "@unform/core";
import { Form } from '@unform/web'
import { useAuth } from '../contexts/AuthContext';
import { NavBar } from "../components/NavBar";


interface SignInFormData{
    email: string;
    senha: string;
}

export function Login() {
    const navigate = useNavigate();
    const formRef = useRef<FormHandles>(null);
    const { user, signIn } = useAuth();

    const handleSubmit = useCallback(async (data: SignInFormData) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('Email obrigatório')
                    .email('Digite um email válido'),
                senha: Yup.string()
                    .required('Senha obrigatória'),
            });
            await schema.validate(data, {
                abortEarly: false,
            });
            signIn({
                email: data.email,
                senha: data.senha,
            });
            navigate('/');
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
              const errors = getValidationErrors(error);
              formRef.current?.setErrors(errors);
              return;
            }
        }
        
    }, 
        [signIn, navigate],
    );

    return (
        <div>
            <NavBar />
            <div className="formLogin">

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                        <Label
                            className="me-sm-2"
                            for="exampleEmail"
                        >
                            Email
                        </Label>
                        <InputComponent
                            name="email"
                            placeholder="digite seu email"
                            type="email"
                        />
                    </FormGroup>
                    <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                        <Label
                            className="me-sm-2"
                            for="examplePassword"
                        >
                            Senha
                        </Label>
                        <InputComponent
                            name="senha"
                            placeholder="digite sua senha"
                            type="password"
                        />
                    </FormGroup>
                    <div>
                        Não tem conta? <Link to="/cadastro">cadastre-se</Link>
                    </div>
                    <Button className="btnSub">
                        Login
                    </Button>
                </Form>

            </div>
        </div>
    );
}