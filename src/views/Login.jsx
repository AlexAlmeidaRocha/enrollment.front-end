import { Button, Container, Form, Row, Col, FloatingLabel } from 'react-bootstrap';
import { useAuth } from "../hooks/useAuth";

function Login() {

  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    await login({
      email: email,
      password: password
    });
  };

  return (
    <>
      <Container className='login' fluid='sm'>
        <Col></Col>
        <Col>
          <Row>
            <Form.Text className="text-muted">
              <h1>Inscrição FCT</h1>
              <br />
            </Form.Text>
          </Row>
          <Row>
            <Form onSubmit={handleSubmit}>
              <FloatingLabel controlId="email" label="E-mail" className="mb-3">
                <Form.Control type="email" nome='email' placeholder="E-mail" />
              </FloatingLabel>
              <FloatingLabel controlId="password" label="Senha" className="mb-3">
                <Form.Control type="password" nome='password' placeholder="Senha" />
              </FloatingLabel>
              <Row>
                <Button variant="dark" type="submit" size="lg" >Entrar</Button>
                <Col>
                  <Button variant='link' size="sm">Esqueci a senha </Button>
                </Col>
                <Col>
                  <Button variant='link' size="sm">Novo cadastro</Button>
                </Col>
              </Row>
            </Form>
          </Row>
        </Col>
        <Col></Col>
      </Container>
    </>
  );
}

export default Login;