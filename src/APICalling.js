async function callNode() {
    const request = {
      scopes: ["User.Read"],
      account: accounts[0]
    };
    const response = await instance.acquireTokenSilent(request);

    console.log(response.accessToken)

    const nodeCall = await fetch('http://localhost:3000/api/protected', {
      headers: {
        'Authorization': `${response.accessToken}`
      }
    });

  }