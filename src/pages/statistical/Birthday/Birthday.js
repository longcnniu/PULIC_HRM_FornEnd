import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Birthday.module.scss';
import axios from 'axios';
import { apiUrl, cookieValue } from '../../../contexts/contexts';
import moment from 'moment';

const cx = classNames.bind(styles);

const Birthday = () => {
  const [data, setdata] = useState([]);
  const [datatody, setdatatody] = useState([]);
  //
  useEffect(() => {
    //Hôm nay
    axios
      .get(apiUrl + '/v1/get-birthday-today', {
        headers: {
          token: cookieValue(),
        },
      })
      .then((req) => {
        // console.log(req.data.data);
        setdatatody(req.data.data);
      });
    //thangs nayd
    axios
      .get(apiUrl + '/v1/get-birthday-all', {
        headers: {
          token: cookieValue(),
        },
      })
      .then((req) => {
        // console.log(req.data.data);
        setdata(req.data.data);
      });
  }, []);
  //============================
  //sinh nhật hôm nay
  const listtoday = datatody.map((data) => {
    return (
      <tr key={data._id}>
        <td>{data.numberID}</td>
        <td>{data.numberNV}</td>
        <td>{data.nameStaff}</td>
        <td>{data.group}</td>
        <td>{data.department}</td>
        <td>{data.companyBranch}</td>
        <td>{moment(data.DateOfBirth).format('DD/MM/YYYY')}</td>
      </tr>
    );
  });
  //sinh nhật tháng này
  const list = data.map((data) => {
    return (
      <tr key={data._id}>
        <td>{data.numberID}</td>
        <td>{data.numberNV}</td>
        <td>{data.nameStaff}</td>
        <td>{data.group}</td>
        <td>{data.department}</td>
        <td>{data.companyBranch}</td>
        <td>{moment(data.DateOfBirth).format('DD/MM/YYYY')}</td>
      </tr>
    );
  });
  //============================
  return (
    <div>
      <h3>Sinh nhật Hôm nay</h3>
      <table className={cx('table-personnel')}>
        <tbody>
          <tr>
            <th>Số TT</th>
            <th>Mã NV</th>
            <th>Họ và Tên</th>
            <th>Nhóm</th>
            <th>Phòng ban</th>
            <th>Chi nhánh</th>
            <th>Ngày sinh</th>
          </tr>
          {listtoday}
        </tbody>
      </table>
      <h3>Sinh nhật trong tháng này</h3>
      <table className={cx('table-personnel')}>
        <tbody>
          <tr>
            <th>Số TT</th>
            <th>Mã NV</th>
            <th>Họ và Tên</th>
            <th>Nhóm</th>
            <th>Phòng ban</th>
            <th>Chi nhánh</th>
            <th>Ngày sinh</th>
          </tr>
          {list}
        </tbody>
      </table>
    </div>
  );
};

export default Birthday;
