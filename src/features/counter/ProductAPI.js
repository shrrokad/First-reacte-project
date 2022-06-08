import axios from "axios";

export function getalluserData(){
    return axios.get(`${process.env.REACT_APP_USERDATA}/products`)
}

export function getuserData() {
    return axios.get(`${process.env.REACT_APP_ALLDATA}/users`)
}

export function getcartData() {
    return axios.get(`${process.env.REACT_APP_CART}/carts`)
}