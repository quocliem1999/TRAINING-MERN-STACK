import React, { useState } from 'react';
import { register } from '../Service/AccountService';
import Message from './Message';

function Register(props) {
  const [user, setUser] = useState({
    username: '',
    password: '',
    passwordConfig: '',
  });

  const [message, setMessage] = useState(false);

  const onChange = (e) => {
    e.preventDefault();
    const newUser = { ...user };
    newUser[e.target.name] = e.target.value;
    setUser(newUser);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variable = {
      username: user.username,
      password: user.password,
    };

    if (user.password === user.passwordConfig) {
      register(variable).then((data) => {
        const { message } = data;
        setMessage(message);

        if (!message.msgError) {
          setMessage(message);
          setTimeout(() => {
            props.history.push('/login');
          }, 2000);
        }
      });
    } else {
      setMessage({ msgBody: 'Mat khau khong khop', msgError: true });
    }
  };

  return (
    <section className="page-section my-3 register">
      <div className="container">
        <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">
          Đăng Ký
        </h2>
        <div className="divider-custom">
          <div className="divider-custom-line" />
          <div className="divider-custom-icon">
            <i className="fas fa-star" />
          </div>
          <div className="divider-custom-line" />
        </div>

        <div className="row">
          <div className="col-lg-8 mx-auto">
            {message ? <Message message={message} /> : null}
            <form
              id="contactForm"
              name="sentMessage"
              noValidate="novalidate"
              onSubmit={onSubmit}
            >
              <div className="control-group">
                <div className="form-group floating-label-form-group controls mb-0 pb-2">
                  <label>Username</label>
                  <input
                    className="form-control"
                    name="username"
                    type="text"
                    placeholder="User Name"
                    autoFocus={true}
                    value={user.username}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="control-group">
                <div className="form-group floating-label-form-group controls mb-0 pb-2">
                  <label>Mật Khẩu</label>
                  <input
                    className="form-control"
                    name="password"
                    type="password"
                    placeholder="Mật Khẩu"
                    value={user.password}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="control-group">
                <div className="form-group floating-label-form-group controls mb-0 pb-2">
                  <label>Mật Khẩu</label>
                  <input
                    className="form-control"
                    name="passwordConfig"
                    type="password"
                    placeholder="Nhập Lại Mật Khẩu"
                    value={user.passwordConfig}
                    onChange={onChange}
                  />
                </div>
              </div>
              <br />
              <div id="success" />
              <div className="form-group">
                <button
                  className="btn btn-primary btn-xl"
                  id="sendMessageButton"
                  type="submit"
                >
                  Đăng Ký
                </button>
              </div>
              <div className="form-group">
                <p className="text-register">
                  Bạn đã có tài khoản - <a href="/login">Đăng Nhập</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
