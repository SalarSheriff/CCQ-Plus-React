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
    

      //Gets the latest logs for each company so that the company selector can display the latest log for each company
      async function getLastLogForEachCompany() {
        //Get the authentication token
        const request = {
            scopes: ["User.Read"],
            account: accounts[0]
          };
          const response = await instance.acquireTokenSilent(request);
          
          const nodeCall = await fetch('http://localhost:4000/api/getLastLogForEachCompany', {
            headers: {
                "Authorization": `${response.accessToken}`// Bearer prefix is added server side
            }
          });

            const data = await nodeCall.json();
            return data;

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
                                <CCQPlusAppBar/>
                                    <CompanySelectorPage getLastLogForEachCompany={getLastLogForEachCompany} accountName={accounts[0].name} accountEmail={accounts[0].username}/>
                                    <SignOutButton />
                                </AuthenticatedTemplate>

                                <UnauthenticatedTemplate>
                                    <SignInPage />
                                </UnauthenticatedTemplate>
                            </Box>
                        </>

                    } />


                </Routes>
            </Router>





        </>
    );
}
