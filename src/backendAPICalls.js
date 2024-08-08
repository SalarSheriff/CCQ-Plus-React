//instance and accounts have to be passed as parameters and cannot be used here because they are react hooks

//How often data is called from the backend
let dataFetchRate = 2000

let apiEndpoint =   'http://20.102.35.245:4000/api/'   //'http://localhost:4000/api/'


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
        message: "User " + accounts[0].username + " performed a presence patrol for " + (patrolTime/60) + " minutes\n" + "Comments: " + patrolComments,
        name: accounts[0].name, //This will be verified through token, but use this for now when tokens aren't being used
        action: action,
        patrolTime: patrolTime,
        

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
  
      const data = await nodeCall.json();
      return data;
}


  export { callNode, uploadLog, getLogs, getLastLogForEachCompany, uploadPresencePatrol, getLogsInRange, dataFetchRate };
