import React, { useState, useEffect } from 'react';

const CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Entertainment',
  'Utilities',
  'Housing',
  'Healthcare',
  'Education',
  'Personal',
  'Salary',
  'Investment',
  'Gift',
  'Other'
];

const TransactionForm = ({ transaction = {}, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category: '',
    date: new Date().toISOString().substr(0, 10),
    notes: ''
  });

  useEffect(() => {
    if (Object.keys(transaction).length > 0) {
      const { title, amount, type, category, notes } = transaction;
      
      setFormData({
        title: title || '',
        amount: Math.abs(amount) || '',
        type: type || 'expense',
        category: category || '',
        date: transaction.date 
          ? new Date(transaction.date).toISOString().substr(0, 10) 
          : new Date().toISOString().substr(0, 10),
        notes: notes || ''
      });
    }
  }, [transaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim() || !formData.amount || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }

    // Create final data object
    const finalData = {
      ...formData,
      // Convert amount to negative number if it's an expense
      amount: formData.type === 'expense' 
        ? -Math.abs(parseFloat(formData.amount)) 
        : Math.abs(parseFloat(formData.amount))
    };

    onSubmit(finalData);
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. Grocery shopping"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="amount">Amount *</label>
        <input
          type="number"
          step="0.01"
          className="form-control"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter amount"
          required
          min="0"
        />
      </div>

      <div className="form-group">
        <label>Type *</label>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="radio"
              name="type"
              value="expense"
              checked={formData.type === 'expense'}
              onChange={handleChange}
            />
            Expense
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="radio"
              name="type"
              value="income"
              checked={formData.type === 'income'}
              onChange={handleChange}
            />
            Income
          </label>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="category">Category *</label>
        <select
          className="form-control"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          className="form-control"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes</label>
        <textarea
          className="form-control"
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Add any additional notes here"
          rows="3"
        ></textarea>
      </div>

      <button 
        type="submit" 
        className="btn btn-primary" 
        style={{ width: '100%' }}
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'Save Transaction'}
      </button>
    </form>
  );
};

export default TransactionForm; 