import { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
} from '@mui/material';

// import { ExampleContext } from '../store/example';
import useFetch from './../hooks/useFetch.hook';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '100px',
  },
  card: {
    padding: '7px',
    border: '1px solid #0003',
    borderRadius: '5px',
    height: '100%',
  },
}));

const Home = () => {
  const classes = useStyles();
  // const { example } = useContext(ExampleContext);

  const [api, pageApi, filter, handleChangePageApi, handleClick, handleChange] =
    useFetch('https://rickandmortyapi.com/api/character', {
      defaultFilter: { status: '', gender: '' },
    });

  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container justifyContent="center" spacing={5} padding={3}>
        {/* filters */}
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Name"
                name="name"
                size="small"
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>status</InputLabel>
                <Select
                  value={filter.status}
                  label="Status"
                  name="status"
                  onChange={handleChange}
                  fullWidth>
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="alive">Alive</MenuItem>
                  <MenuItem value="dead">Dead</MenuItem>
                  <MenuItem value="unknown">Unknown</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Species"
                name="species"
                size="small"
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Type"
                name="type"
                size="small"
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Gender</InputLabel>
                <Select
                  value={filter.gender}
                  label="Gender"
                  name="gender"
                  onChange={handleChange}>
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="genderless">Genderless</MenuItem>
                  <MenuItem value="unknown">Unknown</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Button variant="contained" onClick={handleClick} fullWidth>
                Clear
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {/* loader */}
        {!api && (
          <Grid item xs={12} textAlign="center">
            <CircularProgress />
          </Grid>
        )}

        {/* list items */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {api &&
              api.results.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <div className={classes.card}>
                    <div>-name : {item.name}</div>
                    <div>*status : {item.status}</div>
                    <div>*species : {item.species}</div>
                    {item.type && <div>*type : {item.type}</div>}
                    <div>*gender : {item.gender}</div>
                  </div>
                </Grid>
              ))}
          </Grid>
        </Grid>

        {/* Pagination */}
        {api && (
          <Grid item xs={6}>
            <Pagination
              count={api.info.pages}
              page={pageApi}
              onChange={handleChangePageApi}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Home;
