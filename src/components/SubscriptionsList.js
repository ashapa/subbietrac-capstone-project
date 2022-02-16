import React, { useState, useEffect } from "react";
import moment from 'moment'
import SubscriptionForm from "./SubscriptionForm";
import Subscription from "./Subscription";
import './SubscriptionsList.css'
import Totals from './Totals';
import Table from "react-bootstrap/table"
import { auth, db } from "../firebase/config";
import {
  collection,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";


const emptySubscription = {
  id: undefined,
  name: '',
  price: '0',
  cycle: "weekly",
  date: { seconds: new Date().getTime(), milliseconds: 0 }
}
const SubscriptionsList = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loaded, setLoaded] = useState(false);
  // const subscriptionsCollectionRef = collection(db, "subscriptions");
  const subscriptionsCollectionRef = collection(db, "subscriptions");
  const [editingSubscription, setEditingSubscription] = useState(emptySubscription);
  const [show, setShow] = useState(false);
  const [subscriptionToEdit, setSubscriptionToEdit] = useState(null);


  const handleClose = () => {
    setShow(false);
  };

  const saveSubscription = async (sub) => {
    const toSave = { ...sub, date: moment.utc(sub.date, 'YYYY-MM-DD').toDate() }
    if (sub.id) {
      updateSubscription(toSave)
    } else {
      addSubscription(toSave)
    }
  }
  const addSubscription = async (sub) => {
    const { id, ...rest } = sub
    const newRef = await addDoc(subscriptionsCollectionRef, rest);
    const subscriptionsData = [...subscriptions, { id: newRef.id, ...sub }];
    setSubscriptions(subscriptionsData)
  };

  const updateSubscription = async (sub) => {
    const subscriptionDoc = doc(db, "subscriptions", sub.id);
    await updateDoc(subscriptionDoc, sub);
    // for this successful response, let newSubscriptionsList = a copy of subscriptions array state
    // let newSubscriptionsList = [...subscriptions];
    // .map takes a function and maps over all the items in the newSubscriptionsList and applies the function to every item (each item is represented by the variable 's')
    // meaning for every s in newSubscriptionsList, if s's id (i.e. each item's id) matches the passed in id on line 37, return a copy of the updatedSubscription object(which includes all it's key:values) & replace its id with passed in id, otherwise return the s object as is
    // then update the subscriptions array state with the newSubscriptionsList (which holds all the newly mapped values)
    console.log(sub.date.getTime() / 1000)
    const newSubscriptionsList = subscriptions.map(s => {
      if (s.id === sub.id) {
        return { ...sub, date: { seconds: (sub.date.getTime() / 1000).toFixed(), nanoseconds: 0 } }
      }
      return s;
    })
    console.log(newSubscriptionsList)
    setSubscriptions(newSubscriptionsList);
  };

  const deleteSubscription = async (id) => {
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
      setLoaded(true)
    };

    getSubscriptions();
  },
    // We don't care when the collection ref changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);


  const onEditClick = (sub) => {
    setShow(true);
    setEditingSubscription(sub);
  }


  if (!loaded) {
    return <h5 className="text-center mt-5 mx-2">Loading...</h5>
  }
  return subscriptions.length > 0 ? (
    <div className='subsList-container'>
      
      <button
        onClick={() => {
          setShow(true);
          setEditingSubscription(emptySubscription);
        }}
      >
        + Add Subscription
      </button>
      <SubscriptionForm
        show={show}
        handleClose={handleClose}
        subscription={editingSubscription}
        saveSubscription={saveSubscription}
      />
      <br />
      <Table hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Next Bill Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {subscriptions.map((subscription) => {
            return (
              <Subscription
                subscription={subscription}
                key={subscription.id}
                updateSubscription={updateSubscription}
                deleteSubscription={deleteSubscription}
                onEditClick={onEditClick}
              />
            );
          })}

          <Totals 
            subscriptions={subscriptions}
          />
        </tbody>
      </Table>
    </div>
  ) : (
    <h5 className="text-center mt-5 mx-2">
      No subscriptions. Add one now to start tracking!
    </h5>
  );


  // return (
  //   <div className='subsList'>
  //     <header>Subscriptions</header>
  //     <div className='subsList-container'>
  //       <button
  //         onClick={() => {
  //           setShow(true);
  //           setEditingSubscription({
  //             name: "",
  //             id: "",
  //           });
  //         }}
  //       >
  //         + Add Subscription
  //       </button>
  //       <SubscriptionForm
  //         show={show}
  //         handleClose={handleClose}
  //         editedSubscription={editingSubscription}
  //         addSubscription={addSubscription}
  //       />
  //       {subscriptions.map((subscription) => {
  //         return (
  //           <Subscription
  //             subscription={subscription}
  //             key={subscription.id}
  //             updateSubscription={updateSubscription}
  //             deleteSubscription={deleteSubscription}
  //             onEditClick={onEditClick}
  //           />
  //         );
  //       })}
  //     </div>
  //   </div>
  // );
};

export default SubscriptionsList;
