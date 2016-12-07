/* global FB */

import { createAction } from 'redux-actions';
import { setErrors } from 'ErrorActions';
// import {cloneDeep} from 'lodash';
import { collectionToCamel, keysToCamel } from 'utils/general';
import { compareAll } from 'utils/pipl';
import Api from 'api';

export const SET_FRIENDS = 'SET_FRIENDS';
export const setFriends = createAction(SET_FRIENDS);

export const ADD_FRIENDS = 'ADD_FRIENDS';
export const addFriends = createAction(ADD_FRIENDS);

export const ADD_PIPL_TO_FRIEND = 'ADD_PIPL_TO_FRIEND';
export const addPiplToFriend = createAction(ADD_PIPL_TO_FRIEND);

export const SET_LAT_LANG = 'SET_LAT_LANG';
export const setLatLang = createAction(SET_LAT_LANG);

export const getFriends = () => {
  return (dispatch, getState) => {
    const endpoint = '/me/taggable_friends?fields=id,picture,first_name,last_name,name';
    FB.api(endpoint, { 'access_token': getState().currentUser.fbToken }, (res) => {
      if (res && !res.error) {
        res.data = collectionToCamel(res.data);
        dispatch(setFriends(res));
      }
    });
  };
};

export const getMoreFriends = (path) => {
  return (dispatch, getState) => {
    FB.api(getState().friends.nextLink, (res) => {
      if (res && !res.error) {
        res.data = collectionToCamel(res.data);
        dispatch(addFriends(res));
      }
    });
  };
};


export const findBestMatch = (data) => {
  return (dispatch, getState) => {
    const { currentUser: { piplData }, friends: { addressLatLang } } = getState();
    compareAll(addressLatLang, piplData.base_data, data.pipl.baseData)
      .then((res) => {
        dispatch(setLatLang(res.addressLatLang));
        const filtered = res.data.filter((item) => item.value !== 0);
        if (filtered.length === 0 && res.data.length > 0) {
          dispatch(addPiplToFriend({ index: data.index, pipl: res.data[0] }));
        } else if (filtered.length > 0) {
          dispatch(addPiplToFriend({ index: data.index, pipl: filtered[0] }));
        } else {
          dispatch(addPiplToFriend({ index: data.index, pipl: null }));
        }
      });
  };
};

export const getPiplForFriend = (firstName, lastName, fbId, index) => {
  return (dispatch, getState) => {
    Api.getPiplForFriend({ firstName, lastName, fbId })
      .then((res) => dispatch(findBestMatch({ index, pipl: keysToCamel(res.data.pipl_info) })))
      .catch((res) => { console.log('err', res); });
  };
};
