import React, { useState, useEffect } from 'react';

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { SignInButton } from './components/SignInButton';
import { SignOutButton } from './components/SignOutButton';
import SignInPage from './components/SignInPage';
import SignInPageMobile from './components/SignInPageMobile';
import '../src/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import CompanySelectorPage from './components/CompanySelectorPage';
import CCQPlusAppBar from './components/CCQPlusAppBar';
import CCQPage from './components/CCQPage';
import AdminPage from './components/AdminPage';
import ImageViewPage from './components/ImageViewPage';
import UnauthorizedPage from './components/UnauthorizedPage';
import DAFormGenerator from './components/DAFormGenerator';
export default function App() {

  const { instance, accounts } = useMsal();


  //To adjust what login page is displayed based on screen size
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Assuming 768px as the mobile breakpoint

  //Handle updating isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

                <SignInPage/>
              </Box>
            </>

          } />
          <Route path='/companySelect' element={
            <>
            <CCQPlusAppBar />

            <CompanySelectorPage />
            </>
          }/>
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
                  <Box sx={{
                    overflow: 'auto',

                  }}>
                    <CCQPage />
                  </Box>

                </AuthenticatedTemplate>
                <UnauthenticatedTemplate>

                  You are not signed in to CCQ Plus. Please go to / to sign in.

                </UnauthenticatedTemplate>
              </Box>

            </>
          } />
          <Route path='/adminview' element={

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
                  <AdminPage />
                </AuthenticatedTemplate>
                <UnauthenticatedTemplate>

                  You are not signed in to CCQ Plus. Please go to / to sign in.

                </UnauthenticatedTemplate>
              </Box>

            </>
          } />


{/* For Admin View */}
          <Route path='/unauthorized' element={
            <>

              {/* Only display this if an account is signed in, else an error will occur trying to access email */}
              {accounts[0] && <> <Typography variant="h2">Unauthorized User</Typography>
                <Typography variant="h6">Your account: {accounts[0].username} is not authorized to view the admin logs. If you believe this is a mistake please contact: salar.sheriff@westpoint.edu</Typography>
              </>
              }
            </>


          } />

          {/* Unauthorized as in non West Point */}
          <Route path='/unauthorizeduser/' element={
            <>
              <UnauthorizedPage />
            </>


          } />
          <Route path='/imageview/' element={
            <>
              <CCQPlusAppBar />
              <ImageViewPage />
            </>


          } />
          <Route path='/daform/:preSelectedCompany?/:preSelectedDate?' element= {
            <>
          <DAFormGenerator/>
          </>
          }/>
          

          
          


        </Routes>
      </Router>





    </>
  );
}
