import axios from 'axios';

const API_URL = '/api/transactions';

// Get all transactions
export const getTransactions = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch transactions' };
  }
};

// Get transaction by id
export const getTransactionById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch transaction' };
  }
};

// Add new transaction
export const addTransaction = async (transaction) => {
  try {
    const response = await axios.post(API_URL, transaction);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to add transaction' };
  }
};

// Update transaction
export const updateTransaction = async (id, transaction) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, transaction);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to update transaction' };
  }
};

// Delete transaction
export const deleteTransaction = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to delete transaction' };
  }
}; 