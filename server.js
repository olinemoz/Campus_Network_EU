require('dotenv').config()
const express = require('express')
const {MongoClient} = require('mongodb');
const mongoose = require('mongoose')
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId
const cookieParser = require('cookie-parser')
const SocketServer = require('./socketServer')
const {ExpressPeerServer} = require('peer')
const path = require('path')
const corsOptions = {
    Credential: 'true',

};

const app = express()
app.use(express.json())
app.options("*", cors(corsOptions));
app.use(cors(corsOptions))
app.use(cookieParser())


// Socket
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', socket => {
    SocketServer(socket)
})

// Create peer server
ExpressPeerServer(http, {path: '/'})


// Routes
app.use('/api', require('./routes/authRouter'))
app.use('/api', require('./routes/userRouter'))
app.use('/api', require('./routes/postRouter'))
app.use('/api', require('./routes/commentRouter'))
app.use('/api', require('./routes/adminRouter'));
app.use('/api', require('./routes/notifyRouter'))
app.use('/api', require('./routes/messageRouter'))


const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log('Database Connected!!')
})

const client = new MongoClient(URI);

async function run() {
    try {
        await client.connect();
        const database = client.db("Campus_Network");
        const usersCollection = database.collection("users");

        app.get('/users', async (req, res) => {
            const cursor = usersCollection.find({});
            const users = await cursor.toArray();
            console.log("Users: ", users)
            res.json(users);
        });
        app.delete('/users/:deleteUser', async (req, res) => {
            const deleteUser = req.params.deleteUser
            const query = {_id: ObjectId(deleteUser)}
            const result = await usersCollection.deleteOne(query);
            res.json(result)
        })

    } finally {
        // await client.close();
    }
}

run().catch(console.dir);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}


const port = process.env.PORT || 5000
http.listen(port, () => {
    console.log('Server is running on port', port)
})