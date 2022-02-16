import React, { useEffect, useState } from "react";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

function SubscriptionForm(props) {
  const { subscription } = props;

  const startDate = subscription
    ? moment.unix(subscription.date.seconds).utc().format("YYYY-MM-DD")
    : "";
  const [name, setName] = useState(subscription.name);
  const [price, setPrice] = useState(subscription.price);
  const [cycle, setCycle] = useState(subscription.cycle);
  const [date, setDate] = useState(startDate);
  const [validated, setValidated] = useState(false);

  // useEffect takes in 2 parameters: a function and a dependencies array.
  // The dependencies array '[]' contains values/items I want to watch for(i.e to see if there're any changes to these item/values).
  // And the function in this useEffect is dependent on whatever is in the array to run/execute)
  // This SubscriptionForm renders every time the modal is open(i.e when props.show is true). Therefore all my state variables will render as blank
  // unless I use this useEffect to update my state variables
  // So when 'props.show' changes (i.e changes to true for ex.), the function updates all my declared state variables with the editedSubscription values
  useEffect(() => {
    const startDate = subscription
      ? moment.unix(subscription.date.seconds).utc().format("YYYY-MM-DD")
      : "";
    setName(subscription.name);
    setPrice(subscription.price);
    setCycle(subscription.cycle);
    setDate(startDate);
  }, [
    props.show,
    setName,
    setPrice,
    setCycle,
    setDate,
    subscription.name,
    subscription.cycle,
    subscription.price,
    subscription.date,
  ]);
  const handleClear = () => {
    setName("");
    setPrice(0);
    setCycle("weekly");
    setDate("");
    setValidated(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      props.saveSubscription({
        id: subscription.id,
        name,
        price: Number(price),
        cycle,
        date,
      });
      setName("");
      setPrice(0);
      setCycle("weekly");
      setDate("");
      setValidated(false);

      props.handleClose();
    }
  };

  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{subscription.id ? 'Update' : 'Add'} a new subscription</Modal.Title>
        </Modal.Header>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Subscription name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a name
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                required
                type="number"
                min="0.01"
                step="0.01"
                placeholder="Subscription price"
                value={price}
                onChange={(e) => setPrice(+e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid number
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Billing cycle</Form.Label>
              <Form.Control
                as="select"
                value={cycle}
                onChange={(e) => setCycle(e.target.value)}
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>First bill on</Form.Label>
              <Form.Control
                required
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a date
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClear}>
              Clear
            </Button>
            <Button variant="info" type="submit">
              {subscription.id ? 'Update' : 'Add'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default SubscriptionForm;
