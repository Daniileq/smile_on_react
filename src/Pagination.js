export function Pagination({
  page,
  datalength,
  countCurrentPage,
  paginate,
  nextPage,
  pref,
} 
) {
  const pageNumbers = [];

  const pageCount = Math.ceil(datalength / countCurrentPage);
  const closetoStart = page < 3; //отображение крайних 3;
  const closetoFinish = page > pageCount - 2; //отображение с последних 2;

  const firstNumber = closetoStart
    ? 1
    : closetoFinish
    ? pageCount - 4
    : page - 2;
  const lastNumber = closetoStart
    ? 5
    : closetoFinish
    ? pageCount - 4
    : page + 2;
  for (let i = firstNumber; i <= lastNumber; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination ">
      <button className="btn btn-primary" onClick={pref}>
        Prev
      </button>
      {pageNumbers.map((number) => (
        <div>
          <div className="page-item">
            <button
              className="page-link"
              href="#"
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          </div>
        </div>
      ))}
      <button className="btn btn-primary" onClick={nextPage}>
        Next
      </button>
    </div>
  );
}
