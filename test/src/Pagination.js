import React from 'react';
import { Icon, Pagination } from 'semantic-ui-react';
import PropTypes from 'prop-types';

function PaginationBar(props) {
  const {
    currentPage,
    total,
    perPage,
    goPage,
  } = props;

  const totalPage = Math.ceil(total / perPage);

  return (
    <div>
      <Pagination
        activePage={currentPage}
        firstItem={{
          content: '«',
          disabled: currentPage === 1,
        }}
        lastItem={{
          content: '»',
          disabled: currentPage === totalPage,
        }}
        prevItem={{
          content: <Icon name="chevron left" />,
          icon: true,
          disabled: currentPage === 1,
        }}
        nextItem={{
          content: <Icon name="chevron right" />,
          icon: true,
          disabled: currentPage === totalPage,
        }}
        totalPages={totalPage}
        onPageChange={(e, { activePage }) => goPage(activePage)}
      />
    </div>
  );
}

PaginationBar.propTypes = {
  currentPage: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  goPage: PropTypes.func.isRequired,
};

export default PaginationBar;
