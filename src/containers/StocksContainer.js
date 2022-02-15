import React, {useState, useEffect} from 'react';

import StockSelector from '../components/StockSelector';

const StocksContainer = () => {

    const [stockData, setStockData] = useState(null);
    const [stockSymbol, setStockSymbol] = useState("AAPL");
    const [stockPrice, setStockPrice] = useState(0);
    
    const selectedStockUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=15min&apikey=H26K0E9MI2QFC8P3`;

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        if (stockData != null){
            setStockPrice(stockData["Time Series (15min)"][Object.keys(stockData["Time Series (15min)"])[0]]["4. close"]);
        }
    }, [stockData])

    const getData = () => {
        fetch(selectedStockUrl)
        .then(result => result.json())
        .then(data => setStockData(data));
    }

    return(
        <div>
            <StockSelector/>
            <p>{`${stockSymbol} was last trading at ${stockPrice}$ per share`}</p>
        </div>
    )
}

export default StocksContainer;