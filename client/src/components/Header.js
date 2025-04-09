import React from 'react';
import { Link } from 'react-router-dom';
import { FaMoneyBillWave } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaMoneyBillWave /> Expense Tracker
            </h1>
          </Link>
          <Link to="/add-transaction">
            <button className="btn btn-primary">Add Transaction</button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header; 