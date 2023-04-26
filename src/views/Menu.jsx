import { Container, Nav, Navbar } from 'react-bootstrap';
import { useAuth } from "../hooks/useAuth";

const perfilMenu = [
    {
        profile: 1,
        menu: "Home",
        rota: "/"
    },
    {
        profile: 1,
        menu: "Cadastrar Candidato",
        rota: "/candidate"
    },
    {
        profile: 1,
        menu: "Cadastrar Inscrição",
        rota: "/enrollment"
    },
    {
        profile: 2,
        menu: "Home",
        rota: "/"
    },
    {
        profile: 2,
        menu: "Nova Inscrição",
        rota: "/new-enrollment"
    }
]

function Menu() {
    const { user, logout } = useAuth();

    const handleLogout = (event) => {
        logout();
    };

    var result = perfilMenu.filter(function (item) {
        return item.profile === user.profile;
    });
    return (
        <Navbar bg="light" expand="lg">
            <Container>
            <Navbar.Brand href="/">Incrição FCT</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    {result.map((item) => (
                        <Nav.Link href={item.rota}>{item.menu}</Nav.Link>
                    ))}
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        {user.name} <a href="" onClick={handleLogout}>Sair</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar.Collapse>
        </Container>
        </Navbar >
    );
}

export default Menu;