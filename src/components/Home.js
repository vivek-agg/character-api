import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  homeContainer: {
    height: 'calc(100vh - 83px)',
    background:
      'url(/rick-and-morty-app/static/media/rickandmorty2.825488f7.png) no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: '50%',
  },
});

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.homeContainer}>
      <p>Hi! This is my Rick And Morty App</p>
    </div>
  );
};

export default Home;
