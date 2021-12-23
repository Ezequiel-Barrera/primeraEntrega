import express from 'express';
import productoRoute from './routes/productroute';
import carritoRoute from './routes/cartroute';


const app = express();
const port = process.env.PORT || 8080;
const server = app.listen(port, () => console.log('Servidor Up!, en puerto', port));

server.on('error', (err) => { console.log('Server Error', err)});

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/producto", productoRoute), app.use("/carrito", carritoRoute);

app.get('/', (req, res) => {res.sendFile(__dirname + "../public/index.html")});