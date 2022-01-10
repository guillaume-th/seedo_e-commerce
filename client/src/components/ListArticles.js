const API_URL = process.env.REACT_APP_API_URL;

export default function ListArticles(){
    //const user_id = localStorage.getItem("user_id");

    fetch(`${API_URL}/article/all`, { method: "GET" })
    .then(res => console.log(res))
    .catch(err => console.log(err))

   // console.log('Process  :'+process.env.REACT_APP_API_URL)
}