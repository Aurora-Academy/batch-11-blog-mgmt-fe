import { Col, Card, Placeholder } from "react-bootstrap";
import ImageWithFallback from "./ImageWithFallback";

const SkeletalLoading = () => {
  return (
    <Col md={6} lg={3} className="mb-4">
      <Card>
        <ImageWithFallback />
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} />
            <Placeholder xs={4} /> <Placeholder xs={6} />
            <Placeholder xs={8} />
          </Placeholder>
          <Placeholder xs={7} /> <Placeholder xs={2} />
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SkeletalLoading;
