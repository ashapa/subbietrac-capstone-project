import React from 'react';
import { Link } from "react-router-dom";
import './Home.css';

function Home() {
  return (
  <div className='home'>
    <h1>Welcome to SubbieTrac</h1>
    <p>Click on <Link to='/subscriptions' className='link'>subscriptions</Link> to start tracking your subscriptions now!</p>
  </div>
    );
}

export default Home;
