import app from './app'; // Tuodaan alustettu Express-sovellus

const PORT = 5000;

// Käynnistetään palvelin
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});