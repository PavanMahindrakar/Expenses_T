import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TransactionForm from '../components/TransactionForm';
import { addTransaction } from '../utils/api';

const AddTransaction = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      await addTransaction(formData);
      toast.success('Transaction added successfully');
      navigate('/');
    } catch (error) {
      const errorMessage = error.error 
        ? Array.isArray(error.error) ? error.error[0] : error.error 
        : 'Failed to add transaction';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Add New Transaction</h2>
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
      <TransactionForm onSubmit={handleSubmit} isLoading={loading} />
    </div>
  );
};

export default AddTransaction; 