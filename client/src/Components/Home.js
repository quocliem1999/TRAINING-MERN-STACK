import React from 'react';

function Home() {
  return (
    <header className="masthead bg-primary text-white text-center no-select header-page mb-0">
      <div className="container d-flex align-items-center flex-column">
        <img className="masthead-avatar mb-5" src="assets/img/team.svg" alt="" />
        <h1 className="masthead-heading text-uppercase mb-0">tìm kiếm việc làm online</h1>
        <div className="divider-custom divider-light">
          <div className="divider-custom-line" />
          <div className="divider-custom-icon">
            <i className="fas fa-star" />
          </div>
          <div className="divider-custom-line" />
        </div>
        <p className="masthead-subheading font-weight-light">
          Không Có Gì Quan Trọng Hơn Là Tuyển Dụng Và Phát Triển Các Tài Năng.
        </p>
      </div>
    </header>
  );
}

export default Home;
