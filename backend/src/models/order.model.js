import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User collection
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product collection
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity must be at least 1'], // Ensure quantity is at least 1
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    min: [0, 'Total price must be at least 0'], // Ensure totalPrice is non-negative
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'canceled'], // Allowed values for status
    default: 'pending', // Default status
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create and export the Order model
export const Order = mongoose.model('Order', orderSchema);
