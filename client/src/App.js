import React, { useEffect, useState } from 'react';
import TextItem from './TextItem'
import './App.css';

// const DATA_SIZE_HALF = "half"
const DATA_SIZE_FULL = "full"
const INTERVAL_TIME = 2000
// Number of paragraphs to fetch in each refresh
const DATA_ITEMS_PER_REFRESH = 2


/** Application entry point */
function App() {

  const [data, setData] = useState([])
  // const [count, setCount] = useState(1)
  // const [gotID, setGotID] = useState([])
  // const [pendingID, setPendingID] = useState([])
  const [isFetching, setIsFetching] = useState(false);
  const [value, setValue] = useState(0)
  const [searchInput, setSearchInput] = useState("")

  let gotID = []
  let pendingID = []

  
  /** DO NOT CHANGE THE FUNCTION BELOW */
  useEffect(() => {
    setInterval(() => {
      // Find random bucket of words to highlight
      setValue(Math.floor(Math.random() * 10))
    }, INTERVAL_TIME)
  }, [])
  /** DO NOT CHANGE THE FUNCTION ABOVE */

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreData();
  }, [isFetching]);

  useEffect(() => {
    const fetchData = async () => {
      let dataID = await getDataID() //[0,1,2,3,4,5...89]
      let refreshDataID = dataID.slice(0,DATA_ITEMS_PER_REFRESH) //[0,1]
      console.log("ffff", dataID)
      
      let dataItems = await Promise.all (refreshDataID.map(async id => {
        return (await fetch("/api/dataItem/" + id)).json()
      }))

      setData(dataItems)
      gotID = refreshDataID
      pendingID = dataID.slice(DATA_ITEMS_PER_REFRESH)
      // setGotID(refreshDataID) // [0,1]
      // setCount(count+1)
      // setPendingID(dataID) // [2,3,4,5,...89]

      console.log("refreshDataID, dataID", gotID, pendingID)
    }
    
    fetchData()
  }, [])

  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    setIsFetching(true)
    console.log('Fetch more data items!');
  }

  const fetchMoreData = async() => {
    let refreshDataID = pendingID.slice(0,DATA_ITEMS_PER_REFRESH) //[2,3]
    let dataItems = await Promise.all (refreshDataID.map(async id => {
      return (await fetch("/api/dataItem/" + id)).json()
    }))

    setData(dataItems)
    gotID = gotID.concat(refreshDataID)
    pendingID = pendingID.slice(DATA_ITEMS_PER_REFRESH)
    // setGotID(gotID.concat(refreshDataID)) // [0,1,2,3]
    // setCount(count+1)
    // setPendingID(pendingID.slice(DATA_ITEMS_PER_REFRESH))
    setIsFetching(false)

    console.log("gotID, pendingID", gotID, pendingID)
  }

    const getDataID = async () => {
    let response = await fetch("/api/dataIdList?datasize=" + DATA_SIZE_FULL)
    let list = await response.json()
    
    return list//.slice(0,DATA_ITEMS_PER_REFRESH*count)
  }

  const handleChange = e => {
    setSearchInput(e.target.value)
  }

  // Infinite scroll that only loads the paragraphs currently on the screen

  return (
    <div className="App">
      <h2>JT Online Book</h2>
      {/* <h3>{dataList.length}</h3> */}
      <div>
        <input type="text" placeholder="Search text" value={searchInput} onChange={handleChange}/>
      </div>

     {
       data.map((row, i) => {
        return (<p key={`p${i}`}>
          {row.map((textitem, j) => {
            if (searchInput.length > 0 && textitem.text.search(searchInput) === -1) {
              return null;
            }

            return (
            <>
              <TextItem key={`${i}${j}`} value={value} data={textitem}/>
            </>)
          })}
        </p>)
       })
     }
     {isFetching && 'Fetching more data items...'}
    </div>
  );
}

export default App;
