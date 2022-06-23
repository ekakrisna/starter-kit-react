import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { USER_CLEAR } from '../store/actions';

const Layout = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  const { user } = useSelector(
    (state) => ({
      user: state.user,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const links = [
    {
      path: '/home',
      label: 'Home',
    },
    {
      path: '/sample-redux',
      label: 'Sample Redux',
    },
    {
      path: '/sample-filter',
      label: 'Sample Filter',
    },
  ];

  const handleLogout = () => {
    dispatch({
      type: USER_CLEAR,
    });
    jsCookie.remove('accessToken');
  };

  return (
    <div>
      <div className="py-2 flex justify-center items-center w-full border-b border-gray-300 fixed top-0 left-0 h-[64px] bg-white z-30">
        <ul className="flex items-center h-full m-0 p-0">
          {links.map((linkItem, index) => {
            return (
              <li key={linkItem.path}>
                <Link
                  to={linkItem.path}
                  className={`hover:text-white hover:bg-indigo-500 p-3  ${
                    pathname.startsWith(linkItem.path)
                      ? 'bg-indigo-500 text-white'
                      : 'text-gray-900'
                  }`}
                >
                  {linkItem.label}
                </Link>
              </li>
            );
          })}
          {!user.accessToken ? (
            <li key="login">
              <Link to="/login" className="p-3">
                Login
              </Link>
            </li>
          ) : (
            <li key="logout">
              <span
                onClick={handleLogout}
                className="bg-red-500 p-3 text-white cursor-pointer"
              >
                Logout
              </span>
            </li>
          )}
        </ul>
      </div>
      <div className="max-w-screen-md px-4 mx-auto pt-[78px]">{children}</div>
    </div>
  );
};

export default Layout;
