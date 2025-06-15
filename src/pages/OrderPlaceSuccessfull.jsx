import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { CheckCircle } from 'lucide-react';

const OrderPlaceSuccessfull = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
        <CheckCircle className="text-green-500 w-20 h-20 mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been confirmed.</p>
        <Link
          to="/"
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </Layout>
  );
};

export default OrderPlaceSuccessfull;
