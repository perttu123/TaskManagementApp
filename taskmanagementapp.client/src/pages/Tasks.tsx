import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { CreateTask } from '../components/routes';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

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

    return (<>
    <Button variant="primary" onClick={()=>handleCreate()}>Create New Task</Button>{' '}
          <Card style={{ width: '30rem', height: '40rem'}}>
        <Card.Body>
          <Card.Title>asdasd</Card.Title>
          <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
          <Card.Text>
           jfaisf jaa ofoask f oasofoas foas ko kokokasof oasof 
          </Card.Text>
          <Card.Link></Card.Link>
          <Card.Link ></Card.Link>
        </Card.Body>
      </Card>
    </>)
}
    