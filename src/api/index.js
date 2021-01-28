import axios from 'axios'

const request = axios.create()

/**
 * {"user":{    
    "email": "jake@jake.jake",   
    "password": "jakejake"
      }
    }
 */
export const login = (user) =>
  request({
    method: 'POST',
    url: 'https://conduit.productionready.io/users/login',
    user,
  })

/**
 * {"user":{   
    "username": "Jacob",
    "email": "jake@jake.jake",
    "password": "jakejake"
     }
    }
 */
export const register = (user) =>
  request({
    method: 'POST',
    url: 'https://conduit.productionready.io/users',
    user,
  })
