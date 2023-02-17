import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [show, setShow] = useState(true);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        let namesArr = [];
        res.data.map((country) => {
          namesArr.push(country.name.common);
        });
        setData(namesArr);
        setFilteredData(namesArr);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  function clickHandler(e) {
    if (selectedData.includes(e.target.value)) {
      alert("tanii songoson uls bn");
    } else {
      let newArr = [...selectedData];
      setSelectedData(newArr);
    }
  }

  function removeItem(para) {
    let newArr = [...selectedData];
    newArr.splice(newArr.indexOf(para), 1);
    setSelectedData(newArr);
  }

  return (
    <div
      onClick={() => {
        setShow(!show);
      }}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <div>
          <div>
            {selectedData.map((e) => {
              return (
                <div>
                  {e}
                  <div onClick={() => removeItem(e)}>x</div>
                </div>
              );
            })}
          </div>
          <input
            type={"search"}
            onFocus={() => {
              setShow(false);
            }}
          />
        </div>
        <select
          type="search"
          multiple
          name="test"
          className={show ? "displayNone" : ""}
        >
          {filteredData.map((data, index) => {
            return (
              <option value={data} onClick={clickHandler}>
                {index + 1}.{data}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default App;
