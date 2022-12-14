import classNames from 'classnames/bind';
import styles from './DependentPerson.module.scss';
import Pagination from '@mui/material/Pagination';
import { AiOutlineMore, AiOutlineCaretUp, AiOutlineCaretDown } from 'react-icons/ai';
import { useEffect, useState } from 'react';
//
import { apiUrl, cookieValue } from '../../contexts/contexts';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//menu
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
//dialog
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import Slide from '@mui/material/Slide';
//pup
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';

const cx = classNames.bind(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DependentPerson = () => {
  let navigate = useNavigate();
  const [Staff, setStaff] = useState([]);
  const [page_size, setpage_size] = useState('10');
  const [page, setpage] = useState(1);
  const [countPage, setcountPage] = useState(10);
  const [sort, setsort] = useState('numberID');
  const [sortty, setsortty] = useState(true);
  const [Search, setSearch] = useState('');
  const [TypeSearch, setTypeSearch] = useState('nameStaff');
  const [IDDependentPerson, setIDDependentPerson] = useState('');

  //loading table
  const [ReloadTable, setReloadTable] = useState(true);
  //pup thong bao
  const pupsuccess = (message) =>
    toast.success(message, {
      position: 'bottom-left',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  //menu nut actions
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (ID) => {
    return (e) => {
      setAnchorEl(e.currentTarget);
      setIDDependentPerson(ID);
    };
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  //dialog xoa
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  //xoa nhan vien
  const personnelDel = () => {
    handleCloseDialog();
    axios
      .delete(apiUrl + '/v1/del-dependent-person/' + IDDependentPerson, {
        headers: {
          token: cookieValue(),
        },
      })
      .then((req) => {
        // console.log(req);
        setReloadTable(!ReloadTable);
        pupsuccess(req.data.message);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  //chon trang
  const handleChange = (event, value) => {
    setpage(value);
  };

  //s???p s???p table
  const sorttable = (index) => {
    return (e) => {
      switch (index) {
        case 0:
          setsort('numberNV');
          setsortty(!sortty);
          break;
        case 1:
          setsort('nameStaff');
          setsortty(!sortty);
          break;
        case 2:
          setsort('nameDependentPerson');
          setsortty(!sortty);
          break;
        case 3:
          setsort('IDcard1DependentPerson');
          setsortty(!sortty);
          break;
        case 4:
          setsort('RelationshipWithTaxpayers');
          setsortty(!sortty);
          break;
        case 5:
          setsort('numberOfPapers');
          setsortty(!sortty);
          break;
        case 6:
          setsort('FromMonth');
          setsortty(!sortty);
          break;
        case 7:
          setsort('ToTheMonth');
          setsortty(!sortty);
          break;
        default:
        // code block
      }
    };
  };

  //chuyen trang edit
  const EditPage = () => {
    navigate('/dependent-person-edit/' + IDDependentPerson);
  };
  //=================================
  //l???y danh s??ch nh??n vi??n
  useEffect(() => {
    if (Search === '') {
      axios
        .post(
          apiUrl + '/v1/get-all-dependent-person',
          { page_size: parseInt(page_size), page: page, sort: sort, sortty: sortty ? '1' : '-1' },
          {
            headers: {
              token: cookieValue(),
            },
          },
        )
        .then((res) => {
          setStaff(res.data.dataPost);
          setcountPage(res.data.totalPage);
          // console.log(res.data.dataPost);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    } else {
      axios
        .post(
          apiUrl + '/v1/search-dependent-person-by-key',
          {
            keySearch: TypeSearch,
            valueSearch: TypeSearch === 'numberID' ? parseInt(Search) : Search,
            sort: sort,
            sortty: sortty ? '1' : '-1',
          },
          {
            headers: {
              token: cookieValue(),
            },
          },
        )
        .then((res) => {
          // console.log(req);
          setStaff(res.data.data);
          setcountPage(res.data.totalPage);
        })
        .catch((error) => {
          setStaff([]);
        });
    }
  }, [page_size, page, sort, sortty, Search, TypeSearch, ReloadTable]);
  //==========================================
  //chuy???n trang sang chi ti???t nh??n vi??n
  const nextDetailPersonnel = (ID) => {
    return (e) => {
      navigate('/personnel-details/' + ID);
    };
  };

  //t???o ra table
  const listviewStaff = Staff.map((data) => {
    return (
      <tr key={data._id}>
        <td className={cx('click-td')} onClick={nextDetailPersonnel(data.IDStaff)}>
          {data.numberNV}
        </td>
        {/* <td className={cx('click-td')}>
          <img
            src="https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-1/img/13-small.d796bffd.png"
            alt="avatar"
          ></img>
        </td> */}
        <td className={cx('click-td')} onClick={nextDetailPersonnel(data.IDStaff)}>
          {data.nameStaff}
        </td>
        <td className={cx('click-td')}>{data.nameDependentPerson}</td>
        {/* <td className={cx('click-td')}>{data.jobPosition}</td> */}
        <td className={cx('click-td')}>{data.IDcard1DependentPerson}</td>
        <td className={cx('click-td')}>{data.RelationshipWithTaxpayers}</td>
        <td className={cx('click-td')}>{data.numberOfPapers}</td>
        <td className={cx('click-td')}>{moment(data.FromMonth).format('DD/MM/YYYY')}</td>
        <td className={cx('click-td')}>{moment(data.ToTheMonth).format('DD/MM/YYYY')}</td>
        {/* <td className={cx('table-tt')}>
          {data.Working === '??ang l??m' && <span className={cx('dl')}>??ang l??m</span>}
          {data.Working === 'Th??i vi???c' && <span className={cx('nl')}>???? ngh???</span>}
          {data.Working === '??ang tuy???n' && <span className={cx('dtd')}>??ang tuy???n</span>}
          {data.Working === 'Thai s???n' && <span className={cx('ts')}>Thai s???n</span>}
        </td> */}
        <td className={cx('acctions')}>
          <AiOutlineMore className={cx('icon')} onClick={handleClick(data._id)} />
        </td>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleCloseMenu}
          onClick={handleCloseMenu}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 0px 0.3px rgba(0,0,0,0.32))',
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={EditPage}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            C???p nh???t
          </MenuItem>
          <MenuItem onClick={handleClickOpen}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            X??a
          </MenuItem>
        </Menu>
      </tr>
    );
  });

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        {/* <div className={cx('container-filters-main')}>
          <label>B??? l???c</label>
          <div className={cx('container-filters')}>
            <div className={cx('select-filters')}>
              <label>Nh??m</label>
              <select className={cx('select-filters-chi')}>
                <option value="0">10</option>
                <option value="1">20</option>
                <option value="2">30</option>
                <option value="3">40</option>
                <option value="4">50</option>
                <option value="5">60</option>
                <option value="6">70</option>
                <option value="7">80</option>
                <option value="8">90</option>
                <option value="9">100</option>
              </select>
            </div>
            <div className={cx('select-filters')}>
              <label>Ph??ng ban</label>
              <select className={cx('select-filters-chi')}>
                <option value="0">10</option>
                <option value="1">20</option>
                <option value="2">30</option>
                <option value="3">40</option>
                <option value="4">50</option>
                <option value="5">60</option>
                <option value="6">70</option>
                <option value="7">80</option>
                <option value="8">90</option>
                <option value="9">100</option>
              </select>
            </div>
            <div className={cx('select-filters')}>
              <label>Chi nh??nh</label>
              <select className={cx('select-filters-chi')}>
                <option value="0">10</option>
                <option value="1">20</option>
                <option value="2">30</option>
                <option value="3">40</option>
                <option value="4">50</option>
                <option value="5">60</option>
                <option value="6">70</option>
                <option value="7">80</option>
                <option value="8">90</option>
                <option value="9">100</option>
              </select>
            </div>
            <div className={cx('select-filters')}>
              <label>H???p ?????ng</label>
              <select className={cx('select-filters-chi')}>
                <option value="0">10</option>
                <option value="1">20</option>
                <option value="2">30</option>
                <option value="3">40</option>
                <option value="4">50</option>
                <option value="5">60</option>
                <option value="6">70</option>
                <option value="7">80</option>
                <option value="8">90</option>
                <option value="9">100</option>
              </select>
            </div>
            <div className={cx('select-filters')}>
              <label>Tr???ng th??i</label>
              <select className={cx('select-filters-chi')}>
                <option value="0">10</option>
                <option value="1">20</option>
                <option value="2">30</option>
                <option value="3">40</option>
                <option value="4">50</option>
                <option value="5">60</option>
                <option value="6">70</option>
                <option value="7">80</option>
                <option value="8">90</option>
                <option value="9">100</option>
              </select>
            </div>
          </div>
          <div className={cx('container-btn')}>
            <button className={cx('btn1')}>
              <AiOutlineReload className={cx('icon')} />
              M???c ?????nh
            </button>
            <button className={cx('btn2')}>
              <AiOutlineFilter className={cx('icon')} />
              T??m ki???m
            </button>
          </div>
        </div> */}
        <div className={cx('container-table')}>
          <div className={cx('container-show-main')}>
            <div className={cx('container-show')}>
              <label>Hi???n th???</label>
              <select onChange={(e) => setpage_size(e.target.value)} className={cx('element-select')}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
                <option value="60">60</option>
                <option value="70">70</option>
                <option value="80">80</option>
                <option value="90">90</option>
                <option value="100">100</option>
              </select>
              <label>m???c</label>
            </div>
            <div className={cx('container-search')}>
              <select className={cx('element-select')} onChange={(e) => setTypeSearch(e.target.value)}>
                <option value="nameStaff">T??m theo h??? v?? t??n NV</option>
                <option value="nameDependentPerson">T??m theo h??? v?? t??n NPT</option>
                <option value="numberNV">T??m theo MNV NV</option>
                <option value="IDcard1DependentPerson">T??m theo CMND/CCCD NPT</option>
              </select>
              <input
                className={cx('input-search')}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
              />
              {/* <Link to="/personnel-add/" className={cx('Link')}>
                <button>
                  <AiOutlineUserAdd className={cx('icon')} />
                  Th??m nh??n vi??n
                </button>
              </Link> */}
            </div>
          </div>
          {/*=====*/}
          <div className={cx('container-table-chi')}>
            {Staff.length > 0 ? (
              <table className={cx('table-personnel')}>
                <tbody>
                  <tr>
                    <th onClick={sorttable(0)}>
                      {sort === 'numberNV' && sortty === true && (
                        <div className={cx('container-sort-th')}>
                          MNV
                          <AiOutlineCaretUp className={cx('icon-up')} />
                        </div>
                      )}
                      {sort === 'numberNV' && sortty === false && (
                        <div className={cx('container-sort-th')}>
                          MNV
                          <AiOutlineCaretDown className={cx('icon-dow')} />
                        </div>
                      )}
                      {sort !== 'numberNV' && 'MNV'}
                    </th>
                    <th onClick={sorttable(1)}>
                      {sort === 'nameStaff' && sortty === true && (
                        <div className={cx('container-sort-th')}>
                          H??? v?? T??n nh??n vi??n
                          <AiOutlineCaretUp className={cx('icon-up')} />
                        </div>
                      )}
                      {sort === 'nameStaff' && sortty === false && (
                        <div className={cx('container-sort-th')}>
                          H??? v?? T??n nh??n vi??n
                          <AiOutlineCaretDown className={cx('icon-dow')} />
                        </div>
                      )}
                      {sort !== 'nameStaff' && 'H??? v?? T??n nh??n vi??n'}
                    </th>
                    <th onClick={sorttable(2)}>
                      {sort === 'nameDependentPerson' && sortty === true && (
                        <div className={cx('container-sort-th')}>
                          H??? v?? T??n NPT
                          <AiOutlineCaretUp className={cx('icon-up')} />
                        </div>
                      )}
                      {sort === 'nameDependentPerson' && sortty === false && (
                        <div className={cx('container-sort-th')}>
                          H??? v?? T??n NPT
                          <AiOutlineCaretDown className={cx('icon-dow')} />
                        </div>
                      )}
                      {sort !== 'nameDependentPerson' && 'H??? v?? T??n NPT'}
                    </th>
                    {/* <th onClick={sorttable(5)}>
                      {sort === 'jobPosition' && sortty === true && (
                        <div className={cx('container-sort-th')}>
                          V??? tr??
                          <AiOutlineCaretUp className={cx('icon-up')} />
                        </div>
                      )}
                      {sort === 'jobPosition' && sortty === false && (
                        <div className={cx('container-sort-th')}>
                          V??? tr??
                          <AiOutlineCaretDown className={cx('icon-dow')} />
                        </div>
                      )}
                      {sort !== 'jobPosition' && 'V??? tr??'}
                    </th> */}
                    <th onClick={sorttable(3)}>
                      {sort === 'IDcard1DependentPerson' && sortty === true && (
                        <div className={cx('container-sort-th')}>
                          CMND/CCCD NPT
                          <AiOutlineCaretUp className={cx('icon-up')} />
                        </div>
                      )}
                      {sort === 'IDcard1DependentPerson' && sortty === false && (
                        <div className={cx('container-sort-th')}>
                          CMND/CCCD NPT
                          <AiOutlineCaretDown className={cx('icon-dow')} />
                        </div>
                      )}
                      {sort !== 'IDcard1DependentPerson' && 'CMND/CCCD NPT'}
                    </th>
                    <th onClick={sorttable(4)}>
                      {sort === 'RelationshipWithTaxpayers' && sortty === true && (
                        <div className={cx('container-sort-th')}>
                          Quan h??? v???i NV
                          <AiOutlineCaretUp className={cx('icon-up')} />
                        </div>
                      )}
                      {sort === 'RelationshipWithTaxpayers' && sortty === false && (
                        <div className={cx('container-sort-th')}>
                          Quan h??? v???i NV
                          <AiOutlineCaretDown className={cx('icon-dow')} />
                        </div>
                      )}
                      {sort !== 'RelationshipWithTaxpayers' && 'Quan h??? v???i NV'}
                    </th>
                    <th onClick={sorttable(5)}>
                      {sort === 'numberOfPapers' && sortty === true && (
                        <div className={cx('container-sort-th')}>
                          S??? gi???y t???
                          <AiOutlineCaretUp className={cx('icon-up')} />
                        </div>
                      )}
                      {sort === 'numberOfPapers' && sortty === false && (
                        <div className={cx('container-sort-th')}>
                          S??? gi???y t???
                          <AiOutlineCaretDown className={cx('icon-dow')} />
                        </div>
                      )}
                      {sort !== 'numberOfPapers' && 'S??? gi???y t???'}
                    </th>
                    <th onClick={sorttable(6)}>
                      {sort === 'FromMonth' && sortty === true && (
                        <div className={cx('container-sort-th')}>
                          T??? th??ng
                          <AiOutlineCaretUp className={cx('icon-up')} />
                        </div>
                      )}
                      {sort === 'FromMonth' && sortty === false && (
                        <div className={cx('container-sort-th')}>
                          T??? th??ng
                          <AiOutlineCaretDown className={cx('icon-dow')} />
                        </div>
                      )}
                      {sort !== 'FromMonth' && 'T??? th??ng'}
                    </th>
                    <th onClick={sorttable(7)}>
                      {sort === 'ToTheMonth' && sortty === true && (
                        <div className={cx('container-sort-th')}>
                          T???i th??ng
                          <AiOutlineCaretUp className={cx('icon-up')} />
                        </div>
                      )}
                      {sort === 'ToTheMonth' && sortty === false && (
                        <div className={cx('container-sort-th')}>
                          T???i th??ng
                          <AiOutlineCaretDown className={cx('icon-dow')} />
                        </div>
                      )}
                      {sort !== 'ToTheMonth' && 'T???i th??ng'}
                    </th>
                    <th>ACTIONS</th>
                  </tr>
                  {listviewStaff}
                </tbody>
              </table>
            ) : (
              <h2 className={cx('no-data')}>Kh??ng c?? d??? li???u</h2>
            )}
          </div>
          <div className={cx('pagination')}>
            <Pagination count={countPage} page={page} onChange={handleChange} size="large" color="primary" />
          </div>
        </div>
      </div>
      {/* dialog Xoa */}
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'C???nh b??o'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Ch???c ch???n mu???n x??a ng?????i ph??? thu???c n??y ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Kh??ng</Button>
          <Button onClick={personnelDel}>C??</Button>
        </DialogActions>
      </Dialog>
      {/* thong bao */}
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default DependentPerson;
