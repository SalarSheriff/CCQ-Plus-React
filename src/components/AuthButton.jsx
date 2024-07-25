import React from 'react';
import { useMsal } from "@azure/msal-react";

function AuthButton() {
  const { instance, accounts } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect()
      .then(response => {
        console.log('Login successful:', response);
      })
      .catch(e => {
        console.error('Login error:', e);
      });
  };

  const handleLogout = () => {
    instance.logoutRedirect()
      .then(response => {
        console.log('Logout successful:', response);
      })
      .catch(e => {
        console.error('Logout error:', e);
      });
  };

  return (
    <>
      {accounts.length > 0 ? (
        <div>
          <p>Welcome, {accounts[0].name}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </>
  );
}

export default AuthButton;
