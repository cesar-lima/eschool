import { Button, FormGroup, Label } from "reactstrap";
import logoImg from '../assets/images/logo.png';
import InputComponent from "../components/Input";
import '../styles/formLogin.scss';
import getValidationErrors from "../utils/getValidationErrors";

import { Form } from '@unform/web';

import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { useCallback } from "react";
import { useRef } from 'react';
import { FormHandles } from '@unform/core';
import api from '../services/api';
import { NavBar } from "../components/NavBar";

export function Cadastro() {
    const formRef = useRef<FormHandles>(null);
    const navigate = useNavigate();
    const handleSubmit = useCallback(async (data: object) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                nome: Yup.string().required('Nome obrigatório'),
                sobrenome: Yup.string().required('Sobrenome obrigatório'),
                email: Yup.string()
                    .required('Email obrigatório')
                    .email('Digite um email válido'),
                senha: Yup.string()
                    .min(6, 'No mínimo 6 dígitos'),
                culular: Yup.number().min(8, 'Digite um número de telefone válido'),
            });
            await schema.validate(data, {
                abortEarly: false,
            });

            await api.post('api/users', data);
            navigate('/login');
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
              const errors = getValidationErrors(error);
              formRef.current?.setErrors(errors);
              return;
            }
        }
    }, [navigate]);

    return (
        <div>
            <NavBar />
            <div className="formLogin">
                <Form ref={formRef} onSubmit={handleSubmit}>

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
                            Sobrenome
                        </Label>
                        <InputComponent
                            name="sobrenome"
                            placeholder="digite seu sobrenome"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleEmail">
                            Email
                        </Label>
                        <InputComponent
                            name="email"
                            placeholder="digite seu email"
                            type="email"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="examplePassword">
                            Senha
                        </Label>
                        <InputComponent
                            name="senha"
                            placeholder="digite sua senha"
                            type="password"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleTel">
                            Celular
                        </Label>
                        <InputComponent
                            name="celular"
                            placeholder="digite seu número"
                            type="number"
                        />
                    </FormGroup>

                    <Button className="btnSub">
                        Cadastre-se
                    </Button>
                </Form>
            </div>
        </div>
    );
}