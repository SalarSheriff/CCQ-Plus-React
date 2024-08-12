import React, { useState } from 'react';

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { SignInButton } from './components/SignInButton';
import { SignOutButton } from './components/SignOutButton';
import SignInPage from './components/SignInPage';
import '../src/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import CompanySelectorPage from './components/CompanySelectorPage';
import CCQPlusAppBar from './components/CCQPlusAppBar';
import CCQPage from './components/CCQPage';
export default function App() {

  const { instance, accounts } = useMsal();


  //Base function to send authentication to server
  async function callNode() {
    const request = {
      scopes: ["User.Read"],
      account: accounts[0]
    };
    const response = await instance.acquireTokenSilent(request);

    //console.log(response.accessToken)

    const nodeCall = await fetch('http://localhost:4000/api/protected', {
      headers: {
        'Authorization': `${response.accessToken}`
      }
    });

  }





  return (
    <>
      <Router>

        <Routes>

          <Route path="/" element={
            <>


              <Box sx={{
                width: '100%',
                height: '100vh',

                overflow: 'hidden', // Disable scrolling
                display: 'flex',
                flexDirection: 'column',
              }}>

                <AuthenticatedTemplate>
                  <CCQPlusAppBar />

                  <CompanySelectorPage /> 
                 
                </AuthenticatedTemplate>

                <UnauthenticatedTemplate>
                  <SignInPage />
                </UnauthenticatedTemplate>
              </Box>
            </>

          } />
          <Route path='/ccq/:companyName' element={

            <>
              <Box sx={{
                width: '100%',
                height: '100vh',

                overflow: 'hidden', // Disable scrolling
                display: 'flex',
                flexDirection: 'column',
              }}>
              <AuthenticatedTemplate>
                <CCQPlusAppBar />
               <CCQPage/>
              </AuthenticatedTemplate>
              <UnauthenticatedTemplate>

You are not signed in to CCQ Plus. Please go to / to sign in.
                
              </UnauthenticatedTemplate>
              </Box>

            </>
          } />



        </Routes>
      </Router>





    </>
  );
}
