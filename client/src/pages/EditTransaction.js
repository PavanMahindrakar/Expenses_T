import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TransactionForm from '../components/TransactionForm';
import { getTransactionById, updateTransaction } from '../utils/api';
import { FaSpinner } from 'react-icons/fa';

const EditTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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

  const handleSubmit = async (formData) => {
    try {
      setSubmitting(true);
      await updateTransaction(id, formData);
      toast.success('Transaction updated successfully');
      navigate('/');
    } catch (error) {
      const errorMessage = error.error 
        ? Array.isArray(error.error) ? error.error[0] : error.error 
        : 'Failed to update transaction';
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
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

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Edit Transaction</h2>
        <button 
          onClick={() => navigate('/')} 
          className="btn"
          style={{ 
            backgroundColor: 'transparent', 
            border: '1px solid var(--border-color)',
            color: 'var(--text-color)'
          }}
        >
          Cancel
        </button>
      </div>
      <TransactionForm 
        transaction={transaction} 
        onSubmit={handleSubmit} 
        isLoading={submitting} 
      />
    </div>
  );
};

export default EditTransaction; 