import express from 'express';
import redis from 'redis';
import { promisify } from 'util';
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

const app = express();
const port = 1245;

const listProducts = [
  {
    id: 1,
    Suitcase: 250,
    price: 50,
    stock: 4,
  },
  {
    id: 2,
    Suitcase: 450,
    price: 100,
    stock: 10,
  },
  {
    id: 3,
    Suitcase: 650,
    price: 350,
    stock: 2,
  },
  {
    id: 4,
    Suitcase: 1050,
    price: 550,
    stock: 5,
  },
];

const getItemById = (id) => {
  const item = listProducts.filter((lp) => lp.id === id);

  if (item.length > 0) return item[0];
  else return undefined;
};

client
  .on('error', (error) => {
    console.log(`Redis client not connected to the server: ${error.message}`);
  })
  .on('connect', () => {
    console.log('Redis client connected to the server');
  });

function reserveStockById(itemId, stock) {
  client.set(`item.${itemId}`, stock);
}

async function getCurrentReservedStockById(itemId) {
  const stock = await getAsync(`item.${itemId}`);
  return stock;
}

app.get('/list_products', (req, res) => {
  res.status(200).json(listProducts);
});

app.get('/list_products/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId);
  const item = getItemById(itemId);

  if (!item) {
    return res.status(404).json({ status: 'Product not found' });
  }

  const currentStock = await getCurrentReservedStockById(itemId);
  console.log(currentStock);
  const stock = currentStock !== null ? currentStock : item.stock;
  console.log(stock);

  item.currentQuantity = stock;
  res.json(item);
});

app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId);
  const item = getItemById(itemId);
  const noStock = { status: 'Not enough stock available', itemId };
  const reservationConfirmed = { status: 'Reservation confirmed', itemId };

  if (!item) {
    res.json({ status: 'Product not found' });
    return;
  }

  let currentStock = await getCurrentReservedStockById(itemId);
  if (currentStock === null) currentStock = item.stock;

  if (currentStock <= 0) {
    res.json(noStock);
    return;
  }

  reserveStockById(itemId, Number(currentStock) - 1);

  res.json(reservationConfirmed);
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
