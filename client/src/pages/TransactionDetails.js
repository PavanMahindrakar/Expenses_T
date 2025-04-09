import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getTransactionById, deleteTransaction } from '../utils/api';
import { FaEdit, FaTrash, FaArrowLeft, FaSpinner } from 'react-icons/fa';

const TransactionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        setLoading(true);
        const response = await getTransactionById(id);
        setTransaction(response.data);
      } catch (error) {
        setError('Failed to fetch transaction. It may not exist or has been deleted.');
        toast.error('Failed to fetch transaction');
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await deleteTransaction(id);
        toast.success('Transaction deleted successfully');
        navigate('/');
      } catch (error) {
        toast.error(error.error || 'Failed to delete transaction');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
        <p>
          Please go back to the 
          <button 
            onClick={() => navigate('/')} 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--primary-color)', 
              cursor: 'pointer',
              textDecoration: 'underline',
              padding: '0 5px',
              fontSize: 'inherit'
            }}
          >
            dashboard
          </button>
        </p>
      </div>
    );
  }

  if (!transaction) return null;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
        <Link to="/" style={{ marginRight: '15px', color: 'var(--text-secondary)' }}>
          <FaArrowLeft />
        </Link>
        <h2>Transaction Details</h2>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.5rem' }}>{transaction.title}</h3>
          <div>
            <Link to={`/edit-transaction/${id}`} style={{ marginRight: '15px' }}>
              <button className="btn" style={{ backgroundColor: 'var(--warning-color)', color: 'white' }}>
                <FaEdit style={{ marginRight: '5px' }} /> Edit
              </button>
            </Link>
            <button className="btn btn-danger" onClick={handleDelete}>
              <FaTrash style={{ marginRight: '5px' }} /> Delete
            </button>
          </div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div>
            <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Amount</h4>
            <p className={transaction.amount > 0 ? 'income' : 'expense'} style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              {transaction.amount > 0 ? '+' : '-'} ${Math.abs(transaction.amount).toFixed(2)}
            </p>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Type</h4>
            <p style={{ 
              display: 'inline-block',
              padding: '5px 10px',
              borderRadius: '4px',
              backgroundColor: transaction.amount > 0 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              color: transaction.amount > 0 ? 'var(--success-color)' : 'var(--danger-color)',
              fontWeight: 'bold'
            }}>
              {transaction.amount > 0 ? 'Income' : 'Expense'}
            </p>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Category</h4>
            <p>{transaction.category}</p>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Date</h4>
            <p>{formatDate(transaction.date)}</p>
          </div>
        </div>

        {transaction.notes && (
          <div>
            <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Notes</h4>
            <p style={{ 
              backgroundColor: 'var(--background-color)', 
              padding: '1rem', 
              borderRadius: '0.5rem',
              whiteSpace: 'pre-wrap'
            }}>
              {transaction.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionDetails; 