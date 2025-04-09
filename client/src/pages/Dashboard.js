import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getTransactions } from '../utils/api';
import TransactionItem from '../components/TransactionItem';
import Summary from '../components/Summary';
import { FaSpinner } from 'react-icons/fa';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const response = await getTransactions();
        setTransactions(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch transactions');
        toast.error('Failed to fetch transactions');
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleTransactionDeleted = (id) => {
    setTransactions(transactions.filter(transaction => transaction._id !== id));
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
        <FaSpinner style={{ fontSize: '2rem', animation: 'spin 1s linear infinite' }} />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card" style={{ textAlign: 'center', color: 'var(--danger-color)' }}>
        <h2>{error}</h2>
        <p>Please try again later.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Your Financial Overview</h2>
      
      {transactions.length === 0 ? (
        <div className="card" style={{ textAlign: 'center' }}>
          <h3>No transactions found</h3>
          <p>Start by adding your first transaction!</p>
        </div>
      ) : (
        <>
          <Summary transactions={transactions} />
          
          <h2 style={{ margin: '2rem 0 1rem' }}>Recent Transactions</h2>
          
          {transactions.map(transaction => (
            <TransactionItem 
              key={transaction._id} 
              transaction={transaction} 
              onTransactionDeleted={handleTransactionDeleted}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Dashboard; 