import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import request from './Fetch';

function AddEditModal(props) {
  const {
    id,
    inputValue,
    enable,
    locked,
    isNew,
    currentPage,
    total,
    perPage,
    goPage,
    onClose,
    openModal,
  } = props;

  const [inputValueNew, setInputValueNew] = useState('');
  const [enableNew, setEnableNew] = useState(1);
  const [lockedNew, setLockedNew] = useState(1);

  useEffect(() => {
    if (isNew) {
      setInputValueNew('');
    }

    if (!isNew) {
      setInputValueNew(inputValue);
    }
  }, [onClose, isNew, inputValue]);

  useEffect(() => {
    setInputValueNew(inputValue);
    setEnableNew(enable);
    setLockedNew(locked);
  }, [inputValue, enable, locked]);

  // 帳號
  const userInputValue = (e) => {
    const Val = e.target.value;
    setInputValueNew(Val);
  };

  // 啟用
  const enableChange = (e, { value }) => {
    const enableValue = value;
    setEnableNew(enableValue);
  };

  // 鎖定
  const lockedChange = (e, { value }) => {
    const lockedValue = value;
    setLockedNew(lockedValue);
  };

  async function apiData(methods, url, body) {
    await request(methods, url, body);

    if (methods === 'PUT') {
      goPage(currentPage);
    } else {
      const totalPage = Math.ceil((total + 1) / perPage);
      goPage(totalPage);
    }

    onClose();
  }

  // 新增修改資料
  const updateData = () => {
    const newItem = {
      username: inputValueNew,
      enable: enableNew,
      locked: lockedNew,
    };

    let methodText = 'POST';

    if (!isNew) {
      methodText = 'PUT';
    }

    apiData(methodText, id, newItem);
  };

  return (
    <Modal open={openModal} onClose={onClose}>
      <Modal.Header>
        { isNew ? '新增' : '編輯' }
      </Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Form>
            <Form.Field>
              <label htmlFor="userNameId">帳號</label>
              <input
                id="userNameId"
                placeholder="請輸入帳號"
                value={inputValueNew}
                onChange={userInputValue}
              />
            </Form.Field>
            <Form.Group inline>
              <label htmlFor="enableId">啟用</label>
              <Form.Radio
                label="是"
                value={1}
                placeholder="enable1"
                checked={enableNew === 1}
                onChange={enableChange}
              />
              <Form.Radio
                label="否"
                value={0}
                checked={enableNew === 0}
                onChange={enableChange}
              />
            </Form.Group>
            <Form.Group inline>
              <label htmlFor="lockedId">鎖定</label>
              <Form.Radio
                label="是"
                placeholder="locked1"
                value={1}
                checked={lockedNew === 1}
                onChange={lockedChange}
              />
              <Form.Radio
                label="否"
                value={0}
                checked={lockedNew === 0}
                onChange={lockedChange}
              />
            </Form.Group>
            <Button type="submit" onClick={updateData}>送出</Button>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}

AddEditModal.propTypes = {
  currentPage: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  enable: PropTypes.number.isRequired,
  locked: PropTypes.number.isRequired,
  inputValue: PropTypes.string.isRequired,
  openModal: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  goPage: PropTypes.func.isRequired,
  isNew: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]).isRequired,
};

export default AddEditModal;
