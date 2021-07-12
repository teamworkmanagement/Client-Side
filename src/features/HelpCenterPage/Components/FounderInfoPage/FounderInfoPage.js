import React from "react";
import { HiOutlineMail } from "react-icons/hi";
import { ImGithub } from "react-icons/im";
import "./FounderInfoPage.scss";

//https://github.com/tiendunghk
function FounderInfoPage(props) {
  return (
    <div className="founder-info-page">
      <div className="title">
        Đội ngũ phát triển ứng dụng <strong>EZTeam</strong>
      </div>
      <div className="founder-item">
        <div className="avatar-container">
          <img
            src="../images/founder/khoa.png"
            alt=""
            className="founder-avatar"
          />
        </div>

        <div className="founder-detail">
          <div className="name">Khoa Nguyễn</div>
          <div className="fullname">
            <span>Họ tên:</span> Nguyễn Hồng Khoa
          </div>
          <div className="description">
            Sinh viên năm 4, khoa Công nghệ phần mềm, chuyên ngành Kỹ thuật phần
            mềm thuộc trường Đai học Công nghệ Thông tin ĐHQG TP.HCM. <br />
            Đồng sáng lập và phát triển ứng dụng <strong>EZTeam</strong>.
          </div>
          <div className="link-item">
            <div className="label">
              <HiOutlineMail className="icon-link icon-email" />
              Email:{" "}
            </div>
            <a href="mailto: khoanguyen1412v@gmail.com">
              khoanguyen1412v@gmail.com
            </a>
          </div>
          <div className="link-item">
            <div className="label">
              <ImGithub className="icon-link" />
              Github:{" "}
            </div>

            <a
              href="https://github.com/khoanguyen1412"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://github.com/khoanguyen1412
            </a>
          </div>
        </div>
      </div>
      <div className="founder-item">
        <div className="avatar-container">
          <img
            src="../images/founder/dung.png"
            alt=""
            className="founder-avatar"
          />
        </div>

        <div className="founder-detail">
          <div className="name">Dũng Nguyễn</div>
          <div className="fullname">
            <span>Họ tên:</span> Nguyễn Tiến Dũng
          </div>
          <div className="description">
            Sinh viên năm 4, khoa Công nghệ phần mềm, chuyên ngành Kỹ thuật phần
            mềm thuộc trường Đai học Công nghệ Thông tin ĐHQG TP.HCM. <br />
            Đồng sáng lập và phát triển ứng dụng <strong>EZTeam</strong>.
          </div>
          <div className="link-item">
            <div className="label">
              <HiOutlineMail className="icon-link icon-email" />
              Email:{" "}
            </div>

            <a href="mailto: tiendunghk@gmail.com">tiendunghk@gmail.com</a>
          </div>
          <div className="link-item">
            <div className="label">
              <ImGithub className="icon-link" />
              Github:{" "}
            </div>

            <a
              href="https://github.com/tiendunghk"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://github.com/tiendunghk
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FounderInfoPage;
