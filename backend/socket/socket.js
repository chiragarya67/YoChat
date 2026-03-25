import http from 'http'
import express from 'express'
import { Server } from 'socket.io'

let app = express()

const server = http.createServer(app)
const io = new Server(server, {
    cors:{
        origin:"https://yochat-chat-with-friend.onrender.com"
    }
})
 const userSocketMap = {}
 export const getReciverSid = (reciever)=>{
    return userSocketMap[reciever]
 }

 io.on("connection", (socket)=>{
    const userId=socket.handshake.query.userId 
    if(userId!=undefined){
        userSocketMap[userId]=socket.id
    } 
    io.emit("getOnlineUsers", Object.keys(userSocketMap))
   
    socket.on("disconnect",()=>{
      delete userSocketMap[userId]
      io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })

 })



export {app, server, io}
