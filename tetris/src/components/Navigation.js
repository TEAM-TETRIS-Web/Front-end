import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Navigation = () => {

  return (
    <>
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Focus Mate</Navbar.Brand>
        <Nav className="me-right">
          <Nav.Link href="#home">공부방</Nav.Link>
          <Nav.Link href="#features">커뮤니티</Nav.Link>
          <Nav.Link href="#pricing">마이 페이지</Nav.Link>
          <Nav.Link href="#pricing">로그아웃</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  </>
  )
}

export default Navigation;