import { useEffect, useState } from 'react';
import { Row, Col} from 'react-bootstrap';
import { fetchStatistics, fetchHomePageTasks} from '../components/routes.tsx';
import CardContainer from '../components/CardContainer.tsx';
import Notifications from '../components/Notifications.tsx';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function HomePage() {

  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [stats, setStats] = useState({})

  const fetchTask= async()=>{
    const response = await fetchHomePageTasks();
    const response2 = await fetchStatistics();
    setTasks(response.data);
    setStats(response2);
  }
  
  useEffect(()=>{
    fetchTask();
  }, [refresh])

  return (
    <>
        <Row>
          <Col md={8}>
            {tasks.length==0 ? (<><h1>No tasks In progress currently</h1> 
            <Button variant="primary" size="lg" onClick={()=>navigate("/tasks")}>Go To Tasks page</Button></>):
              ( <>
               <h1>Tasks in progress</h1>
                <Row>
               
                  <Col>
                  
                    <CardContainer data={tasks} setRefresh={setRefresh} refresh={refresh}/>
                  </Col>
                  <Button variant="primary" size="lg" onClick={()=>navigate("/tasks")}>Go To Tasks page</Button>
                </Row>              
                </>)}
                    
              </Col>
                <Col md={4}>
                  <Notifications data={stats}/>
                </Col>
          </Row>
    </>
);
}


export default HomePage;

