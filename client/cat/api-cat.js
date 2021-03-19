const getcat = async (params,credentials, signal) => {
  //console.log("fetching a cat")
  try {
    let response = await fetch('/dogcat/cat/'+params.userId, {
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
    //console.log(err)
  }
}

const addCatClick = async (params, credentials) => {
  try {
    let response = await fetch('/dogcat/cat/' + params.userId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch(err) {
    //console.log(err)
  }
}

const addCatLikeClick = async (params, credentials) => {
  try {
    let response = await fetch('/dogcat/cat/like/' + params.userId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch(err) {
    //console.log(err)
  }
}

const removeCatLikeClick = async (params, credentials) => {
  try {
    let response = await fetch('/dogcat/cat/dislike/' + params.userId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch(err) {
    //console.log(err)
  }
}

  export {
    getcat,
    addCatClick,
    addCatLikeClick,
    removeCatLikeClick 
  }