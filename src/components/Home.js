import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  homeContainer: {
    height: 'calc(100vh - 83px)',
    background:
      'url(https://thehumanist.com/wp-content/uploads/2015/09/rickmorty.jpg) no-repeat',
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
