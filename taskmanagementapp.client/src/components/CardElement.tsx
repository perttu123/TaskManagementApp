import {Card, Button, Badge, Form, Modal} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { DeleteTask } from './routes';
import { useState } from 'react';

interface InputState {
  id: number,
  name: string;
  content: string;
  startDate: Date;
  endDate: Date;
  tagsId: number;
  statusId: number;
}

export default function CardElement({ data }: { data: InputState }) {

  const [deleteMessage, setDeleteMessage] = useState(false);

  const navigate = useNavigate();
  function handleEdit(){
    navigate(`/edit/${data.id}`)
  }
  async function handleDelete(){
    
    setDeleteMessage(true);
    if(deleteMessage==false){
      await DeleteTask(data.id);
    }
    return;
  }
  return (
    <>
    <Card className="mb-3" style={{ width: '30rem' }}>
      <Card.Body className="d-flex justify-content-between align-items-start">
        <Card.Title>{data.name}</Card.Title>
        <div>
        <Button variant="primary" onClick={handleEdit}>Edit</Button>{' '}
        <Button variant="danger" onClick={handleDelete}>Edit</Button>{' '}
        </div>
        </Card.Body>
        <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">
          Status: <Badge bg="info">{data.statusId}</Badge>
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Status: <Badge bg="info">{data.tagsId}</Badge>
        </Card.Subtitle>
        <Card.Text>{data.content}</Card.Text>
        </Card.Body>
      <Form.Select aria-label="Default select example" >
        <option value={0}>Select Tag</option>
        <option value={1}>Sport</option>
        <option value={2}>Course</option>
      </Form.Select>
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
          <Button variant="danger" onClick={()=>setDeleteMessage(false)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
