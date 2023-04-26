import { Button, Container, Form, Row, Table, Col, FloatingLabel } from 'react-bootstrap';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import userApi from '../../../api/user.api';
import Enrollment from './Enrollment';
import { toast } from 'react-toastify';

function DashboardCandidate() {

    const { user } = useAuth();

    const navigate = useNavigate();    

    return (
        <Container>
            <Row>
                <Form.Text className="text-muted">
                    <h1>Dashboard Candidato</h1>
                </Form.Text>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Minhas inscrições</th>
                                <th>Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                user.enrollment.length > 0 ? (
                                    user.enrollment.map((enrollmentId) => {
                                        return < tr key={enrollmentId}>
                                            <td><Enrollment id={enrollmentId} /></td>
                                            <td>
                                                <Button
                                                    variant='link'
                                                    size='sm'
                                                    onClick={async () => {
                                                        await userApi.patchRemoveEnrollment(user, enrollmentId).then(result => {
                                                            if (result.status === 200) {
                                                                toast.success("Inscrição excluida com sucesso");
                                                                navigate("/", { replace: true });
                                                            }
                                                        });
                                                    }}
                                                >Cancelar</Button>
                                            </td>
                                        </tr>
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={3}><Button href="/new-enrollment" variant='dark'>Nova Inscrição</Button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container >
    );
}

export default DashboardCandidate;