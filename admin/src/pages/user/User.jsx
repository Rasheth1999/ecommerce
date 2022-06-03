import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PublishIcon from '@mui/icons-material/Publish';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './user.css';

export default function User() {
  const location = useLocation();
  const [user, setUser] = useState();

  useEffect(() => {
    const path = location.pathname.split('/')[2];
    axios
      .get('http://localhost:3001/api/getSingleUser/' + path)
      .then(res => {
        setUser(res.data.data);
      })
      .catch(err => {
        return err;
      });
  }, [location.pathname]);

  return (
    <div className='user'>
      <div className='userTitleContainer'>
        <h1 className='userTitle'>EDIT USER</h1>
        <Link to='/newUser'>
          <button className='userAddButton'>ADD NEW USER</button>
        </Link>
      </div>

      {user != null ? (
        user.map((users, i) => {
          const createdDate = users.created_at != null ? users.created_at.split('T')[0].split('-').reverse().join('-') : users.created_at;
          return (
            <div className='userContainer' key={users.id}>
              <div className='userShow'>
                <div className='userShowTop'>
                  <img src='https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' alt='' className='userShowImg' />
                  <div className='userShowTopTitle'>
                    <span className='userShowUsername'>
                      {users.first_name} {users.last_name}
                    </span>
                  </div>
                </div>
                <div className='userShowBottom'>
                  <span className='userShowTitle'>Account Details</span>
                  <div className='userShowInfo'>
                    <PermIdentityIcon className='userShowIcon' />
                    <span className='userShowInfoTitle'>{users.user_name}</span>
                  </div>
                  <div className='userShowInfo'>
                    <CalendarTodayIcon className='userShowIcon' />
                    <span className='userShowInfoTitle'>{createdDate}</span>
                  </div>
                  <span className='userShowTitle'>Contact Details</span>
                  <div className='userShowInfo'>
                    <PhoneAndroidIcon className='userShowIcon' />
                    <span className='userShowInfoTitle'>+1 123 456 67</span>
                  </div>
                  <div className='userShowInfo'>
                    <MailOutlineIcon className='userShowIcon' />
                    <span className='userShowInfoTitle'>{users.email}</span>
                  </div>
                  <div className='userShowInfo'>
                    <LocationSearchingIcon className='userShowIcon' />
                    <span className='userShowInfoTitle'>New York | USA</span>
                  </div>
                </div>
              </div>
              <div className='userUpdate'>
                <span className='userUpdateTitle'>EDIT</span>
                <form className='userUpdateForm'>
                  <div className='userUpdateLeft'>
                    <div className='userUpdateItem'>
                      <label>Username</label>
                      <input type='text' className='userUpdateInput' value={users.user_name} />
                    </div>
                    <div className='userUpdateItem'>
                      <label>First Name</label>
                      <input type='text' className='userUpdateInput' value={users.first_name} />
                    </div>
                    <div className='userUpdateItem'>
                      <label>Last Name</label>
                      <input type='text' className='userUpdateInput' value={users.last_name} />
                    </div>
                    <div className='userUpdateItem'>
                      <label>Email</label>
                      <input type='email' className='userUpdateInput' value={users.email} />
                    </div>
                    <button className='userUpdateButton'>UPDATE</button>
                  </div>
                </form>
              </div>
            </div>
          );
        })
      ) : (
        <div className='userContainer'>
          <div className='userShow'>
            <div className='userShowTop'>
              <img src='https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' alt='' className='userShowImg' />
              <div className='userShowTopTitle'>
                <span className='userShowUsername'>Anna Becker</span>
                <span className='userShowUserTitle'>Software Engineer</span>
              </div>
            </div>
            <div className='userShowBottom'>
              <span className='userShowTitle'>Account Details</span>
              <div className='userShowInfo'>
                <PermIdentityIcon className='userShowIcon' />
                <span className='userShowInfoTitle'>annabeck99</span>
              </div>
              <div className='userShowInfo'>
                <CalendarTodayIcon className='userShowIcon' />
                <span className='userShowInfoTitle'>10.12.1999</span>
              </div>
              <span className='userShowTitle'>Contact Details</span>
              <div className='userShowInfo'>
                <PhoneAndroidIcon className='userShowIcon' />
                <span className='userShowInfoTitle'>+1 123 456 67</span>
              </div>
              <div className='userShowInfo'>
                <MailOutlineIcon className='userShowIcon' />
                <span className='userShowInfoTitle'>annabeck99@gmail.com</span>
              </div>
              <div className='userShowInfo'>
                <LocationSearchingIcon className='userShowIcon' />
                <span className='userShowInfoTitle'>New York | USA</span>
              </div>
            </div>
          </div>
          <div className='userUpdate'>
            <span className='userUpdateTitle'>Edit</span>
            <form className='userUpdateForm'>
              <div className='userUpdateLeft'>
                <div className='userUpdateItem'>
                  <label>Username</label>
                  <input type='text' placeholder='annabeck99' className='userUpdateInput' />
                </div>
                <div className='userUpdateItem'>
                  <label>Full Name</label>
                  <input type='text' placeholder='Anna Becker' className='userUpdateInput' />
                </div>
                <div className='userUpdateItem'>
                  <label>Email</label>
                  <input type='text' placeholder='annabeck99@gmail.com' className='userUpdateInput' />
                </div>
                <div className='userUpdateItem'>
                  <label>Phone</label>
                  <input type='text' placeholder='+1 123 456 67' className='userUpdateInput' />
                </div>
                <div className='userUpdateItem'>
                  <label>Address</label>
                  <input type='text' placeholder='New York | USA' className='userUpdateInput' />
                </div>
              </div>
              <div className='userUpdateRight'>
                <div className='userUpdateUpload'>
                  <img className='userUpdateImg' src='https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' alt='' />
                  <label htmlFor='file'>
                    <PublishIcon className='userUpdateIcon' />
                  </label>
                  <input type='file' id='file' style={{ display: 'none' }} />
                </div>
                <button className='userUpdateButton'>Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
