import React, {useEffect, useState} from 'react';

const StockSelector = ({ onStockSelected }) => {
    
    const [keywords, setKeywords] = useState("AAPL");
    const searchUrl = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=H26K0E9MI2QFC8P3`
    const [searchResults, setSearchResults] = useState([]);
    const [stockSuggestions, setStockSuggestions] = useState([]);

    const handleChange = ((event) => {
        const userInput = event.target.value;

        console.log(isNaN(parseInt(userInput, 10)));
        if(!isNaN(parseInt(userInput, 10))){
            onStockSelected(searchResults[userInput]['1. symbol']);
        }
        else{
            setKeywords(userInput);
        }
    })

    const updateStockSuggestions = (() => {
        setStockSuggestions(
            searchResults.map((stock, index) => {
                return(
                    <option value={index} key={index}>
                        {stock['1. symbol']}: {stock['2. name']} - {stock['4. region']}
                    </option>
                )
            })
        );
    })

    useEffect(() => {
        updateStockSuggestions();
    }, [searchResults])

    useEffect(() => {
        if (keywords.length > 1){
            fetch(searchUrl)
            .then(result => result.json())
            .then(data => setSearchResults(data['bestMatches']));
        }
    }, [keywords])

    return(
        <form>
            <label htmlFor="search-input">Enter a stock's symbol or name</label>
            <input type="text" id="search-input" list="suggestions" onChange={handleChange}></input>
            <datalist id="suggestions">
                {stockSuggestions}
            </datalist>
        </form>
    )
}

export default StockSelector;