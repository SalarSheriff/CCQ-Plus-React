//instance and accounts have to be passed as parameters and cannot be used here because they are react hooks

//How often data is called from the backend
let dataFetchRate = import.meta.env.VITE_DATA_FETCH_RATE

let apiEndpoint =   import.meta.env.VITE_API_ENDPOINT// 'http://localhost:4000/api/' //container instance ip:port

//Data used to generate backenddata
const regiments = [
  {
      id: 1,
      name: '1st Regiment',
      motto: 'First and Proud',
      companies: [
          {
              id: 1,
              name: 'A1',
              mascot: "Assassins",
              slogan: "A1 SLOGAN!"
          },
          {
              id: 2,
              name: 'B1',
              mascot: "Barbarians",
              slogan: "B1 SLOGAN!"
          },
          {
              id: 3,
              name: 'C1',
              mascot: "Celts",
              slogan: "C1 SLOGAN!"
          },
          {
              id: 4,
              name: 'D1',
              mascot: "Ducks",
              slogan: "D1 SLOGAN!"
          },
          {
              id: 5,
              name: 'E1',
              mascot: "Vikings",
              slogan: "E1 SLOGAN!"
          },
          {
              id: 6,
              name: 'F1',
              mascot: "Firehouse",
              slogan: "F1 SLOGAN!"
          },
          {
              id: 7,
              name: 'G1',
              mascot: "Greeks",
              slogan: "G1 SLOGAN!"
          }, {
              id: 8,
              name: 'H1',
              mascot: "Hogs",
              slogan: "H1 SLOGAN!"
          }, {
              id: 9,
              name: 'I1',
              mascot: "Iron Horses",
              slogan: "Rum Em Down!"
          }
      ]
  }
]



//Base function to send authentication to server
async function callNode(instance, accounts) {

    
    const request = {
      scopes: ["User.Read"],
      account: accounts[0]
    };
    const response = await instance.acquireTokenSilent(request);

    //console.log(response.accessToken)

    const nodeCall = await fetch( apiEndpoint + 'protected', {
      headers: {
        'Authorization': `${response.accessToken}`
      }
    });

  }
  //Gets the latest logs for each company so that the company selector can display the latest log for each company
  async function getLastLogForEachCompany(instance, accounts) {
    //Get the authentication token
    const request = {
      scopes: ["User.Read"],
      account: accounts[0]
    };
    const response = await instance.acquireTokenSilent(request);

    const nodeCall = await fetch( apiEndpoint+'getLastLogForEachCompany', {
      headers: {
        "Authorization": `${response.accessToken}`// Bearer prefix is added server side
      }
    });

    const data = await nodeCall.json();
    return data;

  }


async function uploadLog(instance, accounts, action, company) {

    
    const request = {
      scopes: ["User.Read"],
      account: accounts[0]
    };
    const response = await instance.acquireTokenSilent(request);

    const nodeCall = await fetch(apiEndpoint+'uploadLog', {
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

  async function uploadPresencePatrol(instance, accounts, action, company, patrolTime, patrolComments) {

    
    const request = {
      scopes: ["User.Read"],
      account: accounts[0]
    };
    const response = await instance.acquireTokenSilent(request);

    const nodeCall = await fetch(apiEndpoint + 'uploadPresencePatrol', {
      method: 'POST',
      headers: {
        'Authorization': `${response.accessToken}`,
        'Content-Type': 'application/json'
      },

      //Date stuff is done on the backend
      body: JSON.stringify({
        company: company,
        message: "User " + accounts[0].username + " inspected the AO. Comments: " + patrolComments,
        name: accounts[0].name, //This will be verified through token, but use this for now when tokens aren't being used
        action: action,
        patrolTime: patrolTime,
        

      })
    });




  }



  async function uploadSpecialMessage(instance, accounts, action, company, specialMessageComments) {

    
    const request = {
      scopes: ["User.Read"],
      account: accounts[0]
    };
    const response = await instance.acquireTokenSilent(request);

    const nodeCall = await fetch(apiEndpoint + 'uploadLog', {
      method: 'POST',
      headers: {
        'Authorization': `${response.accessToken}`,
        'Content-Type': 'application/json'
      },

      //Date stuff is done on the backend
      body: JSON.stringify({
        company: company,
        message: specialMessageComments,
        name: accounts[0].name, //This will be verified through token, but use this for now when tokens aren't being used
        action: "special message",
        specialMessageComments: specialMessageComments

      })
    });

  }
  async function getLogs(instance, accounts, company) {

      
      const request = {
        scopes: ["User.Read"],
        account: accounts[0]
      };
      const response = await instance.acquireTokenSilent(request);
  
      const nodeCall = await fetch(apiEndpoint + 'getLogs/'+company, {
        headers: {
          "Authorization": `${response.accessToken}`// Bearer prefix is added server side
        }
      });
  
      const data = await nodeCall.json();
      return data;
  }
async function getLogsInRange(instance, accounts, company, date1, date2) {

 
      const request = {
        scopes: ["User.Read"],
        account: accounts[0]
      };
      const response = await instance.acquireTokenSilent(request);
  
      const nodeCall = await fetch(apiEndpoint + 'getLogsInRange/'+company+'/'+date1+'/'+date2, {
        headers: {
          "Authorization": `${response.accessToken}`// Bearer prefix is added server side
        }
      });
  
      const data = await nodeCall.json().catch((error) => { console.log(error)});
      return data;
}
async function validateAdmin(instance, accounts) {

      
      const request = {
        scopes: ["User.Read"],
        account: accounts[0]
      };
      const response = await instance.acquireTokenSilent(request);
  
      const nodeCall = await fetch(apiEndpoint + 'validateAdmin', {
        headers: {
          "Authorization": `${response.accessToken}`// Bearer prefix is added server side
          ,"email": accounts[0].username
        }
      });
  
      const data = await nodeCall.json();
      return data;
  
    
}



  export { callNode, uploadLog, getLogs, getLastLogForEachCompany, uploadPresencePatrol, getLogsInRange, uploadSpecialMessage, validateAdmin, regiments, dataFetchRate };
