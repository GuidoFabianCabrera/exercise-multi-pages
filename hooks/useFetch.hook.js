import axios from 'axios';
import { useEffect, useState } from 'react';

const queryString = require('query-string');

const useFetch = (apiUrl, { defaultFilter, isMoreButton = false }) => {
  //-------------------------- Filter --------------------------

  const [filter, setFilter] = useState(defaultFilter);

  const handleChange = (event) => {
    setFilter({
      ...filter,
      [event.target.name]: event.target.value,
    });

    setPageApi(1);
  };

  const handleClick = () => {
    setFilter(defaultFilter);
  };

  const handleClickMore = () => {
    if (pageApi < api.info.pages) {
      setPageApi(pageApi + 1);
    }
  };

  //-------------------------- Data --------------------------

  const [pageApi, setPageApi] = useState(1);

  const [api, setApi] = useState();

  const handleChangePageApi = (event, value) => {
    setPageApi(value);
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}?page=${pageApi}&${queryString.stringify(filter)}`)

      .then((response) => {
        if (isMoreButton && response.data.info.pages < pageApi) {
          return;
        }

        if (isMoreButton && pageApi > 1) {
          setApi({
            info: { ...response.data.info },

            results: [...api.results, ...response.data.results],
          });

          return;
        }

        setApi({
          info: { ...response.data.info, page: pageApi },

          results: response.data.results,
        });
      })
      .catch((err) => {
        setApi();
        console.log(err);
      });
  }, [pageApi, filter]);

  return [
    api,
    pageApi,
    filter,
    handleChangePageApi,
    handleClick,
    handleChange,
    handleClickMore,
  ];
};

export default useFetch;
