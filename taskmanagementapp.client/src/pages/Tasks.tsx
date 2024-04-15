import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { CreateTask } from '../components/routes';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { Row, Col, Form, Container } from 'react-bootstrap';
import CardContainer from '../components/CardContainer.tsx';
import Notifications from '../components/Notifications.tsx';
import PageChange from '../components/Pagination.tsx';
import {fetchTasks, fetchStatistics} from '../components/routes.tsx';

export default function Tasks(){

    const navigate = useNavigate();

    interface InputState{
      name: null | String,
      content: null | String,
      startDate: Date
      endDate: null | Date,
      tagsId: Number,
      statusId: Number 
  }
    const mockInputData: InputState = {
    name: "",
    content: "",
    startDate: new Date(),
    endDate: null,
    tagsId: 1,
    statusId: 1
  };
    async function handleCreate() {
      console.log(new Date());
      const response = await CreateTask(mockInputData);
      console.log(response); // For debugging
      navigate(`/edit/${response}`);
    }

    const [tasks, setTasks] = useState([]);
    const [category, setCategory] = useState("");
    const [order, setOrder] = useState("newest");
    const [pageIndex, setPageIndex] = useState(0);
    const [taskCount, setTaskCount] = useState(0);
    const [stats, setStats] = useState("");

    const fetchTask= async()=>{
      const response = await fetchTasks({pageIndex, category , order});
      const response2 = await fetchStatistics();
      console.log(response);
      setStats(response2.data);
      setTasks(response.sixItems);
      console.log("data: ", response.sixItems);
      setTaskCount(response.count);
    }
    
    useEffect(()=>{
      fetchTask();
      console.log(category, order);
    }, [pageIndex, category, order])
  
    return (<>

   
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px', paddingTop: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', paddingLeft: "20px"}}>
              <Query/>
          </div>
          <Button variant="primary" onClick={handleCreate} style={{marginRight: "60px"}}>Create New Task</Button>{' '}
        </div>
      
        
      
        <CardContainer data={tasks} />

       
      <PageChange taskCount={taskCount} pageIndex={setPageIndex}/>
 
   
    </>)

function Query() {

  function handleCategory(e){
    setCategory(e.target.value);
  }
  function handleOrder(e){
    setOrder(e.target.value);
  }

  return (<>
    <Form.Select aria-label="Default select example" style={{width: '300px', height: "50px" }} onChange={handleCategory} value={category}>
    <option value="">All</option>
    <option value="sport">Sport</option>
    <option value="course">Course</option>
  </Form.Select>
  <Form.Select aria-label="Default select example" style={{width: '300px', height: "50px" }} onChange={handleOrder} value={order}>
      <option value="newest">Newest</option>
      <option value="oldest">Oldest</option>
    </Form.Select>
  </>
  );
}
}
    
