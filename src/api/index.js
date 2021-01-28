import axios from 'axios'

const request = axios.create({
  baseURL: 'https://conduit.productionready.io/api',
  timeout: 15000,
})

// request.interceptors.response.use(
//   function (response) {
//     return response
//   },
//   function (error) {
//     //服务器返回的错误信息，常见的400请求错了，这里能看到400请求返回的错误信息
//     console.log(error.response)
//     return Promise.reject(error)
//   },
// )

/**
 * {"user":{    
    "email": "jake@jake.jake",   
    "password": "jakejake"
      }
    }
 */
export const login = (data) =>
  request({
    method: 'POST',
    url: '/users/login',
    data: { user: data },
  })

/**
 * {"user":{   
    "username": "Jacob",
    "email": "jake@jake.jake",
    "password": "jakejake"
     }
    }
 */
export const register = (data) =>
  request({
    method: 'POST',
    url: '/users',
    data: { user: data },
  })
