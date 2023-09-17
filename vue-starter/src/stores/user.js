// stores/counter.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return { 
      token: "" ,
      user:{}
    }
  },
  actions: {
    setToken(token) {
      this.token = token;
    },
    setUser(user){
      this.user = user;
    }
  },
})