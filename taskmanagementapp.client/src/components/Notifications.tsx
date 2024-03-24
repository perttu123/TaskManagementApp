

import Card from 'react-bootstrap/Card';

interface tyyppi{
  data: String
}
export default function Notifications({data}:tyyppi){

    return (<>
          <Card style={{ width: '30rem', height: '40rem'}}>
        <Card.Body>
          <Card.Title>Statistics</Card.Title>
          <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
          <Card.Text>
           {data}
          </Card.Text>
          <Card.Link></Card.Link>
          <Card.Link ></Card.Link>
        </Card.Body>
      </Card>
    </>)
}