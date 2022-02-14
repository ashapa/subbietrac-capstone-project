import React, { useState, useEffect } from "react";
import SubscriptionForm from "./SubscriptionForm";
import Subscription from "./Subscription";
import './SubscriptionsList.css'
import { db } from "../firebase/config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";


const SubscriptionsList = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const subscriptionsCollectionRef = collection(db, "subscriptions");
  const [editingSubscritption, setEditingSubscription] = useState({});
  const [show, setShow] = useState(false);
  const [subscriptionToEdit, setSubscriptionToEdit] = useState(null);


  const handleClose = () => {
    setShow(false);
  };

  const addSubscription = async (sub) => {
    console.log(sub);
    const subscriptionDoc = doc(db, "subscriptions", sub.id);
    await addDoc(subscriptionsCollectionRef, sub);
    const subscriptionsData = [...subscriptions];
    subscriptionsData.push(sub);
    setSubscriptions(subscriptionsData)
  };

  const updateSubscription = async (id, updatedSubscription) => {
    const subscriptionDoc = doc(db, "subscriptions", id);
    await updateDoc(subscriptionDoc, updatedSubscription);
    // for this successful response, let newSubscriptionsList = a copy of subscriptions array state
    let newSubscriptionsList = [...subscriptions];
    // .map takes a function and maps over all the items in the newSubscriptionsList and applies the function to every item (each item is represented by the variable 's')
    // meaning for every s in newSubscriptionsList, if s's id (i.e. each item's id) matches the passed in id on line 37, return a copy of the updatedSubscription object(which includes all it's key:values) & replace its id with passed in id, otherwise return the s object as is
    // then update the subscriptions array state with the newSubscriptionsList (which holds all the newly mapped values)
    newSubscriptionsList.map(s => {
      if (s.id === id) {
        return { ...updatedSubscription, id }
      }
      return s;
    })
    setSubscriptions(newSubscriptionsList);
  };

  const deleteSubscription = async (id) => {
    console.log(id)
    const subscriptionDoc = doc(db, "subscriptions", id);
    deleteDoc(subscriptionDoc).then((response) => {
      // for this successful response, let newSubscriptionsList = a copy of subscriptions array state
      let newSubscriptionsList = [...subscriptions];
      // .filter takes a function and filters out all the items in the newSubscriptionsList where the function is true
      // meaning for every s (s is a variable representing every item in the list) in newSubscriptionsList, leave only the items whose id doesn't equal the passed in id on line 50
      // which changes newSubscriptionsList to be a list of only all the items we wanted to keep, and item with the matching id gets left out(i.e deleted)
      newSubscriptionsList = newSubscriptionsList.filter(s => s.id !== id);
      setSubscriptions(newSubscriptionsList);
    }).catch((error) => { console.log(error) })
  };

  useEffect(() => {
    const getSubscriptions = async () => {
      const data = await getDocs(subscriptionsCollectionRef);
      console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // set the 'subscriptions' state to be equal to the array of subscriptions in our collection(i.e which is represented by 'subscriptionsCollectionRef')
      // 'data.docs' is to access the documents inside of the data
      // for every 'doc' in data.docs array, return an object containing the doc's data fields, and the doc's id
      setSubscriptions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getSubscriptions();
  }, []);


  const onEditClick = (sub) => {
    setShow(true);
    setEditingSubscription(sub);
  }

  return (
    <div className='subsList'>
      <header>Subscriptions</header>
      <div className='subsList-container'>
        <button
          onClick={() => {
            setShow(true);
            setEditingSubscription({
              name: "",
              id: "",
            });
          }}
        >
          + Add Subscription
        </button>
        <SubscriptionForm
          show={show}
          handleClose={handleClose}
          editedSubscription={editingSubscritption}
          addSubscription={addSubscription}
        />
        {subscriptions.map((subscription) => {
          return (
            <Subscription
              subscription={subscription}
              key={subscription.id}
              updateSubscription={updateSubscription}
              deleteSubscription={deleteSubscription}
              onEditClick={onEditClick}
            />
            // <div key={subscription.id}>
            //   <div className='subsList-subs'>{subscription.name}</div>
            //   <div>price: {subscription.price}</div>
            //   <div>billing cycle: {subscription.cycle}</div>
            //   <div>start date: {subscription.date}</div>
            //   <button
            //     onClick={() => {
            //       setShow(true);
            //       setEditingSubscription(subscription);
            //     }}
            //   >
            //     Edit
            //   </button>
            //   <button
            //     onClick={() => {
            //       deleteSubscription(subscription.id)
            //     }}
            //   >
            //     Delete
            //   </button>
            // </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubscriptionsList;
