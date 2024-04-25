import Card from 'react-bootstrap/Card';
import { fetchStatistics } from '../components/routes';
import { useEffect, useState } from 'react';
import Chart from '../components/Chart';

export default function StatisticsPage(){
    
  const [data, setData] = useState({
    taskCount: 0,
    inProgressCount: 0,
    doneCount: 0,
    cancelledCount: 0,
    newCount: 0,
    weeklyCompleted: 0,
    weeklyCreationCount: 0});

    async function fetch(){
      const response = await fetchStatistics();
      setData({
        taskCount: response.taskCount,
        inProgressCount: response.inProgressCount,
        doneCount: response.doneCount,
        cancelledCount: response.cancelledCount,
        newCount: response.newCount,
        weeklyCompleted: response.weeklyCompleted,
        weeklyCreationCount: response.weeklyCreationCount
    });
    }
  
    useEffect(()=>{
      fetch();
      console.log(data);
    },[])

    const statusCounts = {
      InProgress: data.inProgressCount,
      Done: data.doneCount,
      Cancelled: data.cancelledCount,
      New: data.newCount,
    };

    return (<>
      <Card>
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
        <Chart statusCounts={statusCounts}/>
       
    </>)
}
    
