const base_url = 'http://localhost:3000/api';

export const getAllCryptos = () => {
  return fetch(`${base_url}/cryptocurrencies`)
    .then(res => res.json())
    .then(data => ({ error: false, data }))
    .catch(err => ({ error: true, data: null }));
}