import React, {useState, useEffect} from 'react';

const StocksContainer = () => {

    const [stockData, setStockData] = useState("");
    const symbol = null;
    const stockSymbol = null;
    const stockPrice = null;
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=H26K0E9MI2QFC8P3`;

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=KO&apikey=H26K0E9MI2QFC8P3')
        .then(result => result.json())
        .then(data => setStockData(data));
    }

    return(
        <div>
            <form>
                <label htmlFor="search-input">Enter a stock's symbol or name</label>
                <input type="text" id="search-input" list="suggestions"></input>
                <datalist id="suggestions">
                    <option value="1st option"></option>
                </datalist>
            </form>
            <p>{`${stockSymbol} was last trading at ${stockPrice}`}</p>
        </div>
    )
}

export default StocksContainer;