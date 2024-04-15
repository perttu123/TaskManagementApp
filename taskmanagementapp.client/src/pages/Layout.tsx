import { Outlet,  Link  } from "react-router-dom"
import { Navbar, Container, Nav} from 'react-bootstrap';


export default function Layout(){
    return(<>
       
    <Navbar bg="primary" data-bs-theme="dark">
    <Container>
        <Navbar.Brand href="/">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/">Home</Link>
            <Link to="/tasks">Tasks</Link>
            <Link to="/statistics">Stats</Link>
          </Nav>
    </Container>
    </Navbar>

      {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}> */}
      
       <Outlet/>
        
      
      {/* </div> */}
        
    
    </>)
}
