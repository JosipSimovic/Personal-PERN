import React from "react";

import "./PageNav.css";

const PageNav = (props) => {

    let currentPage = props.currentPage;
    let setCurrentPage = props.setCurrentPage;
    let maxPageNumber = props.maxPageNumber;

  return (
    <div className="container-fluid">
      <div className="row text-center">
        <div className="col-12">
          <button disabled={currentPage > 1 ? false : true}
            onClick={() => {
              setCurrentPage((currentPage -= currentPage > 1 ? 1 : 0));
            }}
            className="nav-button-arrow"
          >
            &#171;
          </button>
          {(() => {
            let pages = [];
            for (let i = 0; i < maxPageNumber; i++) {
              pages.push(
                <button
                  onClick={() => setCurrentPage(i + 1)}
                  key={`page-button-${i + 1}`}
                  className={`nav-button ${
                    currentPage === i + 1 ? "active-page" : ""
                  }`}
                >
                  {i + 1}
                </button>
              );
            }
            return pages;
          })()}
          <button disabled={currentPage < maxPageNumber ? false : true}
            onClick={() => {
              setCurrentPage(
                (currentPage += currentPage < maxPageNumber ? 1 : 0)
              );
            }}
            className="nav-button-arrow"
          >
            &#187;
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNav;
