import { Container, Button, Form, Row, Col, Table, FloatingLabel } from 'react-bootstrap';
import Menu from './Menu'
import { useState, useEffect } from 'react';
import enrollmentApi from '../api/enrollment.api';
import { useAuth } from '../hooks/useAuth';
import userApi from '../api/user.api';
import { toast } from 'react-toastify';

function NewEnrollmentStudent() {

  const { user } = useAuth();

  const [enrollments, setEnrollments] = useState([])

  const getEnrollments = () => {
    enrollmentApi.getAll().then(result => {

      if (result.status === 200 && result.data.length > 0) {
        setEnrollments(result.data);
      }
    });
  }
  
  const [search, setSearch] = useState("");

  const handleChange = event => {
    setSearch(event.target.value);
  };

  const results = !search
    ? enrollments
    : enrollments.filter(result =>
      result.name.toString().toLowerCase().includes(search.toLocaleLowerCase())
    );

  useEffect(() => {
    getEnrollments();
  }, [])

  return (
    <Container>
      <Row>
        <Menu />
      </Row>
      <Container>
        <Row>
          <Form>
            <Form.Text className="text-muted">
              <h1>Nova Inscrição</h1>
            </Form.Text>
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
                  {enrollments.length > user.enrollment.length ? (
                    results.map((enrollment) => {
                      if (!user.enrollment.includes(enrollment.id)) {
                        return <tr key={enrollment.id}>
                          <td>{enrollment.name}</td>
                          <td>
                            <Button
                              variant="dark"
                              onClick={async () => {
                                await userApi.patchAddEnrollment(user, enrollment.id).then(result => {
                                  if (result.status === 200) {
                                    toast.success("Inscrição cadastrada com sucesso");
                                    getEnrollments();
                                  }
                                });
                              }}>Inscrever</Button>
                          </td>
                        </tr>
                      }
                    })
                  ) : (
                    <tr>
                      <td colSpan={3}>Sem inscrições</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Col>
          </Form>
        </Row>
      </Container>
    </Container>
  );
}

export default NewEnrollmentStudent;