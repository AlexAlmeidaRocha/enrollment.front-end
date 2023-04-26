import { Button, Container, Form, Col, Row, FloatingLabel } from 'react-bootstrap';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import userApi from '../../../api/user.api';

const AlterCanditateForm = props => {

    const [user, setUser] = useState(props.currentUser)
    console.log(user.name);

    const handleInputChange = event => {
        const { name, value } = event.target

        setUser({ ...user, [name]: value })
    }

    return (
        <Container>
            <Row>
                <Form.Text className="text-muted">
                    <h1>Cadastro do Candidato</h1>
                </Form.Text>
            </Row>
            <Col>
            </Col>
            <Col>
                <Form onSubmit={async (event) => {
                    event.preventDefault()
                    if (user.name === '' || user.email === '' || user.password === '' || user.profile === '')
                        return toast.error("Preencha todos os campos");
                    else {
                        await userApi.put(user.id, user.name, user.email, user.password, user.profile).then(result => {
                            if (result.status === 200) {
                                toast.success("Alteração realizada com sucesso");
                                props.setEditing(false);
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
                                <Form.Control type="text" name='email' placeholder="E-mail" value={user.email}
                                    onChange={handleInputChange} />
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel controlId="password" label="Senha" className="mb-3">
                                <Form.Control type="text" name='password' placeholder="Senha" value={user.password}
                                    onChange={handleInputChange} />
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel controlId="profile" label="Perfil" className="mb-3">
                                <Form.Control type="" name='profile' placeholder="Perfil" value={user.profile}
                                    onChange={handleInputChange} />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="dark" type="submit">Alterar</Button>
                        </Col>
                        <Col>
                            <Button variant="dark" onClick={() => props.setEditing(false)} className="button muted-button">Cancelar</Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
            <Col>
            </Col>
        </Container>
    )
}

export default AlterCanditateForm