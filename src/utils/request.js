// import Router from 'next/router';
// import {ReduxStore} from '../redux-config/reducer-store';
// import {logout} from '@redux/actions/auth';

const BACK_URL = 'https://espotify.azurewebsites.net';

export default async function request(url, opt) {
  if (!url.match(/^https?:\/\/([a-z]\.?)+/)) {
    url = BACK_URL + url;
  }

  const encode = await fetch(url, opt);

  if (opt.headers?.Authorization && encode.status === 401) {
    // ReduxStore.getInstance().getStore()?.dispatch(logout());
    // Router.replace(`/auth/login?goBack=${btoa(Router.asPath)}`);

    throw new Error('Network error', {cause: encode.status});
  }

  if (encode.status >= 400 && encode.status < 600) {
    throw new Error('Network error', {cause: encode.status});
  }

  const body = await encode.json();

  return body;
}

export function postOptionsFormData(body) {
  const {token} = /*ReduxStore.getInstance().getState().auth*/{};

  return {
    ...formDataOptions(token),
    body: body,
  };
}

export function getOptions() {
  const {token} = /*ReduxStore.getInstance().getState().auth*/{};

  return httpOptions('GET', token);
}

export function getOptionsGivenToken(token = '') {
  return httpOptions('GET', token);
}

export function rawPostOptions(body = {}) {
  return {
    ...httpOptions('POST'),
    body: JSON.stringify(body),
  };
}

export function postOptions(body = {}) {
  const {token} = /*ReduxStore.getInstance().getState().auth*/{};

  return {
    ...httpOptions('POST', token),
    body: JSON.stringify(body),
  };
}

export function putOptions(body = {}) {
  const {token} = /*ReduxStore.getInstance().getState().auth*/{};

  return {
    ...httpOptions('PUT', token),
    body: JSON.stringify(body),
  };
}

export function patchOptions(body = {}) {
  const {token} = /*ReduxStore.getInstance().getState().auth*/{};

  return {
    ...httpOptions('PATCH', token),
    body: JSON.stringify(body),
  };
}

export function deleteOptions(body = {}) {
  const {token} = /*ReduxStore.getInstance().getState().auth*/{};

  return {
    ...httpOptions('DELETE', token),
    body: JSON.stringify(body),
  };
}

const formDataOptions = (token) =>{
  const options = {
    method: 'POST',
  };

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  return options;
}

const httpOptions = (method = 'GET', token) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
  };

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  return options;
};
