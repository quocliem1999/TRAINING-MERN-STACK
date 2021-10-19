import React, { useEffect, useState } from 'react';
import Message from './Message';

import { updateProfile, getProfile } from '../Service/ProfileService';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import vi from 'date-fns/locale/vi';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML, convertFromHTML } from 'draft-convert';

registerLocale('vi', vi);

function UpdateProfile(props) {
  const [info, setInfo] = useState({
    name: '',
    sdt: '',
    email: '',
    gender: 'Nam',
    skill: '',
    hobby: '',
  });

  const [birthday, setBirthday] = useState(new Date('01/01/2000'));
  const [degree, setDegree] = useState(EditorState.createEmpty());
  const [experience, setExperience] = useState(EditorState.createEmpty());
  const [target, setTarget] = useState(EditorState.createEmpty());

  const [message, setMessage] = useState(null);
  const [length, setLength] = useState({ skill: 0, hobby: 0 });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    getProfile().then((data) => {
      if (data || data.success || data.existProfile) {
        const { result } = data;

        setInfo({
          name: result.name,
          sdt: result.sdt,
          email: result.email,
          gender: result.gender,
          skill: result.skill,
          hobby: result.hobby,
        });

        setBirthday(new Date(result.birthday));
        setLength({ skill: result.skill.length, hobby: result.hobby.length });
        setDegree(EditorState.createWithContent(convertFromHTML(result.degree)));
        setExperience(EditorState.createWithContent(convertFromHTML(result.experience)));
        setTarget(EditorState.createWithContent(convertFromHTML(result.target)));
      }
    });
  }, []);

  const onChangeInfo = (e) => {
    const newInfo = { ...info };
    newInfo[e.target.name] = e.target.value;
    const newLength = { ...length };
    newLength[e.target.name] = e.target.value.length;

    setLength(newLength);
    setInfo(newInfo);
  };

  const onChangeDate = (date) => {
    setBirthday(date);
  };

  const onEditorDegree = (value) => {
    setDegree(value);
  };

  const onEditorExperience = (value) => {
    setExperience(value);
  };

  const onEditorTarget = (value) => {
    setTarget(value);
  };

  const _degree = convertToHTML(degree.getCurrentContent());
  const _experience = convertToHTML(experience.getCurrentContent());
  const _target = convertToHTML(target.getCurrentContent());

  const variable = {
    name: info.name,
    birthday: birthday,
    sdt: info.sdt,
    email: info.email,
    degree: _degree,
    experience: _experience,
    skill: info.skill.replace(/\r?\n/, '<br/>'),
    hobby: info.hobby.replace(/\r?\n/, '<br/>'),
    target: _target,
    gender: info.gender,
  };

  const onSubmit = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateProfile(variable).then((data) => {
      const { message } = data;
      if (data.success) {
        setMessage(message);
        setTimeout(() => {
          props.history.push('/profile');
        }, 1500);
      } else {
        setMessage(message);
      }
    });
  };

  return (
    <>
      <section className="page-section my-3 post">
        <div className="container">
          <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">
            Cập Nhật Hồ Sơ Cá Nhân
          </h2>
          <div className="divider-custom">
            <div className="divider-custom-line" />
            <div className="divider-custom-icon">
              <i className="fas fa-star" />
            </div>
            <div className="divider-custom-line" />
          </div>
          {/* Form Nhập Thông Tin */}
          <div className="row">
            <div className="col-lg-8 mx-auto sp-ct">
              {message ? <Message message={message} /> : null}
              <form>
                <h4 className="text-uppercase text-secondary mt-3">Thông Tin Cá Nhân:</h4>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label className="text-secondary" htmlFor="inputname">
                      Họ Và Tên
                    </label>
                    <input
                      name="name"
                      type="text"
                      value={info.name}
                      onChange={onChangeInfo}
                      className="form-control"
                      placeholder="Nhập họ và tên"
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label className="text-secondary" htmlFor="inputemail">
                      Ngày Sinh
                    </label>
                    <br />
                    <DatePicker
                      name="birthday"
                      className="form-control"
                      selected={birthday}
                      value={birthday}
                      dateFormat="dd/MM/yyyy"
                      disabledKeyboardNavigation
                      placeholderText="Ngày Sinh"
                      onChange={onChangeDate}
                      locale="vi"
                      showYearDropdown
                      scrollableMonthYearDropdown
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label className="text-secondary" htmlFor="inputZip">
                      Giới Tính
                    </label>
                    <select
                      value={info.gender}
                      onChange={onChangeInfo}
                      name="gender"
                      id="inputState"
                      className="form-control"
                    >
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label className="text-secondary" htmlFor="inputemail">
                      E-mail
                    </label>
                    <input
                      value={info.email}
                      onChange={onChangeInfo}
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="Nhập e-mail"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label className="text-secondary" htmlFor="inputState">
                      Số Điện Thoại
                    </label>
                    <input
                      value={info.sdt}
                      onChange={onChangeInfo}
                      name="sdt"
                      type="number"
                      className="form-control"
                      id="inputZip"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label className="text-secondary" htmlFor="inputemail">
                      Kỹ Năng{' '}
                      <i
                        style={length.skill < 150 ? { color: '#97999b' } : { color: 'red' }}
                      >{`(${length.skill}/150)`}</i>
                    </label>
                    <textarea
                      value={info.skill}
                      name="skill"
                      onChange={onChangeInfo}
                      maxLength="150"
                      className="form-control"
                      rows="3"
                      style={{ resize: 'none' }}
                    ></textarea>
                  </div>
                  <div className="form-group col-md-6">
                    <label className="text-secondary" htmlFor="inputemail">
                      Sở Thích{' '}
                      <i
                        style={length.hobby < 150 ? { color: '#97999b' } : { color: 'red' }}
                      >{`(${length.hobby}/150)`}</i>
                    </label>
                    <textarea
                      value={info.hobby}
                      name="hobby"
                      onChange={onChangeInfo}
                      maxLength="150"
                      className="form-control"
                      rows="3"
                      style={{ resize: 'none' }}
                    ></textarea>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* Form Mô Tả Học Vấn */}
          <div className="row">
            <div className="col-lg-8 mx-auto sp-ct">
              <form>
                <h4 className="text-uppercase text-secondary mt-3">Học Vấn:</h4>
                <div className="form-group mt-3">
                  <Editor
                    className="form-control"
                    placeholder="Nhập mô tả học vấn ..."
                    editorState={degree}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    onEditorStateChange={onEditorDegree}
                    toolbar={{
                      options: [
                        'inline',
                        'blockType',
                        'fontFamily',
                        'list',
                        'colorPicker',
                        'history',
                      ],
                      inline: {
                        inDropdown: false,
                        className: undefined,
                        component: undefined,
                        dropdownClassName: undefined,
                        options: [
                          'bold',
                          'italic',
                          'underline',
                          'strikethrough',
                          'superscript',
                          'subscript',
                        ],
                      },
                      blockType: {
                        inDropdown: true,
                        options: ['Normal', 'H3', 'H4', 'H5', 'H6'],
                        className: undefined,
                        component: undefined,
                        dropdownClassName: undefined,
                      },
                    }}
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Form Mô Tả Kinh Nghiệm */}
          <div className="row">
            <div className="col-lg-8 mx-auto sp-ct">
              <form>
                <h4 className="text-uppercase text-secondary mt-3">Kinh Nghiệm:</h4>
                <div className="form-group mt-3">
                  <Editor
                    className="form-control"
                    placeholder="Nhập mô tả kinh nghiệm ..."
                    editorState={experience}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    onEditorStateChange={onEditorExperience}
                    toolbar={{
                      options: [
                        'inline',
                        'blockType',
                        'fontFamily',
                        'list',
                        'colorPicker',
                        'history',
                      ],
                      inline: {
                        inDropdown: false,
                        className: undefined,
                        component: undefined,
                        dropdownClassName: undefined,
                        options: [
                          'bold',
                          'italic',
                          'underline',
                          'strikethrough',
                          'superscript',
                          'subscript',
                        ],
                      },
                      blockType: {
                        inDropdown: true,
                        options: ['Normal', 'H3', 'H4', 'H5', 'H6'],
                        className: undefined,
                        component: undefined,
                        dropdownClassName: undefined,
                      },
                    }}
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Form Mô Tả Mục Tiêu */}
          <div className="row">
            <div className="col-lg-8 mx-auto sp-ct">
              <form>
                <h4 className="text-uppercase text-secondary mt-3">Mục Tiêu:</h4>
                <div className="form-group mt-3">
                  <Editor
                    className="form-control"
                    placeholder="Nhập mô tả mục tiêu ..."
                    editorState={target}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    onEditorStateChange={onEditorTarget}
                    toolbar={{
                      options: [
                        'inline',
                        'blockType',
                        'fontFamily',
                        'list',
                        'colorPicker',
                        'history',
                      ],
                      inline: {
                        inDropdown: false,
                        className: undefined,
                        component: undefined,
                        dropdownClassName: undefined,
                        options: [
                          'bold',
                          'italic',
                          'underline',
                          'strikethrough',
                          'superscript',
                          'subscript',
                        ],
                      },
                      blockType: {
                        inDropdown: true,
                        options: ['Normal', 'H3', 'H4', 'H5', 'H6'],
                        className: undefined,
                        component: undefined,
                        dropdownClassName: undefined,
                      },
                    }}
                  />
                </div>
              </form>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col text-center">
              <button type="button" className="btn btn-primary btn-lg" onClick={onSubmit}>
                Cập Nhật Hồ Sơ
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default UpdateProfile;
