import Vue from 'vue'
import io from 'socket.io-client'

Vue.prototype.$socket = io('http://localhost:3001')
