import Card from 'react-bootstrap/Card';

interface TaskData {
  taskCount: number;
  newCount: number;
  inProgressCount: number;
  doneCount: number;
  cancelledCount: number;
  weeklyCreationCount: number;
  weeklyCompleted: number;
}

interface Props {
  data: TaskData;
}


export default function Notifications({data}:Props){

    return (<>
    <div style={{paddingTop:"30px"}}>
      <Card style={{ width: '30rem', height: '40rem'}}>
            <Card.Body>
                <Card.Title>Statistics</Card.Title>
                <Card.Text>
                    Here are some stats:
                </Card.Text>
                <ul className="list-unstyled fs-6"> 
                    <li>All tasks: {data.taskCount}</li>
                    <li>New tasks: {data.newCount}</li>
                    <li>In progress tasks: {data.inProgressCount}</li>
                    <li>Done tasks: {data.doneCount}</li>
                    <li>Cancelled tasks: {data.cancelledCount}</li>
                    <li>Created this week: {data.weeklyCreationCount}</li>
                    <li>Completed this week: {data.weeklyCompleted}</li>
                </ul>
            </Card.Body>
        </Card>
      </div>
      
    </>)
}