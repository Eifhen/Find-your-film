

const StorageHandler = {

    Add: (storeName, arr) => {
        localStorage.removeItem(`${storeName}`);
        localStorage.setItem(`${storeName}`, JSON.stringify(arr));
    },

    Remove: (storeName) => {
        localStorage.removeItem(`${storeName}`);
    },

    Get: (storeName) => {
        let json;
        const data = localStorage.getItem(storeName);
        if(data !== undefined){ json = JSON.parse(data) };
        return data ? json : null;
    },
    
    ClearAll: () => {
        localStorage.Clear();
    }

}


export default  StorageHandler;