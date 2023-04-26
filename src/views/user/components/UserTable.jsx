import { Button, Table, Row, Col, Container, Form, FloatingLabel } from 'react-bootstrap';
import { toast } from 'react-toastify';
import userApi from '../../../api/user.api';
import { useState } from 'react';

const CandidateTable = (props) => {

    const [search, setSearch] = useState("");

    const handleChange = event => {
        setSearch(event.target.value);
    };

    const results = !search
        ? props.users
        : props.users.filter(result =>
            result.name.toString().toLowerCase().includes(search.toLocaleLowerCase()) ||
            result.email.toString().toLowerCase().includes(search.toLocaleLowerCase())
        );

    return (
        <><Container>
            <Row>
                <Col>
                </Col>
                <Col>
                    <Form.Text className="text-muted">
                        <h1>Candidatos</h1>
                    </Form.Text>
                </Col>
                <Col>
                    <Button variant="dark" onClick={() => { props.setAddUser(true) }} >Adicionar</Button>
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
                                <th>E-mail</th>
                                <th>Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.users.length > 0 ? (
                                results.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <Button
                                                variant="link"
                                                size="sm"
                                                onClick={() => {
                                                    props.editRow(user)
                                                }}>Alterar</Button>

                                            <Button
                                                variant="link"
                                                size="sm"
                                                onClick={async () => {
                                                    await userApi.remove(user.id).then(result => {
                                                        if (result.status === 204) {
                                                            toast.success("Usuário excluido com sucesso");
                                                            props.getusers();
                                                        }
                                                    });
                                                }}>Excluir</Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3}>Sem candidatos</td>
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

export default CandidateTable