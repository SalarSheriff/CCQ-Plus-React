import React, { useState } from 'react';

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { SignInButton } from './components/SignInButton';
import { SignOutButton } from './components/SignOutButton';
import SignInPage from './components/SignInPage';
import '../src/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
export default function App() {

    const { instance, accounts } = useMsal();


    return (
        <>
            <Router>

                <Routes>

                    <Route path="/" element={
                        <>
                            <AuthenticatedTemplate>
                                <h1>Home Page/Company Selector</h1>
                                <SignOutButton />
                            </AuthenticatedTemplate>

                            <UnauthenticatedTemplate>
                                <SignInPage />
                            </UnauthenticatedTemplate>
                        </>

                    } />


                </Routes>
            </Router>





        </>
    );
}
