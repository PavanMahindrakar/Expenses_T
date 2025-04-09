import React from 'react';
import { FaArrowUp, FaArrowDown, FaBalanceScale } from 'react-icons/fa';

const Summary = ({ transactions }) => {
  // Calculate income (positive amounts)
  const income = transactions
    .filter(transaction => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  // Calculate expenses (negative amounts)
  const expenses = transactions
    .filter(transaction => transaction.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  // Calculate balance
  const balance = income + expenses; // Since expenses are already negative

  return (
    <div className="grid grid-2">
      <div className="card">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaArrowUp style={{ color: 'var(--success-color)' }} /> Total Income
        </h3>
        <p className="income" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
          ${income.toFixed(2)}
        </p>
      </div>

      <div className="card">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaArrowDown style={{ color: 'var(--danger-color)' }} /> Total Expenses
        </h3>
        <p className="expense" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
          ${Math.abs(expenses).toFixed(2)}
        </p>
      </div>

      <div className="card" style={{ gridColumn: '1 / -1' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaBalanceScale style={{ color: 'var(--primary-color)' }} /> Current Balance
        </h3>
        <p 
          style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold',
            color: balance >= 0 ? 'var(--success-color)' : 'var(--danger-color)'
          }}
        >
          ${balance.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default Summary; 