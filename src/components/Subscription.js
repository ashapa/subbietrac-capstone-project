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

  let gapi = window.gapi
  let CLIENT_ID = process.env.REACT_APP_CLIENT_ID
  let API_KEY = process.env.REACT_APP_CALENDAR_API_KEY
  let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
  let SCOPES = ['https://www.googleapis.com/auth/analytics.manage.users'];

  const addCalendarEvent = (startTime, address, clientName) => {
    gapi.load('client:auth2', () => {
      console.log('loaded client')

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })

      gapi.client.load('calendar', 'v3', () => console.log('bam!'))
      // time zone list:
      // https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
      let timeZone = "America/New_York";

      
      //sign in with pop up window
      gapi.auth2.getAuthInstance().signIn()
        console.log(gapi.auth2.getAuthInstance())
        .then(() => {

          let event = {
            'summary': clientName, // or event name
            'location': address, //where it would happen
            'start': {
              'dateTime': subscription.date,
              'timeZone': timeZone
            },
            'end': {
              'dateTime': subscription.date,
              'timeZone': timeZone
            },
            'recurrence': [
              'RRULE:FREQ=DAILY;COUNT=1'
            ],
            'reminders': {
              'useDefault': false,
              'overrides': [
                { 'method': 'popup', 'minutes': 20 }
              ]
            }
          }

          let request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event,
          })

          request.execute(event => {
            console.log(event)
            window.open(event.htmlLink)
          })

        })
    })
  }

  const nextBill = (cycle, date) => {
    const startDate = moment.unix(date.seconds)
    const now = moment()
    let nextDate;

    if (cycle === "yearly") {
      if (startDate.isBefore(now)) {
        const diff = now.diff(startDate, "years");
        nextDate = startDate.add(diff + 1, "year")
      } else {
        nextDate = startDate
      }
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

        <button color="info" className="btn btn-outline-info" onClick={addCalendarEvent}>
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