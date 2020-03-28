//LocalStorage Class
class LocalStorage {
    constructor(data) {
        this.data = data;
    }

    //set data first init
    setStorage(value) {
        return localStorage.setItem(this.data, value)
    }

    //get data first init
    getStorage() {
        try {
            return  JSON.parse(localStorage.getItem(this.data)|| []);
        }
        catch (e) {
            console.error(e);
        }
    }

    //get data key
    getStorageKey(id) {
        return  {...JSON.parse(localStorage.getItem(this.data)|| [])}[id]
    }

    //set data key
    setStorageKey(id, val1, val2, val3, val4) {
        let obj = JSON.parse(localStorage.getItem(this.data)|| []).map((el, index, arr)=> {
            arr[id].name = val1
            arr[id].email = val2
            arr[id].phone = val3
            arr[id].website = val4
            return el
        })
        return localStorage.setItem(this.data, JSON.stringify(obj))
    }
}

export default LocalStorage;
