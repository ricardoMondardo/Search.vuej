const handleErrors = function (response) {
  if(!response.ok && response.status != 401) {
    throw Error(`Code: ${response.status}, Message: ${response.statusText}`)
  }
  return response
}

const postData = function (url = ``, data = {}) {

  const inInFractal = window.location.port == "3000"
  url = inInFractal ? `https://localhost:5001/${url}` : `/${url}`

  const result = new Promise(
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
        return resolve({
          code: res.status,
          response: res.json()
        })
      })
      .catch((error) => {
        reject(error)
      })

    }
  )


  return result;

}

export { postData }
