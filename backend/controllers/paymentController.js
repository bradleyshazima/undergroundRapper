import axios from 'axios';
import crypto from 'crypto';
import { supabase } from '../config/supabase.js';

/**
 * 1. Initialize Paystack Transaction
 */
export const initializePayment = async (req, res) => {
  try {
    const { email, productId } = req.body;

    const product = PRODUCTS[productId];
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Paystack expects amount in sub-units (e.g., KES cents = amount * 100)
    const amountInSubunits = product.price * 100;

    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email,
        amount: amountInSubunits,
        callback_url: `${process.env.FRONTEND_URL}/download`,
        metadata: {
          product_id: product.id,
          product_title: product.title,
          custom_fields: [
            { display_name: 'Product', variable_name: 'product', value: product.title }
          ]
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const { authorization_url, reference } = response.data.data;

    // Create a pending order record in Supabase
    const { error: dbError } = await supabase.from('orders').insert([
      {
        email,
        product_id: product.id,
        product_title: product.title,
        amount: product.price,
        paystack_reference: reference,
        status: 'pending'
      }
    ]);

    if (dbError) throw dbError;

    return res.status(200).json({ authorization_url, reference });
  } catch (error) {
    console.error('Payment initialization error:', error?.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to initialize payment' });
  }
};

/**
 * 2. Handle Paystack Webhook (Automated & Secure Fulfillment)
 */
export const handleWebhook = async (req, res) => {
  try {
    // Verify signature using Paystack Secret Key
    const hash = crypto
      .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (hash !== req.headers['x-paystack-signature']) {
      return res.status(401).send('Invalid signature');
    }

    const event = req.body;

    // Listen specifically for charge.success
    if (event.event === 'charge.success') {
      const { reference, status } = event.data;

      if (status === 'success') {
        // Update order status in Supabase
        const { error } = await supabase
          .from('orders')
          .update({ status: 'success' })
          .eq('paystack_reference', reference);

        if (error) {
          console.error('Failed to update order in Supabase:', error);
        }
      }
    }

    // Acknowledge receipt to Paystack
    return res.status(200).send('Webhook Received');
  } catch (error) {
    console.error('Webhook error:', error.message);
    return res.status(500).send('Webhook Processing Error');
  }
};

/**
 * 3. Manual Payment Verification Endpoint
 */
export const verifyPayment = async (req, res) => {
  const { reference } = req.params;

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
      }
    );

    const data = response.data.data;

    if (data.status === 'success') {
      await supabase
        .from('orders')
        .update({ status: 'success' })
        .eq('paystack_reference', reference);

      return res.status(200).json({ verified: true, data });
    }

    return res.status(400).json({ verified: false, message: 'Payment incomplete' });
  } catch (error) {
    console.error('Verification error:', error?.response?.data || error.message);
    return res.status(500).json({ error: 'Payment verification failed' });
  }
};