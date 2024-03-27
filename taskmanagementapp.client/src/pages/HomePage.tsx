import { useEffect, useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import {fetchTasks, fetchStatistics} from '../components/routes.tsx';
import CardContainer from '../components/CardContainer.tsx';
import Notifications from '../components/Notifications.tsx';
import PageChange from '../components/Pagination.tsx';

function HomePage() {

  const [tasks, setTasks] = useState([]);
  const [category, setCategory] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [stats, setStats] = useState("");

  const fetchTask= async()=>{
    const response = await fetchTasks({pageIndex, category});
    const response2 = await fetchStatistics();
    console.log(response2);
    setStats(response2.data);
    setTasks(response.cachedTasks);
    setTaskCount(response.count);
  }
  


  useEffect(()=>{
    fetchTask();
  }, [pageIndex, category])



  return (
    <>
        <Query/>
        
          <Row>
          
              <Col md={8}>
                {tasks.length==0 ? (<h1>Ei taskeja</h1>):
                (
                  <Row>
                        <Col>
                            <CardContainer data={tasks} />
                        </Col>
                    </Row>
                
              )}
                    
              </Col>
                <Col md={4}>
                  <Notifications data={stats}/>
                </Col>
          </Row>
      <PageChange taskCount={taskCount} pageIndex={setPageIndex}/>
    </>
);

  function Query() {

    function handleCategory(e){
      setCategory(e.target.value);
    }
    return (
      <Form.Select aria-label="Default select example" style={{width: '200px'}} onChange={handleCategory} value={category}>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="3">Three</option>
      </Form.Select>
    );
  }
}


export default HomePage;

