import axios from 'axios';

export const createProfile = (variable) => {
  return axios
    .post('/profile/createProfile', variable)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return {
        message: {
          msgBody: 'Lỗi!!!',
          msgError: true,
        },
        err,
      };
    });
};

export const getProfile = () => {
  return axios
    .get('/profile/getProfile')
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return {
        message: {
          msgBody: 'Lỗi!!!',
          msgError: true,
        },
        err,
      };
    });
};

export const updateProfile = (variable) => {
  return axios
    .patch('/profile/updateProfile', variable)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return {
        message: {
          msgBody: 'Lỗi!!!',
          msgError: true,
        },
        err,
      };
    });
};

export const deleteProfile = () => {
  return axios
    .delete('/profile/deleteProfile')
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return {
        message: {
          msgBody: 'Lỗi!!!',
          msgError: true,
        },
        err,
      };
    });
};
