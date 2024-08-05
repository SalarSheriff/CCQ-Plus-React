//instance and accounts have to be passed as parameters and cannot be used here because they are react hooks




//Base function to send authentication to server
async function callNode(instance, accounts) {

    
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


async function uploadLog(instance, accounts, action, company) {

    
    const request = {
      scopes: ["User.Read"],
      account: accounts[0]
    };
    const response = await instance.acquireTokenSilent(request);

    const nodeCall = await fetch('http://localhost:4000/api/uploadLog', {
      method: 'POST',
      headers: {
        'Authorization': `${response.accessToken}`,
        'Content-Type': 'application/json'
      },

      //Date stuff is done on the backend
      body: JSON.stringify({
        company: company,
        message: "User " + accounts[0].username + " " + action +  " the CCQ",
        name: accounts[0].name, //This will be verified through token, but use this for now when tokens aren't being used
        action: action

      })
    });




  }

  export { callNode, uploadLog };
