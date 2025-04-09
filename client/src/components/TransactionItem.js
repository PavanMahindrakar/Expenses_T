import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { deleteTransaction } from '../utils/api';

const TransactionItem = ({ transaction, onTransactionDeleted }) => {
  const { _id, title, amount, category, type, date } = transaction;

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await deleteTransaction(_id);
        toast.success('Transaction deleted successfully');
        onTransactionDeleted(_id);
      } catch (error) {
        toast.error(error.error || 'Failed to delete transaction');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="card" style={{ position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3>{title}</h3>
          <p className={type === 'income' ? 'income' : 'expense'}>
            {type === 'income' ? '+' : '-'} ${Math.abs(amount).toFixed(2)}
          </p>
          <p>Category: {category}</p>
          <p>Date: {formatDate(date)}</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link to={`/transaction/${_id}`}>
            <FaEye size={18} style={{ color: '#6366f1', cursor: 'pointer' }} title="View Details" />
          </Link>
          <Link to={`/edit-transaction/${_id}`}>
            <FaEdit size={18} style={{ color: '#f59e0b', cursor: 'pointer' }} title="Edit" />
          </Link>
          <FaTrash
            size={18}
            style={{ color: '#ef4444', cursor: 'pointer' }}
            onClick={handleDelete}
            title="Delete"
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionItem; 