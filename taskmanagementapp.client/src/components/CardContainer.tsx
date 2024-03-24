import { Container, Row, Col } from 'react-bootstrap';
import CardElement from '../components/CardElement.tsx'; 

export default function CardContainer({ data }) {
    return (
        <Container>
            <Row>
                {data.map((cardData, index) => (
                    <Col key={index} md={6}>
                        <CardElement data={cardData} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}