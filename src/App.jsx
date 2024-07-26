import React, { useState } from 'react';

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { SignInButton } from './components/SignInButton';
import { SignOutButton } from './components/SignOutButton';
import SignInPage from './components/SignInPage';
import '../src/App.css'

export default function App() {

  const { instance, accounts } = useMsal();
    

    return (
        <>
<SignInPage />

        <AuthenticatedTemplate>
                <h1>Signed in!</h1>
                <SignOutButton />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <h1>Please Sign In</h1>
                <SignInButton />
            </UnauthenticatedTemplate>
        
        
        </>
    );
}
