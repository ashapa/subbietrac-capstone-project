import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import './Subscription.css'
import { db } from "../firebase/config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const Subscription = ({ subscription, onEditClick, deleteSubscription }) => {



  const nextBill = (cycle, date) => {
    let nextDate;

  //   if (cycle === "yearly") {
  //     const diff = moment().diff(date, "years", true);
  //     nextDate =
  //       diff > 0
  //         ? moment(date).add(Math.floor(diff) + 1, "year")
  //         : moment(date);
  //   } else if (cycle === "monthly") {
  //     const diff = moment().diff(date, "months", true);
  //     nextDate =
  //       diff > 0
  //         ? moment(date).add(Math.floor(diff) + 1, "month")
  //         : moment(date);
  //   } else {
  //     const diff = moment().diff(date, "weeks", true);
  //     nextDate =
  //       diff > 0
  //         ? moment(date).add(Math.floor(diff) + 1, "week")
  //         : moment(date);
  //   }

  //   return nextDate.format("MMM DD, YYYY");
  };



  return (
      <div>
        <div className="item">
          <div className="name">{subscription.name}</div>
          <div>
            {subscription.price}
          </div>
          <div>{nextBill(subscription.cycle, subscription.date)}</div>
          <div className="edit-delete">
            <div>
              <button color="info" className="edit" onClick={() => onEditClick(subscription)}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </div>
            <button
              className="delete"
              onClick={() => deleteSubscription(subscription.id)}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        </div>
      </div>
  );
};

export default Subscription;