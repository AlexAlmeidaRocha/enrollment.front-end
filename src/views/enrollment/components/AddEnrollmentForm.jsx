import { Button, Container, Form, Row, Col, FloatingLabel } from 'react-bootstrap';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import enrollmentApi from '../../../api/enrollment.api';

const AddEnrollmentForm = (props) => {

    const [enrollment, setEnrollment] = useState('')

    const handleInputChange = (event) => {
        const { name, value } = event.target

        setEnrollment({ ...enrollment, [name]: value })
    }
    console.log(enrollment);

    return (
        <Container>
            <Row>
                <Form.Text className="text-muted">
                    <h1>Nova Inscrição</h1>
                </Form.Text>
            </Row>
            <Form onSubmit={async (event) => {
                event.preventDefault()
                if (!enrollment.name)
                    return toast.error("Preencha todos os campos");
                else {
                    await enrollmentApi.post(enrollment.name).then(result => {
                        if (result.status === 201) {
                            toast.success("Cadastro realizado com sucesso");
                            props.setAddEnrollment(false);
                            props.getenrollments();
                        }
                    });
                }
            }}>
                <Row>
                    <FloatingLabel controlId="name" label="Nome" className="mb-3">
                        <Form.Control type="text" name='name' placeholder="Nome" value={enrollment.name}
                            onChange={handleInputChange} />
                    </FloatingLabel>
                </Row>
                <Row>
                    <Col>
                        <Button variant="dark" type="submit">Cadastrar</Button>
                    </Col>
                    <Col>
                        <Button variant="dark" onClick={() => props.setAddEnrollment(false)} className="button muted-button">Cancelar</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default AddEnrollmentForm