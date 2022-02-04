import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { db } from "../firebase/config"
import { collection, getDocs } from "firebase/firestore";


function AddNew() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [frequency, setFrequency] = useState("");
  const [date, setDate] = useState("");
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);

  const handleClear = () => {
    setName("");
    setPrice(0);
    setFrequency("weekly");
    setDate("");
    setValidated(false);
  };

  const handleClose = () => {
    setShow(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();


    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      setName("");
      setPrice(0);
      setFrequency("weekly");
      setDate("");
      setValidated(false);
      handleClose();
    }

    const querySnapshot = getDocs(collection(db, "subscriptions")).then(doc => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
      });
    })
  };
  return (
    <div>
      <button onClick={() => setShow(true)}>Add New</button>
      <Modal show={show} onHide={handleClose}>
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
                value={frequency}
                onChange={() =>
                  setFrequency()
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

export default AddNew;
