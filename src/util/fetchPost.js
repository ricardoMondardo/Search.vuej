'use strict';

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
