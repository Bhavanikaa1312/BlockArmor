import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navigation">
      <div className="jai-hind">
        <img className="jai-hind-image" src="\images\icon.jpg" alt="Jai Hind Image" />
        <div className="jai-hind-text">Jai Hind</div>
      </div>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/lifeinarmy">Life in Army</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Header;
