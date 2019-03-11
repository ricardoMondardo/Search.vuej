'use strict';

const handleErrors = function (response) {
  if(!response.ok) {
    throw Error(response.status)
  }
  return response
}

const getData = function(url = '', token) {

  const obj = new Promise(
    function(resolve, reject) {

      fetch(url, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(handleErrors)
      .then((res) => {
        return resolve(res.json())
      })
      .catch((error) => {
        reject(error)
      })

    }
  )

  return obj

}

export { getData }
