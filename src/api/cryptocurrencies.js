export const getAllCryptos = () => {
  return fetch('api/cryptocurrencies')
    .then(res => res.json())
    .then(data => ({ error: false, data }))
    .catch(err => ({ error: true, data: null }));
}