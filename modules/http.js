import axios from 'axios'

let BASE_URL = import.meta.env.VITE_BASE_URL

export let getData = async (url) => {
    try {
        let res = await axios.get(BASE_URL + url)

        return res.data
    } catch (error) {
        alert(error)
    }
}

export let postData = async (url, body) => {
    let res = await fetch(BASE_URL + url, {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })

    return res
}

export let removeData = async (url, id) => {
    let res = await axios.delete(`${BASE_URL}${url}/${id}`)

    return res
}

export let patchData = async (url, body) => {
    let res = await fetch(BASE_URL + url, {
        method: 'patch',
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })

    return res
}

