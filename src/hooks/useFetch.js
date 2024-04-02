import axios from "axios";
import React, { useState } from "react";

const useFetch = (url) => {

  const [response, setResponse] = useState()

  const getApi = (callback) => {
    axios.get(url)
      .then(res => setResponse(res.data))
      .catch(err => console.log(err))
      .finally(callback)
  }

  const getApiTypes = (urlType, callback) => {
    axios.get(urlType)
    .then(res => {
      const obj = {
        results: res.data.pokemon.map(poke => poke.pokemon)
      }
      setResponse(obj)
    })
    .catch(err => console.log(err))
    .finally(callback)
  }

  return [ response, getApi, getApiTypes ]
};

export default useFetch;
