import { Row, Col, Card } from 'react-bootstrap';
import CardElement from '../components/CardElement.tsx'; 

export default function CardContainer({ data, setRefresh, refresh }) {
    return (
        <div className="mt-4 px-5">
        <Card style={{border: '2px solid black', padding:"10px", backgroundColor: "darkgray"}}>
        <Card.Body style={{ position: 'relative' }}>
            <Row>
                {data.map((item) => (
                    <Col md={4}>
                        <CardElement data={item} setRefresh={setRefresh} refresh={refresh}/>
                    </Col>
                ))}
            </Row>
        </Card.Body>
        </Card>
        </div>
    );
}