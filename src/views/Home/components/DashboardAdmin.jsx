import { Container, Form, Row, Col, Table, FloatingLabel } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import userApi from '../../../api/user.api';

function toHoursAndMinutes(totalSeconds) {
    const totalMinutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `Horas: ${hours} Minutos: ${minutes} Segundos: ${seconds}`;
}

const DashboardAdmin = () => {

    const [users, setUser] = useState([])

    useEffect(() => {
        userApi.getAll().then(result => {

            if (result.status === 200 && result.data.length > 0) {
                setUser(result.data);
            }
        });
    }, [])

    const [search, setSearch] = useState("");

    const handleChange = event => {
        setSearch(event.target.value);
    };

    const results = !search
        ? users
        : users.filter(result =>
            result.name.toString().toLowerCase().includes(search.toLocaleLowerCase())
        );

    return (
        <Container>
            <Row>
                <Form.Text className="text-muted">
                    <h1>Dashboard ADMIN</h1>
                </Form.Text>
            </Row>
            <Row>
                <Col>
                    <FloatingLabel controlId="user" label="Pesquisar" className="mb-3">
                        <Form.Control type="text" name='search' placeholder="Pesquisar" value={search} onChange={handleChange} />
                    </FloatingLabel>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Candidato</th>
                                <th>Tempo online</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.length > 0 ? (
                                    results.map((item) => {
                                        return <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>{toHoursAndMinutes(item.time_online)}</td>
                                        </tr>
                                    })
                                ) : (
                                    <option value="null">Sem inscrições</option>
                                )
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default DashboardAdmin;