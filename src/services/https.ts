// src/services/https.ts

import axios from 'axios';
const https = axios.create({
  baseURL: 'https://climbe-api.fluxiaapp.com.br/api/'
});

export default https;
