import { Button, Container, Form, Row, Col, FloatingLabel } from 'react-bootstrap';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import userApi from '../../../api/user.api';

const AddUserForm = (props) => {

    const [user, setUser] = useState('')

    const handleInputChange = (event) => {
        const { name, value } = event.target

        setUser({ ...user, [name]: value })
    }
    console.log(user);

    return (
        <Container>
            <Row>
                <Form.Text className="text-muted">
                    <h1>Novo Candidato</h1>
                </Form.Text>
            </Row>
            <Form onSubmit={async (event) => {
                event.preventDefault()
                if (!user.name || !user.email)
                    toast.error("Preencha todos os campos");
                else {
                    await userApi.post(user.name, user.email, user.password).then(result => {
                        if (result.status === 201) {
                            toast.success("Cadastro realizado com sucesso");
                            props.setAddUser(false)
                            props.getusers();
                        }
                    });
                }
            }}>
                <Row>
                    <FloatingLabel controlId="name" label="Nome" className="mb-3">
                        <Form.Control type="text" name='name' placeholder="Nome" value={user.name}
                            onChange={handleInputChange} />
                    </FloatingLabel>
                </Row>
                <Row>
                    <Col>
                        <FloatingLabel controlId="user" label="E-mail" className="mb-3">
                            <Form.Control type="email" name='email' placeholder="E-mail" value={user.email}
                                onChange={handleInputChange} />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel controlId="password" label="Senha" className="mb-3">
                            <Form.Control type="password" name='password' placeholder="Senha" value={user.password}
                                onChange={handleInputChange} />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button variant="dark" type="submit">Cadastrar</Button>
                    </Col>
                    <Col>
                        <Button variant="dark" onClick={() => props.setAddUser(false)} className="button muted-button">Cancelar</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default AddUserForm