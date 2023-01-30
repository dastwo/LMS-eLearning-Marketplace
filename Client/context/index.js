import { useReducer, createContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const initialState = {
  user: null,
};

const Context = createContext();

const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };

    default:
      return state;
  }
};

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  useEffect(() => {
    dispatch({
      type: "LOGIN",
      payload: JSON.parse(localStorage.getItem("user")),
    });
  }, []);

  const router = useRouter();
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      let res = error.response;
      if (res.status === 401 && res.config && !res.config._isRetryRequest) {
        return new Promise((resolve, reject) => {
          axios
            .get("/api/logout")
            .then((data) => {
              console.log("/401 error > logout");
              localStorage.removeItem("user");
              router.push("/login");
            })
            .catch((err) => {
              console.log("AXIOS INTERCEPTORS ERR", err);
              reject(err);
            });
        });
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get("/api/csrf-token");
      axios.defaults.headers["X-CSRF-Token"] = data.csrfToken;
    };
    getCsrfToken();
  }, []);

  //   אופציה ב
  // axios.interceptors.response.use(
  //     function (response) {
  //       return response;
  //     },
  //     function (error) {
  //       let res = error.response;
  //       if (res.status === 401 && res.config && !res.config._isRetryRequest) {
  //         return axios.get("/api/logout").then((data) => {
  //           console.log("/401 error > logout");
  //           localStorage.removeItem("user");
  //           router.push("/login");
  //         }).catch((err)=>{
  //           console.log('AXIOS INTERCEPTORS ERR', err);
  //           return Promise.reject(err);
  //         });
  //       } else {
  //         return Promise.reject(error);
  //       }
  //     }
  //   );

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
