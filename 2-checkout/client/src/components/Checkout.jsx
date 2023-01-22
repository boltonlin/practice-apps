import React, { useState, useEffect } from 'react';

const Checkout = ({
  soliciter,
  done
}) => {

  const EMPTY_SHIPPING = {
    type: 'shipping',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
    phone: ''
  }

  const EMPTY_PAYMENT = {
    creditcard: '',
    expirydate: '',
    cvv: '',
    zipcode: ''
  }

  const [tracker, setTracker] = useState('login');
  const [shippingAdd, setShippingAdd] = useState(EMPTY_SHIPPING);
  const [paymentInfo, setPaymentInfo] = useState(EMPTY_PAYMENT);

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value
    });
  }

  const loginPage = () => {

  }

  const signupPage = () => {

  }

  useEffect(() => {

  }, [tracker]);

  switch (tracker) {
    case 'shipping':
      return loginPage();
      break;
    case 'payment':
      return signupPage();
      break;
    case 'summary':
      return summaryPage();
      break;
    default:
      return null;
  }
}

export default Checkout;