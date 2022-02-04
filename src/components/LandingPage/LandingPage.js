import React from 'react';
import { Link } from "react-router-dom";
import './LandingPage.css';

function LandingPage() {
  return (
  <div className='LandingPage'>
    <h1>Welcome to SubbieTrac</h1>
    <p>Add your subscriptions to start tracking now!</p>
      <Link to='/add-new' ><button>Add Subscription</button></Link>
  </div>
    );
}

export default LandingPage;
