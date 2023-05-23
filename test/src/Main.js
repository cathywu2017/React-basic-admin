import React, { useState, useEffect } from 'react';
import {
  Sidebar,
  Segment,
  Table,
  Button,
  Grid,
} from 'semantic-ui-react';
import DeleteModal from './DeleteModal';
import AddEditModal from './AddEditModal';
import Pagination from './Pagination';
import SearchModal from './SearchModal';
import request from './Fetch';

function Main() {
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [isNew, setIsNew] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [enable, setEnable] = useState(1);
  const [locked, setLocked] = useState(1);
  const [id, setId] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [total, setTotal] = useState(1);
  const [searchValue, setSearchValue] = useState();

  async function apiData(methods, url, body) {
    const result = await request(methods, url, body);

    setUsers(result.ret);
    setTotal(result.pagination.total);
    setPerPage(result.pagination.max_results);
  }

  // 取得資料
  useEffect(() => {
    apiData('GET', 0);
  }, []);

  // 切換頁碼
  const goPage = (pageCurr, search) => {
    const num = (pageCurr - 1) * perPage;

    setCurrentPage(pageCurr);

    if (search) {
      setSearchValue(search);
    }

    const searchData = search || searchValue;

    apiData('GET', num, searchData);
  };

  // 開啟Modal - 新增編輯刪除
  const onOpenModal = (isNewValue, value) => {
    if (isNewValue === 'add') {
      setInputValue('');
      setEnable(1);
      setLocked(1);
      setIsNew(true);
      setOpenModal(true);
    }

    if (isNewValue === 'edit') {
      setInputValue(value.username);
      setEnable(value.enable);
      setLocked(value.locked);
      setId(value.id);
      setIsNew(false);
      setOpenModal(true);
    }

    if (isNewValue === 'del') {
      setInputValue(value.username);
      setEnable(value.enable);
      setLocked(value.locked);
      setId(value.id);
      setOpenAlert(true);
    }

    if (isNewValue === 'search') {
      setOpenSearch(true);
    }
  };

  // 關閉Modal - 新增編輯刪除
  const onClose = () => {
    setOpenModal(false);
    setOpenAlert(false);
    setOpenSearch(false);
  };

  // 日期轉換
  const date = (value) => {
    const dt = new Date(value);
    const yyyy = dt.getFullYear();
    const mm = dt.getMonth() + 1;
    const dd = dt.getDate();
    const h = dt.getHours();
    const min = dt.getMinutes();
    const s = dt.getSeconds();
    const dateTime = `${yyyy}/${mm}/${dd} ${h}:${min}:${s}`;

    return dateTime;
  };

  // 建立 CSV 資料
  const getRandomData = () => {
    const header = '#, 使用者帳號, 啟用, 鎖定, 建立時間\n';
    let data = '';

    for (let i = 0; i < users.length; i += 1) {
      const idText = users[i].id;
      const usernameText = `${users[i].username}\t`;
      const enableText = users[i].enable === 1 ? '是' : '否';
      const lockedText = users[i].locked === 1 ? '是' : '否';
      const dateText = date(users[i].created_at);

      data += `${idText}, ${usernameText}, ${enableText}, ${lockedText}, ${dateText}\n`;
    }

    return `\ufeff${header}${data}`;
  };

  // 匯出 CSV
  const createCsvFile = () => {
    const fileName = 'userData.csv';
    const data = getRandomData();
    const blob = new Blob([data], {
      type: 'application/octet-stream',
    });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');

    document.body.appendChild(link);

    link.href = href;
    link.download = fileName;
    link.click();
  };

  return (
    <Sidebar.Pusher>
      <Segment basic>
        <Grid verticalAlign="middle">
          <Grid.Column floated="left" width={12}>
            <Pagination
              currentPage={currentPage}
              perPage={perPage}
              total={total}
              goPage={goPage}
            />
          </Grid.Column>
          <Grid.Column floated="right" textAlign="right" width={4}>
            <Button color="blue" onClick={() => onOpenModal('add')}>新增</Button>
            <Button color="teal" onClick={() => onOpenModal('search')}>搜尋</Button>
            <Button color="green" onClick={() => createCsvFile()}>匯出</Button>
          </Grid.Column>
        </Grid>
        <AddEditModal
          openModal={openModal}
          isNew={isNew}
          currentPage={currentPage}
          total={total}
          perPage={perPage}
          id={id}
          inputValue={inputValue}
          enable={enable}
          locked={locked}
          onClose={onClose}
          goPage={goPage}
        />
        <DeleteModal
          currentPage={currentPage}
          total={total}
          perPage={perPage}
          id={id}
          openAlert={openAlert}
          onClose={onClose}
          goPage={goPage}
        />
        <SearchModal
          openSearch={openSearch}
          onClose={onClose}
          goPage={goPage}
        />
        <Table celled striped>
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell width="1">#</Table.HeaderCell>
              <Table.HeaderCell>使用者帳號</Table.HeaderCell>
              <Table.HeaderCell width="3">建立時間</Table.HeaderCell>
              <Table.HeaderCell width="2">啟用</Table.HeaderCell>
              <Table.HeaderCell width="2">鎖定</Table.HeaderCell>
              <Table.HeaderCell width="3">操作</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              users.map((user) => (
                <Table.Row key={user.id}>
                  <Table.Cell textAlign="center">{user.id}</Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>
                    {date(user.created_at)}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    { user.enable === 1 ? <p className="green text">是</p> : '否' }
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    { user.locked === 1 ? <p className="green text">是</p> : '否' }
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <Button basic color="green" onClick={() => onOpenModal('edit', user)}>編輯</Button>
                    <Button basic color="red" onClick={() => onOpenModal('del', user)}>刪除</Button>
                  </Table.Cell>
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table>
        <Pagination
          currentPage={currentPage}
          perPage={perPage}
          total={total}
          goPage={goPage}
        />
      </Segment>
    </Sidebar.Pusher>
  );
}

export default Main;
