import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { login } from '../Service/AccountService';
import Message from '../Components/Message';

function Login(props) {
  const [user, setUser] = useState({ username: '', password: '' });
  const [message, setMessage] = useState(false);
  const authContext = useContext(AuthContext);

  const onChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(user).then((data) => {
      const { isAuthenticated, user, message } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        props.history.push('/');
      } else {
        setMessage(message);
      }
    });
  };

  return (
    <section className="page-section my-3 login">
      <div className="container">
        <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">
          Đăng Nhập
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
              onSubmit={onSubmit}
              id="contactForm"
              name="sentMessage"
              noValidate="novalidate"
            >
              <div className="control-group">
                <div className="form-group floating-label-form-group controls mb-0 pb-2">
                  <input
                    className="form-control"
                    name="username"
                    type="text"
                    placeholder="Username"
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
                  <p className="help-block text-danger" />
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
                  Đăng Nhập
                </button>
              </div>
              <div className="form-group">
                <p className="text-login">
                  Bạn chưa có tài khoản - <a href="/register">Đăng Ký</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
