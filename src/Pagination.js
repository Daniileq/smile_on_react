export function Pagination({
  page,
  datalength,
  countCurrentPage,
  paginate,
  nextPage,
  lastPage,
}) {
  const pageNumbers = [];

  // const firstNamber
  // const lastNamber

  const pageCount = Math.ceil(datalength / countCurrentPage);
  const plenty = pageNumbers.map((elem) => elem);
  console.log(page);
  const closetoStart = page < 3; //отображение крайних трех.
  const closetoFinish = page > pageCount - 2; //отображение с последних 2;
  console.log(closetoStart);
  console.log(closetoFinish);
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
  console.log(firstNumber);
  console.log(lastNumber);
  for (let i = firstNumber; i <= lastNumber; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination ">
      <button className="btn btn-primary" onClick={lastPage}>
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
