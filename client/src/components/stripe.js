import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_AdmmzxksWW0sRihhZQ1be1GP00mTMzxN3B');

export const bookTour = async (tourId) => {
  try {
    const session = await axios.get(
      `/api/v1/bookings/checkout-session/${tourId}`
    );
    const stripe = await stripePromise;

    stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
  }
};
