import React from 'react';
import { Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import request from './Fetch';

function DeleteModal(props) {
  const {
    currentPage,
    perPage,
    total,
    id,
    goPage,
    openAlert,
    onClose,
  } = props;

  async function apiData(methods, url) {
    await request(methods, url);

    if ((total - 1) > (currentPage - 1) * perPage) {
      goPage(currentPage);
    } else {
      goPage(currentPage - 1);
    }
  }

  // 刪除資料
  const delUser = () => {
    apiData('DELETE', id);
  };

  return (
    <Modal
      open={openAlert}
      onClose={onClose}
      header="警告!"
      content="是否確認刪除?"
      actions={['取消', {
        key: id,
        content: '確認',
        negative: true,
        onClick: delUser,
      }]}
    />
  );
}

DeleteModal.propTypes = {
  currentPage: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  openAlert: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  goPage: PropTypes.func.isRequired,
};

export default DeleteModal;
