const express = require('express');
const profileRouter = express.Router();
const passport = require('passport');
const Profile = require('../model/Profile');

// tạo hồ sơ cá nhân
profileRouter.post(
  '/createProfile',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { name, birthday, sdt, email, degree, experience, skill, hobby, target, gender } =
      req.body;
    const account = req.user._id;
    const newProfile = new Profile({
      name,
      birthday,
      sdt,
      email,
      degree,
      experience,
      skill,
      hobby,
      target,
      gender,
      account,
    });

    Profile.findOne({ account: account }, (err, exists) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: {
            msgBody: 'Có lỗi khi lấy dữ liệu',
            msgError: true,
          },
          err,
        });
      } else {
        if (exists) {
          return res.status(203).json({
            success: false,
            message: {
              msgBody: 'Tài khoản đã tạo hồ sơ rồi',
              msgError: true,
            },
            existProfile: true,
          });
        } else {
          newProfile.save((err, result) => {
            if (err) {
              if (err.code === 11000) {
                return res.status(203).json({
                  success: false,
                  message: {
                    msgBody: 'Email đã được tạo hồ sơ',
                    msgError: true,
                  },
                  existEmail: true,
                });
              }
              return res.status(203).json({
                success: false,
                message: {
                  msgBody: 'Có lỗi khi tạo hồ sơ vui lòng nhập đầy đủ thông tin',
                  msgError: true,
                },
                err,
              });
            } else {
              return res.status(200).json({
                success: true,
                message: {
                  msgBody: 'Tạo hồ sơ thành công',
                  msgError: false,
                },
                result,
              });
            }
          });
        }
      }
    });
  }
);

// lấy hồ sơ cá nhân theo tài khoản
profileRouter.get(
  '/getProfile',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const account = req.user._id;

    Profile.findOne({ account }, (err, result) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: {
            msgBody: 'Có lỗi khi lấy dữ liệu',
            msgError: true,
          },
          err,
        });
      } else {
        if (!result) {
          return res.status(201).json({
            success: false,
            message: {
              msgBody: 'Tài khoản chưa tạo hồ sơ',
              msgError: true,
            },
            existProfile: false,
          });
        } else {
          return res.status(200).json({
            success: true,
            message: {
              msgBody: 'Lấy hồ sơ thành công',
              msgError: false,
            },
            existProfile: true,
            result,
          });
        }
      }
    });
  }
);

// update hồ sơ cá nhân
profileRouter.patch(
  '/updateProfile',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const data = ({
      name,
      birthday,
      sdt,
      email,
      degree,
      experience,
      skill,
      hobby,
      target,
      gender,
    } = req.body);

    const updates = data;

    const options = { new: true };

    const account = req.user._id;

    Profile.updateOne({ account }, updates, options)
      .then((result) => {
        if (result.nModified < 1) {
          return res.status(201).json({
            success: false,
            message: {
              msgBody: 'Cập nhật hồ sơ không thành công',
              msgError: true,
            },
          });
        }
        return res.status(200).json({
          success: true,
          message: {
            msgBody: 'Cập nhật hồ sơ thành công',
            msgError: false,
          },
          result,
        });
      })
      .catch((err) => {
        if (err.code === 11000) {
          return res.status(201).json({
            success: false,
            message: {
              msgBody: 'Email đã được tạo hồ sơ',
              msgError: true,
            },
            existEmail: true,
          });
        }
        return res.status(400).json({
          success: false,
          message: {
            msgBody: 'Có lỗi khi cập nhật hồ sơ',
            msgError: true,
          },
          err,
        });
      });
  }
);

// delete hồ sơ cá nhân
profileRouter.delete(
  '/deleteProfile',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const account = req.user._id;

    Profile.deleteOne({ account }, (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: {
            msgBody: 'Xoá hồ sơ không thành công',
            msgError: true,
          },
        });
      } else {
        return res.status(200).json({
          success: true,
          message: {
            msgBody: 'Xoá hồ sơ cá nhân thành công',
            msgError: false,
          },
        });
      }
    });
  }
);

module.exports = profileRouter;
