import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TwitterIcon from '@mui/icons-material/Twitter';
import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className='bodys'>
      <div className='contactUs' style={{ height: 'fitContent' }}>
        <div className='title'>
          <h2 style={{ padding: '10px 40px' }}>CONTACT US</h2>
        </div>
        <div className='box' style={{ padding: '8px', display: 'flex', width: '99%' }}>
          <div className='contact form' style={{ width: '70%', marginTop: '2%' }}>
            <h3 style={{ margin: '1em 2em' }}>Send a Message</h3>
            <form>
              <div className='formBox'>
                <div className='row50'>
                  <div style={{ display: 'flex', padding: '1em' }}>
                    <div className='inputBox'>
                      <span>First Name</span>
                      <input type='text' placeholder='Mohamed' />
                    </div>
                    <div className='inputBox'>
                      <span>Last Name</span>
                      <input type='text' placeholder='Rasheth' />
                    </div>
                  </div>
                  <div style={{ display: 'flex', padding: '1em' }}>
                    <div className='inputBox'>
                      <span>Email</span>
                      <input type='text' placeholder='rasheth@valorpaytech.com' />
                    </div>
                    <div className='inputBox'>
                      <span>Mobile</span>
                      <input type='text' placeholder='+91 987 654 3210' />
                    </div>
                  </div>
                  <div className='row100'>
                    <div className='inputBox'>
                      <span style={{ padding: '0em 1em' }}>Message</span>
                      <textarea placeholder='Write your message here....' style={{ width: '93%', margin: '10px ' }}></textarea>
                    </div>
                  </div>
                  <div className='row100' style={{ width: '100%' }}>
                    <div className='inputBox' style={{ display: 'flex', alignItems: 'center', padding: '1em 0em ' }}>
                      <input type='submit' value='SEND' />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div style={{ width: '30%', marginTop: '2%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0em 1em 2em 0em' }}>
            <div className='contact info' style={{ height: '47.5%' }}>
              <h3 style={{ padding: '1em' }}>CONTACT INFO</h3>
              <div className='infoBox' style={{ padding: '0em 0em 0em 1em ' }}>
                <div style={{ paddingBottom: '10px' }}>
                  <span>
                    <LocationOnIcon />
                  </span>
                  <p>
                    Chennai, TamilNadu <br />
                    INDIA
                  </p>
                </div>
                <div style={{ paddingBottom: '10px' }}>
                  <span>
                    <EmailIcon />
                  </span>
                  <a href='mailto:rasheth@valorpaytech.com'>rasheth@valorpaytech.com</a>
                </div>
                <div style={{ paddingBottom: '10px' }}>
                  <span>
                    <CallIcon />
                  </span>
                  <a href='mailto:+919876543210'>+91 987 654 3210</a>
                </div>
                <ul className='sci'>
                  <li>
                    <a href='https://www.facebook.com/'>
                      <FacebookOutlinedIcon />
                    </a>
                  </li>
                  <li>
                    <a href='https://twitter.com/i/flow/login'>
                      <TwitterIcon />
                    </a>
                  </li>
                  <li>
                    <a href='https://www.instagram.com/?hl=en'>
                      <InstagramIcon />
                    </a>
                  </li>
                  <li>
                    <a href='https://www.linkedin.com/login'>
                      <LinkedInIcon />
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className='contact map' style={{ height: '47.5%' }}>
              <iframe title='MyTracker' src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.3544846557106!2d80.19841801529348!3d13.013083617486533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267b22066b205%3A0x4ef4e2585f8109f2!2sValor%20PayTech!5e0!3m2!1sen!2sin!4v1651204492626!5m2!1sen!2sin' style={{ border: '0' }} allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
