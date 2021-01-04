import Vue from 'vue'
import io from 'socket.io-client'

Vue.prototype.$socket = io(`${process.env.SOCKET_HOST}:${process.env.PORT}`, {
  transports: ['websocket'],
  secure: process.env.SOCKET_SECURE,
})
