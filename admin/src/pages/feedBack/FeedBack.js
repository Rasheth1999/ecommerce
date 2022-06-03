import React from 'react';
import './FeedBack.css';

const FeedBack = () => {
  return (
    <div className='body'>
      <h1 style={{ position: 'absolute', top: '3.5em', left: '10.5em' }}>FEEDBACK</h1>
      <div className='contact-box'>
        <form className='form'>
          <div className='inputBoxs'>
            <input type='text' placeholder='Your Name' />
          </div>
          <div className='inputBoxs'>
            <input type='email' placeholder='Your Email' />
          </div>
          <div className='inputBoxs'>
            <input type='text' placeholder='your subject' />
          </div>
          <textarea type='text' className='input-field textarea-field' placeholder='Your Message'></textarea>
          <button type='button' className='btn'>
            SEND MESSAGE
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedBack;
