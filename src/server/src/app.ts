import express from 'express';
import cors from 'cors';
import helloRoute from './routes/taskRoute';
import connectWithRetry from './config/db';

const app = express();
const PORT = process.env.PORT || 3000;

//määritetään CORS-asetukset
app.use(cors({
  origin: 'http://localhost:5173', //frontendin osoite
  methods: ['GET', 'POST'], //sallitut HTTP-metodit
}));

//lisätään reitit
app.use('/api', helloRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  //kutsutaan MongoDB-yhteysfunktiota kun palvelin on luotu
  connectWithRetry();
});

app.use(express.json()); 

//exportataan app, jotta sitä voidaan käyttää muissa tiedostoissa
export default app;