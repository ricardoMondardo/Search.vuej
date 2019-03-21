'use strict';

const postData = function (url = ``, data = {}, token) {

  const inInFractal = window.location.port == "3000"
  url = inInFractal ? `https://localhost:5001/${url}` : `/${url}`

  var header = {
    "Content-Type": "application/json"
  }

  if (token != undefined) {
    header = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  }

  const obj = new Promise(
    function(resolve, reject) {

      fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: header,
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify(data),
      })
      .then((res) => {
        if (res.ok) return resolve(res.json())

        return reject({
          code: res.status,
          data: res.json()
        })
      })
      .catch((error) => {
        reject({
          code: '999',
          data: error.message
        })
      })
    }
  )

  return obj;

}

export { postData }
