import { Urls } from "../../src/routes/urls";

export const userLogin = (email, password) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${Urls?.baseUrl}${Urls?.login}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                password,
              }),
            });
      
            if (response.ok) {
              const data = await response.json(); 
              localStorage.setItem('token', data.token)
              dispatch({
                type: 'USER_LOGIN_SUCCESS',
                payload: {
                  token: data.token,
                },
              })
            } else {
              dispatch({
                type: 'USER_LOGIN_FAIL',
             
              })
              throw new Error("Network response was not ok");
            }
      
            console.log('Response:', response); 
          } catch (error) {
            console.error("Error:", error.message);
          }
      
    }
  }