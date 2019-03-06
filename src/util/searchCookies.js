'use strict';

import { save, get, remove } from './cookies'

const COOKIE_NAME = 'lastState';

const removeCookie = function() {
  return remove(COOKIE_NAME);
}

const getStateFromCookies = function() {
  return get(COOKIE_NAME);
}

const setStateInCookies = function(url, pagesFastAccess) {

  var state = url.indexOf('?q=') != -1 ?
              url.substr(url.indexOf('?q=')) :
              url.substr(url.indexOf('?PageNumber='));


  state = state + '&fastBtns=' +pagesFastAccess.join(',');
  save(COOKIE_NAME, state, 0);
}

const getPageFromState = function() {

  var state = getStateFromCookies();
  var result = state.substring(state.indexOf('PageNumber=') + 5, state.indexOf('&PageSize'))

  return parseInt(result, 0);
}

const getQueryFromState = function() {

  var state = getStateFromCookies();
  var query = "";

  if (state.indexOf('q=') > -1) {
    query = state.substring(state.indexOf('q=') + 2, state.indexOf('&'))
  }

  return query;
}

const getFastButtonsFromState = function() {
  var state = getStateFromCookies();

  var str = state.substr(state.indexOf("&fastBtns=") + ("&fastBtns=").length );
  var arr = str.split(",").map(Number);

  return arr || [];
}



export {setStateInCookies,
        getStateFromCookies,
        getPageFromState,
        getQueryFromState,
        getFastButtonsFromState,
        removeCookie };
