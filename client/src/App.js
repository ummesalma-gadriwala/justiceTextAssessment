// AUTHOR: UMME SALMA GADRIWALA

// Approach: 
// Added an infinite scroll component using the 'react-infinite-scroll-component'.
// The page loads two paragraphs at a time and reloads when the user scrolls to the bottom of the screen.
// Further modifications were made in App.css to include some beautifying elements.

import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import TextItem from './TextItem'
import './App.css';

// const DATA_SIZE_HALF = "half"
const DATA_SIZE_FULL = "full"
const INTERVAL_TIME = 2000;
// Number of paragraphs to fetch in each refresh
const DATA_ITEMS_PER_REFRESH = 2;
let TOTAL_DATA_SIZE = 0;
let ID_LIST = [];

/** Application entry point */
function App() {

    // count: maintains the count of the number of paragraphs loaded onto the page.
    const [count, setCount] = useState(0);
    const [data, setData] = useState([]);
    const [value, setValue] = useState(0);
    const [searchInput, setSearchInput] = useState("");
    // isFetching: while isFetching is true, there is more data to load from the server.
    const [isFetching, setIsFetching] = useState(true);

    /** DO NOT CHANGE THE FUNCTION BELOW */
    useEffect(() => {
        setInterval(() => {
            // Find random bucket of words to highlight
            setValue(Math.floor(Math.random() * 10))
        }, INTERVAL_TIME)
    }, [])
    /** DO NOT CHANGE THE FUNCTION ABOVE */

    useEffect(() => {
        // fetchData first calls the dataIdList API to find the total number of paragraphs.
        // Then requests data for the first two paragraphs.
        const fetchData = async () => {
            let response = await fetch("/api/dataIdList?datasize=" + DATA_SIZE_FULL)
            let list = await response.json()
            TOTAL_DATA_SIZE = list.length;
            ID_LIST = list

            let nextDataId = list.slice(count, count + DATA_ITEMS_PER_REFRESH) //[0,1]

            let dataItems = await Promise.all(nextDataId.map(async id => {
                return (await fetch("/api/dataItem/" + id)).json()
            }))
            setData(dataItems)
            setCount(count + DATA_ITEMS_PER_REFRESH)
        }

        fetchData()
    }, [])

    // fetchMoreData is called each time the user scrolls to the end of the page.
    // Performs a check to see if all the data from the server is loaded. If so, it sets isFetching to false and exits.
    // Otherwise, it loads the next two paragraphs onto the page.
    const fetchMoreData = async () => {
        // console.log("TOTAL_DATA_SIZE 1", TOTAL_DATA_SIZE, ID_LIST, count)
        if (count === TOTAL_DATA_SIZE) {
            setIsFetching(false)
            return
        }

        let nextDataId = ID_LIST.slice(count, count + DATA_ITEMS_PER_REFRESH) //[2,3]

        let dataItems = await Promise.all(nextDataId.map(async id => {
            return (await fetch("/api/dataItem/" + id)).json()
        }))

        setData(dataItems.concat(data))
        setCount(count + DATA_ITEMS_PER_REFRESH)
        // console.log("TOTAL_DATA_SIZE 2", TOTAL_DATA_SIZE, ID_LIST, count)
    }

    const handleChange = e => {
        setSearchInput(e.target.value)
    }
    
    return (
        <div className="App">
            <img src="favicon.ico" alt="JusticeText"></img>
            <h2>JT Online Book</h2>

            <div className="search-box">
                <input type="text" name="text" className="text" id="text-search" placeholder="Search text" value={searchInput} onChange={handleChange} />
            </div>

            {/* Implemented an infinite scroll. */}
            <div className="App">
                <InfiniteScroll
                    dataLength={data.length}
                    next={fetchMoreData}
                    hasMore={isFetching}
                    loader={<h4>Loading data...</h4>}
                    endMessage={<p>======</p>}
                >
                    {data.map((row, i) => {
                        return (
                            <p key={`p${i}`}>
                                {row.map((textitem, j) => {
                                    if (searchInput.length > 0 && textitem.text.search(searchInput) === -1) {
                                        return null;
                                    }

                                    return (
                                        <TextItem key={`${i}${j}`} value={value} data={textitem} />
                                    )
                                })}
                            </p>
                        )
                    })}
                </InfiniteScroll>
            </div>
        </div>
    );
}

export default App;