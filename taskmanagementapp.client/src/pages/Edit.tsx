import { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { UpdateTask } from '../components/routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';

export default function Edit(){

  const navigate = useNavigate();
  const { taskId } = useParams();
  const idNumber = parseInt(taskId);

    interface InputState{
        name: String,
        content: String,
        startDate: Date,
        endDate: Date | null,
        tagsId: Number,
        statusId: Number
    };

    const [inputs, setInputs] = useState<InputState>({
        name: "",
        content: "",
        startDate: new Date(),
        endDate: null,
        tagsId: 0,
        statusId: 1
    })

    async function handleSubmit(){
      if(inputs.tagsId===0){console.log("error");return}
      const response = await UpdateTask(inputs, idNumber);
      if(response===true){
        navigate("/");
      }
      else{
        console.log("error");
      }
    }
    const changeTag=(e)=>{
      setInputs({ ...inputs, tagsId: parseInt(e.target.value) });
    }
    return(<>
        <h1>editpage</h1>
    
        <FloatingLabel
          controlId="floatingTextarea"
          label="Name"
          className="mb-3">
          <Form.Control as="textarea" placeholder="Leave a comment here" onChange={(e)=>setInputs({...inputs, name: e.target.value})} value={inputs.name}/>
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea2" label="Comments">
  
          <Form.Control
            onChange={(e) => setInputs(prevInputs => ({ ...prevInputs, content: e.target.value }))}
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: '100px' }}
            name='content'
            value={inputs.content}
          />
        </FloatingLabel>
        <Form.Select aria-label="Default select example" value={inputs.tagsId} onChange={changeTag}>
        <option value={0}>Select Tag</option>
        <option value={1}>Sport</option>
        <option value={2}>Course</option>
      </Form.Select>
      {/* <Form.Select aria-label="Default select example">
        <option>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Form.Select> */}
      <Button variant="primary" onClick={()=>handleSubmit()}>Add</Button>{' '}
      
    </>)





  }
