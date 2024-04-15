import {Card, Button, Badge, Form, Modal} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { DeleteTask } from './routes';
import { useState } from 'react';
import { UpdateStatus } from './routes';

interface InputState {
  id: number,
  name: string;
  content: string;
  startDate: Date;
  endDate: Date;
  tagsId: number;
  statusId: number;
  tag: {name: string, theme: number} 
  status: {name: string, theme: number}
}

export default function CardElement({ data }: { data: InputState }) {

  const [deleteMessage, setDeleteMessage] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [status, setStatus] = useState(0);

  const navigate = useNavigate();
  function handleEdit(){
    navigate(`/edit/${data.id}`)
  }
  async function handleDelete(){
    console.log("poistetty");
    await DeleteTask(data.id);
    setDeleteMessage(false);  
  }
  async function handleStatusChange(){
    const response = await UpdateStatus(data.id, status);
    if(response==true){
      setShowStatus(!showStatus)
    }
  }
  let taustavari = "";
  if (data.status !== null && data.status.theme !== null) {
    switch (data.status.theme) {
      case 1:
        taustavari = "lightblue";
        break;
      case 2:
        taustavari = "yellow";
        break;
      case 3:
        taustavari = "green";
        break;
      case 4:
        taustavari = "red";
        break;
      default:
        break;
    }
  }
  
  return (
    <>
    <Card className="mb-5" style={{ maxWidth: '35rem', width: '100%'  }}>
    <Card.Footer  style={{ backgroundColor: taustavari, fontSize: '20px', fontWeight: 'bold'}}>{data.status?.name}
   
    {showStatus?
    <><Form.Select aria-label="Default select example" value={status} onChange={(e)=>setStatus(e.target.value)}>
    <option>Open this select menu</option>
    <option value={1}>One</option>
    <option value={2}>Two</option>
    <option value={3}>Three</option>
    </Form.Select>
    <Button variant="primary" size="sm" onClick={()=>handleStatusChange()}>Save</Button></>:
    
    ( <Button variant="primary" size="sm" onClick={()=>setShowStatus(!showStatus)}>Change status</Button>)}

    </Card.Footer>
      <Card.Body className="d-flex justify-content-between align-items-start">
        <Card.Title>{data.name}</Card.Title>
        <div>
        <Button variant="primary" onClick={handleEdit}>Edit</Button>{' '}
        <Button variant="danger" onClick={()=>setDeleteMessage(true)}>Delete</Button>{' '}
        </div>
        </Card.Body>
        <Card.Body>
        <Card.Text>{data.content}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted">
          Tag: <Badge bg="info">{data.tag?.name}</Badge>
        </Card.Subtitle>
        </Card.Body>
        
      <Card.Footer className="text-muted">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <strong>Start Date:</strong> {data.startDate}
          </div>
          <div>
            <strong>End Date:</strong> {data.endDate}
          </div>
        </div>
      </Card.Footer>
    </Card>

    <Modal show={deleteMessage} onHide={()=>setDeleteMessage(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>You are deleting a task "{data.name}".</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setDeleteMessage(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={()=>handleDelete()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
