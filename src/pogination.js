export function Pagination({
  datalength,
  countCurrentPage,
  paginate,
  nextPage,
  lastPage,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= datalength / countCurrentPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination ">
      <button className="btn btn-primary" onClick={lastPage}>
        Prev
      </button>
      {pageNumbers.map((elem) => (
        <div>
          <div className="page-item">
            <a className="page-link" href="#" onClick={() => paginate(elem)}>
              {elem}
            </a>
          </div>
        </div>
      ))}
      <button className="btn btn-primary" onClick={nextPage}>
        Next
      </button>
    </div>
  );
}
