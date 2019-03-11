'use strict';

const intervalToCheck = 30000
const intervalBeforeExpired = 60000

function isTokenTimeExpired(tokenExpirationTime) {
  let date = new Date().getTime() + intervalBeforeExpired
  let dif = (tokenExpirationTime - date) / 1000

  if (dif <= 0) return true

  return false
}

function autoLogoutUser(store) {

  let user = store.state.user

  if (isTokenTimeExpired(user.tokenExpirationTime) && user.logged) {
    store.commit('logOutUser')
  }

  setInterval(function(){
    console.log(`checked`)
    if (isTokenTimeExpired(user.tokenExpirationTime)  && user.logged) {
      store.commit('logOutUser')
      console.log('Token was about to be expired...')
    }
  }, intervalToCheck);

}

export { autoLogoutUser }
