import axios from 'axios';

export const register = (user) => {
  return axios
    .post('/register', user)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return {
        message: {
          msgBody: 'Tao tai khoan khong thanh cong',
          msgError: true,
        },
        err,
      };
    });
};

export const login = (user) => {
  return axios
    .post('/login', user)
    .then((response) => {
      if (response.status !== 401) {
        return response.data;
      } else {
        return {
          isAuthenticated: false,
          user: { username: '', role: '' },
          message: { msgBody: 'Error', msgError: true },
        };
      }
    })
    .catch((err) => {
      return {
        message: {
          msgBody: 'sai tai khoan hoac mat khau',
          msgError: true,
        },
        err,
      };
    });
};

export const logout = () => {
  return axios.get('/logout').then((res) => {
    return res.data;
  });
};

export const isAuthenticated = () => {
  return fetch('/authenticated').then((res) => {
    if (res.status !== 401) return res.json().then((data) => data);
    else {
      return { isAuthenticated: false, user: { username: '', role: '' } };
    }
  });
};
