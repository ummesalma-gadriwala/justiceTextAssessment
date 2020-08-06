import React, { useEffect, useState } from 'react';
import TextItem from './TextItem'
import './App.css';

// const DATA_SIZE_HALF = "half"
const DATA_SIZE_FULL = "full"
const INTERVAL_TIME = 2000

/** Application entry point */
function App() {

  const [data, setData] = useState([])
  const [value, setValue] = useState(0)
  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch("/api/dataIdList?datasize=" + DATA_SIZE_FULL)
      let list = await response.json()

      let dataItems = await Promise.all (list.map(async id => {
        return (await fetch("/api/dataItem/" + id)).json()
      }))
      setData(dataItems)
    }
    
    fetchData()
  }, [])

  useEffect(() => {
    setInterval(() => {
      // Find random bucket of words to highlight
      setValue(Math.floor(Math.random() * 10))
    }, INTERVAL_TIME)
  }, [])

  const handleChange = e => {
    setSearchInput(e.target.value)
  }

  return (
    <div className="App">
      <h2>JT Online Book</h2>
      <div><input type="text" placeholder="Search text" value={searchInput} onChange={handleChange}/></div>
     {
       data.map((row, i) => {
        return (<p key={"p" + i}>
          {row.map((textitem, j) => {
            if (searchInput.length > 0 && textitem.text.search(searchInput) === -1) {
              return;
            }

            return (
            <>
              <TextItem key={i + "-" + j} value={value} data={textitem}/>
            </>)
          })}
        </p>)
       })
     }
    </div>
  );
}

export default App;
