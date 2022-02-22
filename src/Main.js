import { useState, useEffect } from "react";
import { Pagination } from "./pogination";
// import { Data } from "./emogiJson";

export const Main = () => {
  const url = " https://emoji.ymatuhin.workers.dev/";
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  // const [loading, setLoading] = useState(false); // ожидание   загрузки
  const [currentPage, setCurrentPage] = useState(1); // для отображения текущей страницы
  const [countCurrentPage, setCountCurrentPage] = useState(12); //отображение колличества элементов которые нам нужно отображать на странице

  const lastEmogiIndex = currentPage * countCurrentPage; // высчитывание последнего индекса
  const firstElemIndex = lastEmogiIndex - countCurrentPage; // вычисление первого элемента индекс.
  const currentEmogi = data.slice(firstElemIndex, lastEmogiIndex);

  //Прослушивание события из input
  const handlChange = (event) => setValue(event.target.value);
  const valueArr = value.split(" ");
  const filterSmile = currentEmogi.filter((elem) =>
    elem.keywords.toLowerCase().includes(valueArr)
  );

  const getData = async () => {
    let response = await fetch(url);
    let makeJson = await response.json();
    setData(makeJson);
  };
  console.log(data);
  useEffect(() => {
    getData();
  }, []);
  const displaySmile = filterSmile.map((elem) => (
    <div key={elem.keywords}>
      <div className="styleCard" className="elem-card">
        <div className="smile">{elem.symbol}</div>
        <br />
        <div className="title">{elem.title}</div>
        <br />
        <div className="keywords">{elem.keywords}</div>
      </div>
    </div>
  ));

  const paginate = (pageNamber) => setCurrentPage(pageNamber); //
  const nextPage = () => setCurrentPage((event) => event + 1); //кнопки переключения по страницам
  const lastPage = () => setCurrentPage((event) => event - 1); //кнопки переключения по страницам

  return (
    <>
      <header className="header">
        <h1 className="header__title">Emoji Finder</h1>
        <h4 className="h4">Find emoji by keywords</h4>

        <input
          className="input"
          placeholder="Placeholder"
          type="text"
          onChange={handlChange}
        />
      </header>
      <div className="container">
        <div className="content">{displaySmile}</div>
      </div>
      <div>
        <Pagination
          datalength={data.length}
          countCurrentPage={countCurrentPage}
          paginate={paginate}
          lastPage={lastPage}
          nextPage={nextPage}
        />
      </div>
    </>
  );
};
