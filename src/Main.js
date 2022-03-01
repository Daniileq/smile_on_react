import { useState, useEffect } from "react";
import { Pagination } from "./Pagination";
// import { Data } from "./emogiJson";

export const Main = () => {
  const url = " https://emoji.ymatuhin.workers.dev/";
  const [data, setData] = useState([]);
  const [emogiFiltred, setEmogiFiltred] = useState([]);
  const [value, setValue] = useState("");
  // const [loading, setLoading] = useState(false); // ожидание   загрузки
  const [currentPage, setCurrentPage] = useState(1); // для oтображения текущей страницы
  const [countCurrentPage, setCountCurrentPage] = useState(12); //отображение колличества элементов которые нам нужно отображать на странице

  //Прослушивание события из input
  const handlChange = (event) => setValue(event.target.value);
  //Фильтрация по двум ключевым словам и более
  const filterSmile = (value) => 
    let newData = data;
    value
      .split(" ")
      .forEach(
        (word) =>
          (newData = newData.filter((elem) =>
            elem.keywords.toLowerCase().includes(word.toLowerCase())
          ))
      );
    setEmogiFiltred(newData);
  };

  const lastEmogiIndex = currentPage * countCurrentPage; // высчитывание последнего индекса.
  const firstElemIndex = lastEmogiIndex - countCurrentPage; // вычисление первого элемента индекс.
  const currentEmogi = emogiFiltred.slice(firstElemIndex, lastEmogiIndex); //на к
  const getData = async () => {
    let response = await fetch(url);
    let makeJson = await response.json();
    setData(makeJson);
    setEmogiFiltred(makeJson); //
  };
  useEffect(() => {
    getData();
  }, []);

  const displaySmile = currentEmogi.map((elem) => (
    <div>
      <div key={elem.keywords}>
        <div className="styleCard elem-card">
          <div className="smile">{elem.symbol} </div>
          <br />
          <div className="title">{elem.title}</div>
          <br />
          <div className="keywords">{elem.keywords} </div>
        </div>
      </div>
    </div>
  ));

  const paginate = (pageNumber) => setCurrentPage(pageNumber); //
  const nextPage = () => setCurrentPage((event) => event + 1); //кнопки переключения по страницам
  const pref = () => setCurrentPage((event) => event - 1); //кнопки переключения по страницам

  return (
    <>
      <header className="header">
        <h1 className="header__title">Emoji Finder</h1>
        <h4 className="h4">Find emoji by keywords</h4>

        <input
          className="input"
          placeholder="Placeholder"
          type="text"
          onChange={(event) => {
            handlChange(event);
            filterSmile(event.target.value);
            console.log(event.target.value);
            console.log(value);
          }}
        />
      </header>
      <div className="container">
        <div className="content">{displaySmile}</div>

        <div className="paginatior">
          <Pagination
            page={currentPage}
            datalength={emogiFiltred.length}
            countCurrentPage={countCurrentPage}
            paginate={paginate}
            pref={pref}
            nextPage={nextPage}
          />
        </div>
      </div>
    </>
  );
};
