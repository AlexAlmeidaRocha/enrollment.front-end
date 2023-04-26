import { Button, Container, Form, Col, Row, FloatingLabel } from 'react-bootstrap';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import enrollmentApi from '../../../api/enrollment.api';


const AlterEnrollmentForm = props => {

    const [enrollment, setEnrollment] = useState(props.currentEnrollment)
    console.log(enrollment.name);

    const handleInputChange = event => {
        const { name, value } = event.target

        setEnrollment({ ...enrollment, [name]: value })
    }
    return (
        <Container>
            <Row>
                <Form.Text className="text-muted">
                    <h1>Cadastro de Incrição</h1>
                </Form.Text>
            </Row>
            <Col>
            </Col>
            <Col>
                <Form onSubmit={async (event) => {
                    event.preventDefault()
                    if (enrollment.name === '')
                        return toast.error("Preencha todos os campos");
                    else {
                        await enrollmentApi.put(enrollment.id, enrollment.name).then(result => {
                            if (result.status === 200) {
                                toast.success("Alteração realizada com sucesso");
                                props.setEditing(false);
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

export default AlterEnrollmentForm