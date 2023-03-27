import setStorage from "../helpers/setStorage";
import { BASE_URL } from "../api/index";
import axios from "axios";

export const login = (n, p, e) => {
    e.preventDefault();
    let data = {
      UserName: n,
      Password: p,
    };
    axios
      .post(BASE_URL + "api/User", data)
      .then((res) => {
        console.log(res.data);
        setStorage(res.data.id);  
        
      })
      .catch((err) => console.log(err));
  };