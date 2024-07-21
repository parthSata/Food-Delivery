import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../pages/user/checkout/CheckOutPage';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51PVmy0GkQKWIkWzyiewG5kaejC93EnGmocXAxU9S7TFQmepAwO78FJXorkiorirMwhHsg22nyJ7wivwK3gCzDgjz00axihnECg');

export default function App() {
    const options = {
        // passing the client secret obtained from the server
        clientSecret: `{{$pk_test_51PVmy0GkQKWIkWzyiewG5kaejC93EnGmocXAxU9S7TFQmepAwO78FJXorkiorirMwhHsg22nyJ7wivwK3gCzDgjz00axihnECg}}`,
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
        </Elements>
    );
};