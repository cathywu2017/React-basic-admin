import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

function SearchModal(props) {
  const {
    openSearch,
    onClose,
    goPage,
  } = props;

  const [userNameValue, setUserNameValue] = useState('');
  const [enableSearch, setEnableSearch] = useState();
  const [lockedSearch, setLockedSearch] = useState();
  const [startCreatedAt, setStartCreatedAt] = useState('');
  const [endCreatedAt, setEndCreatedAt] = useState('');

  useEffect(() => {
    setUserNameValue('');
    setEnableSearch();
    setLockedSearch();
    setStartCreatedAt('');
    setEndCreatedAt('');
  }, [onClose]);

  // 帳號
  const userInputValue = (e) => {
    setUserNameValue(e.target.value);
  };

  const handleChangeEnable = (e, { value }) => {
    setEnableSearch(value);
  };

  const handleChangeLocked = (e, { value }) => {
    setLockedSearch(value);
  };

  const handleStartCreatedAt = (e) => {
    setStartCreatedAt(e.target.value);
  };

  const handleEndCreatedAt = (e) => {
    setEndCreatedAt(e.target.value);
  };

  // 搜尋
  const searchData = () => {
    const searchList = {
      username: userNameValue,
      enable: enableSearch,
      locked: lockedSearch,
      start_created_at: startCreatedAt,
      end_created_at: endCreatedAt,
    };

    goPage(1, searchList);
    onClose();
  };

  return (
    <Modal open={openSearch} onClose={onClose}>
      <Modal.Header>
        搜尋
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Field>
              <label htmlFor="userNameId">帳號</label>
              <input
                id="userNameId"
                placeholder="請輸入帳號"
                value={userNameValue}
                onChange={userInputValue}
              />
            </Form.Field>
            <Form.Group widths="equal">
              <Form.Field>
                <label htmlFor="start">開始日期</label>
                <input
                  type="date"
                  placeholder="開始日期"
                  value={startCreatedAt}
                  onChange={handleStartCreatedAt}
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor="end">結束日期</label>
                <input
                  type="date"
                  placeholder="結束日期"
                  value={endCreatedAt}
                  onChange={handleEndCreatedAt}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group inline>
              <label htmlFor="enableId">啟用</label>
              <Form.Radio
                label="是"
                value={1}
                placeholder="enable1"
                checked={enableSearch === 1}
                onChange={handleChangeEnable}
              />
              <Form.Radio
                label="否"
                value={0}
                checked={enableSearch === 0}
                onChange={handleChangeEnable}
              />
            </Form.Group>
            <Form.Group inline>
              <label htmlFor="lockedId">鎖定</label>
              <Form.Radio
                label="是"
                placeholder="locked1"
                value={1}
                checked={lockedSearch === 1}
                onChange={handleChangeLocked}
              />
              <Form.Radio
                label="否"
                value={0}
                checked={lockedSearch === 0}
                onChange={handleChangeLocked}
              />
            </Form.Group>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" content="搜尋" onClick={searchData} />
      </Modal.Actions>
    </Modal>
  );
}

SearchModal.propTypes = {
  openSearch: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  goPage: PropTypes.func.isRequired,
};

export default SearchModal;
