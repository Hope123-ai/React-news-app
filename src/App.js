import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import searchicon from "./searchicon.png";

function App() {
  function textChange(e) {
    setText(e.target.value);
  }

  function search() {
    fetch(
      `https://newsapi.org/v2/everything?q=${text}&from=2020-10-12&sortBy=publishedAt&apiKey=0e3791a53ce74986b1bdb7610dce5b3d`
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setNews([...response.articles]);
        setText("");
      });
  }

  const [text, setText] = useState("");
  const [news, setNews] = useState([]);

  function getDate(date) {
    var arr = date.split("T");
    return arr[0];
  }

  return (
    <div className="App">
      <div className="title">
        <h1>SEARCH ANY NEWS</h1>
      </div>
      <div className="search-container">
        <input
          type="text"
          className="input"
          placeholder="Enter any keywords/tags"
          onChange={(e) => textChange(e)}
          value={text}
        ></input>
        <img
          src={searchicon}
          onClick={(e) => search(e)}
          className="search_btn"
        />
      </div>

      {news.map((item) => {
        return (
          <div className="headline">
            <div className="container">
              <img src={item.urlToImage} className="poster"></img>
              <div>
                
                <a href={item.url} target="_blank" className="news">
                  {item.title}
                </a>
                <div className="date">{getDate(item.publishedAt)}</div>
                <div className="desc">{item.description}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
