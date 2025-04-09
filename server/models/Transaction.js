import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
      maxLength: [100, 'Title cannot be more than 100 characters']
    },
    amount: {
      type: Number,
      required: [true, 'Please add a positive or negative amount']
    },
    type: {
      type: String,
      required: [true, 'Please specify transaction type'],
      enum: ['expense', 'income'],
      default: 'expense'
    },
    category: {
      type: String,
      required: [true, 'Please specify a category'],
      trim: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    notes: {
      type: String,
      trim: true,
      maxLength: [500, 'Notes cannot be more than 500 characters']
    }
  },
  { timestamps: true }
);

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction; 