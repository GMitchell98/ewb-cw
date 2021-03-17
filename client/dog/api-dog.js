const getdog = async (params,credentials, signal) => {
    console.log("fetching a dog")
    try {
      let response = await fetch('/dogcat/dog/'+params.userId, {
        method: 'GET',
        signal: signal,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
          }
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }

  const addDogClick = async (params, credentials) => {
    try {
      let response = await fetch('/dogcat/dog/' + params.userId, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }

  export {
    getdog,
    addDogClick 
  }