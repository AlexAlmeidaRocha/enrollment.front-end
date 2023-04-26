import { Button, Table, Row, Col, Container, Form, FloatingLabel } from 'react-bootstrap';
import { toast } from 'react-toastify';
import enrollmentApi from '../../../api/enrollment.api';
import { useState } from 'react';

const EnrollmentTable = (props) => {

    const [search, setSearch] = useState("");

    const handleChange = event => {
        setSearch(event.target.value);
    };

    const results = !search
        ? props.enrollments
        : props.enrollments.filter(result =>
            result.name.toString().toLowerCase().includes(search.toLocaleLowerCase())
        );

    return (
        <><Container>
            <Row>
                <Col>
                </Col>
                <Col>
                    <Form.Text className="text-muted">
                        <h1>Inscrição</h1>
                    </Form.Text>
                </Col>
                <Col>
                    <Button variant="dark" onClick={() => { props.setAddEnrollment(true) }} >Adicionar</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FloatingLabel controlId="user" label="Pesquisar" className="mb-3">
                        <Form.Control type="text" name='search' placeholder="Pesquisar" value={search} onChange={handleChange} />
                    </FloatingLabel>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.enrollments.length > 0 ? (
                                results.map((enrollment) => (
                                    <tr key={enrollment.id}>
                                        <td>{enrollment.name}</td>
                                        <td>
                                            <Button
                                                variant="link"
                                                size="sm"
                                                onClick={() => {
                                                    props.editRow(enrollment)
                                                }}>Alterar</Button>

                                            <Button
                                                variant="link"
                                                size="sm"
                                                onClick={async () => {
                                                    await enrollmentApi.remove(enrollment.id).then(result => {
                                                        if (result.status === 204) {
                                                            toast.success("Inscrição excluida com sucesso");
                                                            props.getenrollments();
                                                        }
                                                    });
                                                }}>Excluir</Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3}>Sem inscrições</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default EnrollmentTable