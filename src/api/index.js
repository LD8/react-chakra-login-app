import axios from 'axios'

const request = axios.create()

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
    url: 'https://conduit.productionready.io/api/users/login',
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
    url: 'https://conduit.productionready.io/api/users',
    data: { user: data },
  })
