import { Outlet,  Link  } from "react-router-dom"
import { Navbar, Container, Nav} from 'react-bootstrap';


export default function Layout(){
    return(<>
       
    <Navbar bg="primary" data-bs-theme="dark">
    <Container>
        <Navbar.Brand href="/">Task Manager</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/tasks" className="nav-link">Tasks</Link>
            <Link to="/statistics" className="nav-link">Statistics</Link>
          </Nav>
    </Container>
    </Navbar>

      {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}> */}
      
       <Outlet/>
        
      
      {/* </div> */}
        
    
    </>)
}
