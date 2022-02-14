import React, { useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { db } from "../firebase/config"
import { collection, getDocs } from "firebase/firestore";


function SubscriptionForm(props) {
  const [name, setName] = useState(props.editedSubscription.name);
  const [price, setPrice] = useState(props.editedSubscription.price);
  const [cycle, setCycle] = useState("weekly");
  const [date, setDate] = useState(props.editedSubscription.date);
  const [validated, setValidated] = useState(false);

  // useEffect takes in 2 parameters: a function and a dependencies array.
  // The dependencies array '[]' contains values/items I want to watch for(i.e to see if there're any changes to these item/values).
  // And the function in this useEffect is dependent on whatever is in the array to run/execute)
  // This SubscriptionForm renders every time the modal is open(i.e when props.show is true). Therefore all my state variables will render as blank 
  // unless I use this useEffect to update my state variables
  // So when 'props.show' changes (i.e changes to true for ex.), the function updates all my declared state variables with the editedSubscription values
  useEffect(() => {
    setName(props.editedSubscription.name);
    setPrice(props.editedSubscription.price);
    setCycle(props.editedSubscription.cycle);
    setDate(props.editedSubscription.date);
  }, [props.show])

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
      props.addSubscription({ name, price: Number(price), cycle, date, })
      setName("");
      setPrice(0);
      setCycle("weekly");
      setDate("");
      setValidated(false);

      props.handleClose();
    }


  };
  // const querySnapshot = getDocs(collection(db, "subscriptions")).then(doc => {
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.data());
  //   });
  // })

  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new subscription</Modal.Title>
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
                onChange={(e) =>
                  setCycle(e.target.value)
                }
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
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div >
  );
}

export default SubscriptionForm;

