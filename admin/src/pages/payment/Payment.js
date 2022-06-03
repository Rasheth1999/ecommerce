import React from 'react';
import './Payment.css';

const Payment = () => {
  return (
    <div className='bodyss'>
      <h1 style={{ position: 'absolute', top: '3.5em', left: '10.5em' }}>TRANSACTIONS</h1>
      <div className='containers'>
        <form action=''>
          <div className='rows'>
            <div className='cols'>
              <h3 className='titles'>BILLING ADDRESS</h3>
              <div className='inputBoxs'>
                <span>Full Name :</span>
                <input type='text' placeholder='Mohamed Rasheth' />
              </div>
              <div className='inputBoxs'>
                <span>Email :</span>
                <input type='email' placeholder='rasheth@valorpaytech.com' />
              </div>
              <div className='inputBoxs'>
                <span>Address :</span>
                <input type='text' placeholder='room - street - locality' />
              </div>
              <div className='inputBoxs'>
                <span>City :</span>
                <input type='text' placeholder='Chennai' />
              </div>

              <div className='flex'>
                <div className='inputBoxs'>
                  <span>State :</span>
                  <input type='text' placeholder='Tamil Nadu' />
                </div>
                <div className='inputBoxs'>
                  <span>Zip Code :</span>
                  <input type='number' min='1' placeholder='600 002' />
                </div>
              </div>
            </div>

            <div className='cols'>
              <h3 className='titles'>PAYMENT</h3>
              <div className='inputBoxs'>
                <span>Card Accepted :</span>
                <img src='https://i.ibb.co/Qfvn4z6/payment.png' alt='' />
              </div>
              <div className='inputBoxs'>
                <span>Name of Card Holder :</span>
                <input type='text' placeholder='Mr. Mohamed Rasheth' />
              </div>
              <div className='inputBoxs'>
                <span>Credit Card Number :</span>
                <input type='number' placeholder='1111-2222-3333-4444' />
              </div>
              <div className='inputBoxs'>
                <span>Exp Month :</span>
                <input type='text' placeholder='January' />
              </div>

              <div className='flex'>
                <div className='inputBoxs'>
                  <span>Exp Year :</span>
                  <input type='number' placeholder='2025' />
                </div>
                <div className='inputBoxs'>
                  <span>CVV :</span>
                  <input type='number' min='1' placeholder='1234' />
                </div>
              </div>
            </div>
          </div>
          <input type='submit' value='PROCEED TO CHECKOUT' className='submit-btn' />
        </form>
      </div>
    </div>
  );
};

export default Payment;
