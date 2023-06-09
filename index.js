import express from 'express';
import { Server } from 'socket.io';
import connect from './database/dbConnection.js';
import countryRouter from './src/modules/countries/countries.routes.js';
import cors from 'cors';
import morgan from 'morgan';
import { AppError } from './src/utils/response.error.js';
import jobRouter from './src/modules/jobs/jobs.routes.js';
import userRouter from './src/modules/user/user.routes.js';
import charityRouter from './src/modules/charity/charity.routes.js';
import convoyRouter from './src/modules/convoys/convoys.routes.js';
import boxRouter from './src/modules/donationBoxes/boxes.routes.js';
import financeRouter from './src/modules/finance/finance.controller.js';
import donateRouter from './src/modules/donate/donate.routes.js';
import authRouter from './src/modules/auth/auth.router.js'
import chatRouter from './src/modules/chat/chat.router.js';


// import { Socket } from 'socket.io';
// const socket = require("socket.io");


// import {createInvoice} from './src/utils/pdf.js'
const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.static('uploads'));

app.get('/', (req, res) => res.send('Hello World!'))
app.use('/auth', authRouter)
app.use('/chat',chatRouter)

app.use('/api/countries',countryRouter);
app.use('/api/jobs',jobRouter);
app.use('/api/users' , userRouter);
app.use('/api/charity' , charityRouter);
app.use('/api/convoys' , convoyRouter);
app.use('/api/donation/boxes' , boxRouter);
app.use('/api/finance',financeRouter);
app.use('/api/donate' , donateRouter);
app.all('*',(req , res , next)=>{
    next(new AppError('Not Found' , 404));
});

// const invoice = {
//   shipping: {
//     name: "John Doe",
//     address: "1234 Main Street",
//     city: "San Francisco",
//     state: "CA",
//     country: "US",
//     postal_code: 94111
//   },
//   items: [
//     {
//       item: "TC 100",
//       description: "Toner Cartridge",
//       quantity: 2,
//       amount: 6000
//     },
//     {
//       item: "USB_EXT",
//       description: "USB Cable Extender",
//       quantity: 1,
//       amount: 2000
//     }
//   ],
//   subtotal: 8000,
//   paid: 0,
//   invoice_nr: 1234
// };

// createInvoice(invoice, "invoice.pdf");

//Global error
app.use((err , req , res , next)=>{
    res.status(err.statusCode).json({message: err.message});
})

const server = app.listen(port , ()=>{
    console.log('listening on port ' + port);
});

// const io = new Server(server);

const io = new Server(server,{
    cors:'*'
    // cors:{
    //  origin:"http://localhost:4000" ,
    //  Credentials: true 
    // }
})
global.onlineUsers = new Map();

io.on("connection",(socket)=>{
    global.chatSocket=socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
        console.log(onlineUsers);
    })

    socket.on("send-msg",(data)=>{
        console.log(onlineUsers);
        const sendUserSocket=onlineUsers.get(data.to);
        console.log(data.to);
        if(sendUserSocket){
            console.log("add........");
            socket.to(sendUserSocket).emit("msg-recieve",data.message)
            console.log("done........");
        }
    })
})

