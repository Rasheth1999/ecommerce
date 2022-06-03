import LanguageIcon from '@mui/icons-material/Language';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsIcon from '@mui/icons-material/Settings';
import React from 'react';
import { Link } from 'react-router-dom';
import './topbar.css';

export default function Topbar() {
  return (
    <div className='topbar'>
      <div className='topbarWrapper'>
        <Link to='/' className='link'>
          <div className='topLeft'>
            <span className='logo' title='Admin Panel'>
              ADMIN PANEL
            </span>
          </div>
        </Link>
        <div className='topRight'>
          <div className='topbarIconContainer'>
            <NotificationsNoneIcon />
            <span className='topIconBadge'>2</span>
          </div>
          <div className='topbarIconContainer'>
            <LanguageIcon />
            <span className='topIconBadge'>2</span>
          </div>
          <div className='topbarIconContainer'>
            <SettingsIcon />
          </div>
          <img src='https://www.teahub.io/photos/full/85-857581_the-amazing-spider-man-2014-ipad-air-wallpaper.jpg' alt='' className='topAvatar' />
        </div>
      </div>
    </div>
  );
}
