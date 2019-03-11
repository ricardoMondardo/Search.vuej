'use strict';

const handleErrors = function (response) {
  if(!response.ok) {
    throw Error(response.status)
  }
  return response
}

const postData = function (url = ``, data = {}) {

  const inInFractal = window.location.port == "3000"
  url = inInFractal ? `https://localhost:5001/${url}` : `/${url}`

  const obj = new Promise(
    function(resolve, reject) {

      fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify(data),
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

  return obj;

}

export { postData }
