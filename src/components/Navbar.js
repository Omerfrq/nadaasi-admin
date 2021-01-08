import React, { useState } from 'react';

import { NavItem, NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import Toggle from 'react-toggle';
import FeatherIcon from 'feather-icons-react';

const Appbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const isLoggedIn = localStorage.getItem('loggedIn');

  return (
    <div className='h-100vh'>
      {isLoggedIn ? (
        <ProSidebar collapsed={isOpen}>
          <Menu>
            <div className='ml-3'>
              <Toggle
                id='navbar'
                defaultChecked={!isOpen}
                onChange={() => {
                  setIsOpen(!isOpen);
                }}
              />
            </div>

            <MenuItem>
              <NavLink
                exact={true}
                activeClassName='text-dark font-weight-bold '
                tag={RRNavLink}
                to='/coupons'
              >
                {/* <img
                  className='ml-2'
                  src={Logo}
                  alt='Nadaasi Logo'
                  width='90px'
                />{' '} */}
                <span className='font-weight-bold text-white mr-2'>
                  BDI Invest
                </span>
                <span className='text-white ml-1'>Admin</span>
              </NavLink>
            </MenuItem>
            <MenuItem icon={<FeatherIcon icon='activity' />}>
              {' '}
              <NavLink
                exact={true}
                activeClassName='text-light font-weight-bold '
                tag={RRNavLink}
                to='/dashboard'
              >
                Dashboard
              </NavLink>
            </MenuItem>
            <MenuItem icon={<FeatherIcon icon='users' />}>
              {' '}
              <NavLink
                exact={true}
                activeClassName='text-light font-weight-bold '
                tag={RRNavLink}
                to='/users'
              >
                Users
              </NavLink>
            </MenuItem>
            <MenuItem icon={<FeatherIcon icon='activity' />}>
              {' '}
              <NavLink
                exact={true}
                activeClassName='text-light font-weight-bold '
                tag={RRNavLink}
                to='/projects'
              >
                Projects
              </NavLink>
            </MenuItem>
            {/* <SubMenu title='Categories' icon={<FeatherIcon icon='gift' />}>
              <MenuItem>
                {' '}
                <NavLink
                  exact={true}
                  activeClassName='text-light font-weight-bold '
                  tag={RRNavLink}
                  to='/categories'
                >
                  Categories
                </NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink
                  exact={true}
                  activeClassName='text-light font-weight-bold '
                  tag={RRNavLink}
                  to='/add-category'
                >
                  Add Category
                </NavLink>
              </MenuItem>
            </SubMenu> */}
            {/* <SubMenu title='Coupons' icon={<FeatherIcon icon='gift' />}>
              <MenuItem>
                {' '}
                <NavLink
                  exact={true}
                  activeClassName='text-light font-weight-bold '
                  tag={RRNavLink}
                  to='/coupons'
                >
                  Coupons
                </NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink
                  exact={true}
                  activeClassName='text-light font-weight-bold '
                  tag={RRNavLink}
                  to='/add-coupon'
                >
                  Add Coupons
                </NavLink>
              </MenuItem>
            </SubMenu> */}
            {/* <SubMenu title='Products' icon={<FeatherIcon icon='package' />}>
              <MenuItem>
                <NavLink
                  exact={true}
                  activeClassName='text-light font-weight-bold '
                  tag={RRNavLink}
                  to='/upload-product'
                >
                  Add Product
                </NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink
                  exact={true}
                  activeClassName='text-light font-weight-bold '
                  tag={RRNavLink}
                  to='/products'
                >
                  Products
                </NavLink>
              </MenuItem>
            </SubMenu> */}
            <MenuItem icon={<FeatherIcon icon='truck' />}>
              <NavLink
                exact={true}
                activeClassName='text-light font-weight-bold '
                tag={RRNavLink}
                to='/request/contractor'
              >
                Contractor Requests
              </NavLink>
            </MenuItem>
            <MenuItem icon={<FeatherIcon icon='clipboard' />}>
              <NavLink
                exact={true}
                activeClassName='text-light font-weight-bold '
                tag={RRNavLink}
                to='/messages'
              >
                Messages
              </NavLink>
            </MenuItem>
            <MenuItem icon={<FeatherIcon icon='log-out' />}>
              <NavItem>
                <NavLink
                  onClick={() => {
                    localStorage.clear();
                    history.push('/');
                  }}
                  exact={true}
                >
                  Log out
                </NavLink>
              </NavItem>
            </MenuItem>
          </Menu>
        </ProSidebar>
      ) : (
        ''
      )}
    </div>
  );
};

export default Appbar;
