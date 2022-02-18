import React, {useState, useEffect} from 'react';

import StockSelector from '../components/StockSelector';

const StocksContainer = () => {

    const [stockData, setStockData] = useState(null);
    const [selectedStockSymbol, setSelectedStockSymbol] = useState("AAPL");
    const [stockPrice, setStockPrice] = useState(0);
    
    const selectedStockUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${selectedStockSymbol}&interval=15min&apikey=H26K0E9MI2QFC8P3`;

    useEffect(() => {
        getData();
    }, [selectedStockSymbol])

    useEffect(() => {
        if (stockData != null){
            setStockPrice(stockData["Time Series (15min)"][Object.keys(stockData["Time Series (15min)"])[0]]["4. close"]);
        }
    }, [stockData])

    const getData = () => {
        console.log(selectedStockSymbol);
        console.log(selectedStockUrl);
        fetch(selectedStockUrl)
        .then(result => result.json())
        .then(data => setStockData(data));
    }

    const onStockSelected = (stockSymbol) => {
        setSelectedStockSymbol(stockSymbol);
    }

    return(
        <div>
            <StockSelector onStockSelected={onStockSelected}/>
            <p>{`${selectedStockSymbol} was last trading at ${stockPrice}$ per share`}</p>
        </div>
    )
}

export default StocksContainer;