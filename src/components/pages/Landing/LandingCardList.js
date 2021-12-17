import React from 'react';
import LandingCard from './LandingCard';
import LandingSearchCard from './LandingSearchCard';
import { setCurrentSearch, searchDocs } from '../../../state/actions/searches';
import { connect } from 'react-redux';
import { Row, Col, Pagination } from 'antd';
import { useOktaAuth } from '@okta/okta-react';
import './LandingCard.css';

function LandingCardList(props) {
  const {
    docs,
    total,
    currentSearch,
    setCurrentSearch,
    searchDocs,
    currentPage,
    bookmarkedDocs,
    page,
  } = props;

  const headerStyle = {
    fontSize: '2rem',
    padding: '2rem',
    textAlign: 'center',
  };

  const { authState } = useOktaAuth();

  const handleChange = (page, pageSize) => {
    // for when the page size stays the same
    if (pageSize === props.pageSize) {
      setCurrentSearch(currentSearch, page, pageSize);
      searchDocs(currentSearch, authState, page, props.pageSize);
    }
    // when page size changes, this keeps track of where you were
    else {
      const newPage =
        Math.floor(((currentPage - 1) * props.pageSize + 1) / pageSize) + 1;
      setCurrentSearch(currentSearch, newPage, pageSize);
      searchDocs(currentSearch, authState, newPage, pageSize);
    }
  };

  return (
    <>
      {bookmarkedDocs.length === 0 && docs.length === 0 ? (
        <>
          <LandingSearchCard />
        </>
      ) : (
        <>
          <h1 style={{ ...headerStyle }}>
            {page === 'bookmarks'
              ? 'Bookmarks'
              : `Search results for "${currentSearch}"`}
          </h1>
          <Row gutter={{ xs: 16, sm: 24, md: 32, lg: 48 }} justify="center">
            {docs.map(doc => (
              <Col className="gutter-row" key={doc.box_id}>
                <LandingCard {...doc} />
              </Col>
            ))}
          </Row>
          <Pagination
            current={currentPage}
            pageSize={props.pageSize}
            onChange={handleChange}
            total={total}
            pageSizeOptions={[10, 25, 50, 100]}
            hideOnSinglePage={true}
          />
        </>
      )}
    </>
  );
}

const mapStateToProps = state => ({
  docs: state.docs.docs,
  bookmarkedDocs: state.bookmarks.bookmarkedDocs,
  page: state.bookmarks.page,
  total: state.docs.totalDocsCount,
  currentSearch: state.searches.currentSearch,
  currentPage: state.searches.currentPage,
  pageSize: state.searches.pageSize,
});

export default connect(mapStateToProps, {
  searchDocs,
  setCurrentSearch,
})(LandingCardList);
