import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import LineStyleIcon from '@mui/icons-material/LineStyle';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ReportIcon from '@mui/icons-material/Report';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import StoreIcon from '@mui/icons-material/Store';
import TimelineIcon from '@mui/icons-material/Timeline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebarWrapper'>
        <div className='sidebarMenu'>
          <h3 className='sidebarTitle'>Dashboard</h3>
          <ul className='sidebarList'>
            <Link to='/' className='link'>
              <li className='sidebarListItem active' title='Home'>
                <LineStyleIcon className='sidebarIcon' />
                Home
              </li>
            </Link>
            <li className='sidebarListItem' title='Analytics'>
              <TimelineIcon className='sidebarIcon' />
              Analytics
            </li>
            <li className='sidebarListItem' title='Sales'>
              <TrendingUpIcon className='sidebarIcon' />
              Sales
            </li>
          </ul>
        </div>
        <div className='sidebarMenu'>
          <h3 className='sidebarTitle'>Quick Menu</h3>
          <ul className='sidebarList'>
            <Link to='/users' className='link'>
              <li className='sidebarListItem' title='Users'>
                <PermIdentityIcon className='sidebarIcon' />
                Users
              </li>
            </Link>
            <Link to='/products' className='link'>
              <li className='sidebarListItem' title='Products'>
                <StoreIcon className='sidebarIcon' />
                Products
              </li>
            </Link>
            <Link to='orderList' className='link'>
              <li className='sidebarListItem' title='Orders'>
                <ShoppingBagOutlinedIcon className='sidebarIcon' />
                Orders
              </li>
            </Link>
            <Link to='/payment' className='link'>
              <li className='sidebarListItem' title='Transactions'>
                <AttachMoneyIcon className='sidebarIcon' />
                Transactions
              </li>
            </Link>
          </ul>
        </div>
        <div className='sidebarMenu'>
          <h3 className='sidebarTitle'>Notifications</h3>
          <ul className='sidebarList'>
            <li className='sidebarListItem' title='Mail'>
              <MailOutlineIcon className='sidebarIcon' />
              Mail
            </li>
            <Link to='/feedBack' className='link'>
              <li className='sidebarListItem' title='Feedback'>
                <DynamicFeedIcon className='sidebarIcon' />
                Feedback
              </li>
            </Link>
            <Link to='/contact' className='link'>
              <li className='sidebarListItem' title='Contact Us'>
                <ChatBubbleOutlineIcon className='sidebarIcon' />
                Contact Us
              </li>
            </Link>
          </ul>
        </div>
        <div className='sidebarMenu'>
          <h3 className='sidebarTitle'>Staff</h3>
          <ul className='sidebarList'>
            <li className='sidebarListItem' title='Manage'>
              <WorkOutlineIcon className='sidebarIcon' />
              Manage
            </li>
            <li className='sidebarListItem' title='Analytics'>
              <TimelineIcon className='sidebarIcon' />
              Analytics
            </li>
            <li className='sidebarListItem' title='Reports'>
              <ReportIcon className='sidebarIcon' />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
