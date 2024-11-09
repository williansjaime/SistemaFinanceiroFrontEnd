export const API_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : `http://${window.location.hostname}:5001`;

//export const API_URL = "http://192.168.18.49:5001";//"http://localhost:5000";