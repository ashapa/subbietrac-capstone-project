import React, { useState } from "react";
import moment from "moment";
import { MdEdit, MdDelete, MdNotificationAdd } from "react-icons/md";
import Table from "react-bootstrap/table"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
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
    const startDate = moment.unix(date.seconds)
    const now = moment()
    let nextDate;

    if (cycle === "yearly") {
      const diff = moment().diff(date, "years", true);
      nextDate =
        diff > 0
          ? startDate.add(Math.floor(diff) + 1, "year")
          : startDate
    } else if (cycle === "monthly") {
      if (startDate.isBefore(now)) {
        const diff = now.diff(startDate, "months");
        nextDate = startDate.add(diff + 1, "month")
      } else {
        nextDate = startDate
      }
    } else {
      if (startDate.isBefore(now)) {
        const diff = now.diff(startDate, "weeks");
        console.log('diff', diff)
        nextDate = startDate.add(diff + 1, "weeks")
      } else {
        nextDate = startDate
      }
    }

    return nextDate.format("MMM DD, YYYY");
  };



  return (
    <tr>
      <td className="name">{subscription.name}</td>
      <td>${subscription.price} / {subscription.cycle}</td>
      <td>{moment(subscription.date.seconds * 1000).format("MMM DD, YYYY")}</td>
      <td>{nextBill(subscription.cycle, subscription.date)}</td>
      <td className="sub__deleteNedit">

        <button color="info" className="btn btn-outline-info" >
          <MdNotificationAdd />
        </button>
        <button color="info" className="btn btn-outline-info" onClick={() => onEditClick(subscription)}>
          <MdEdit />
        </button>
        <button
          className="btn btn-outline-info"
          onClick={() => deleteSubscription(subscription.id)}
        >
          <MdDelete />
        </button>

      </td>
    </tr>
  );
};

export default Subscription;