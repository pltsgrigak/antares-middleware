const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/api/data', async (req, res) => {
  const data = req.body;

  console.log('Data dari ESP32:', data);

  try {
    const response = await axios.post(
      'https://platform.antares.id:8443/~/antares-cse/antares-id/sektor16/MONITORING_PLTS',
      {
        "m2m:cin": {
          "con": JSON.stringify(data)
        }
      },
      {
        headers: {
          'X-M2M-Origin': '734bbec3d3ff38cc:8dc0845904c1c744',   // Ganti dengan API Key kamu
          'Content-Type': 'application/json;ty=4',
          'Accept': 'application/json'
        }
      }
    );

    res.send('Data diterima & dikirim ke Antares');
  } catch (error) {
    console.error('Gagal kirim ke Antares:', error.message);
    res.status(500).send('Gagal kirim ke Antares');
  }
});

app.get('/', (req, res) => {
  res.send('Middleware aktif!');
});

app.listen(port, () => {
  console.log(`Server jalan di http://localhost:${port}`);
});
