const fetchItems = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    const meal = data.meals;
    return meal;
}

const debounce = (func, delay) => {
    if (typeof func !== 'function') {
        throw new Error(`Not a valid func ${func}`);
    }
    if (typeof delay !== 'number') {
        throw new Error(`Not a valid delay ${delay}`);
    }

    let timeout;
    return (...args) => {
        return new Promise(async (resolve) => {
            window.clearTimeout(timeout);
            timeout = window.setTimeout(async () => {
                const data = await func(...args);
                resolve(data);
            }, delay);
        })
    }
}

const debounceQuery = debounce(fetchItems, 1000);
export default debounceQuery;