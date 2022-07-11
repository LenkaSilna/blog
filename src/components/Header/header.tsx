import { Button } from '@mui/material';
import React, { ReactElement, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../context/login';

const Header = (): ReactElement => {
  const loginContext = useContext(LoginContext);
  console.log(loginContext?.signedIn);

  return (
    <header>
      <ul>
        <Link to="/">
          <img src="images/logo.png" alt="logo blog" width={39} height={44} />
        </Link>
        <li>
          <Link to="/">Recent Articles</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        {loginContext?.signedIn ? (
          <>
            <li>
              <Link to="/admin-my-articles">My Articles</Link>
            </li>
            <li>
              <Link to="/admin-new-article">Create Article</Link>
            </li>
            <li>
              <Link to="/">
                <Button onClick={loginContext.logout}>Lougout</Button>
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </header>
  );
};
export default Header;
