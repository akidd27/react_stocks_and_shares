const StockSelector = () => {
    
    return(
        <form>
            <label htmlFor="search-input">Enter a stock's symbol or name</label>
            <input type="text" id="search-input" list="suggestions"></input>
            <datalist id="suggestions">
                <option value="1st option"></option>
             </datalist>
        </form>
    )
}

export default StockSelector;