import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

interface InputState {
  name: string;
  content: string;
  startDate: Date;
  endDate: Date;
  tagsId: number;
  statusId: number;
}

export default function CardElement({ data }: { data: InputState }) {
  return (
    <Card className="mb-3" style={{ width: '30rem' }}>
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Status: <Badge bg="info">{data.statusId}</Badge>
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Status: <Badge bg="info">{data.tagsId}</Badge>
        </Card.Subtitle>
        <Card.Text>{data.content}</Card.Text>
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
  );
}
