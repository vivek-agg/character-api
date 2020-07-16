import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import useStyles from './CharacterStyle';

const getYear = (date) => {
  return new Date().getFullYear() - new Date(date).getFullYear();
};

const Character = (props) => {
  const { classes, item } = props;
  const {
    image,
    gender,
    species,
    status,
    name,
    origin,
    location,
    id,
    created,
  } = item;
  return (
    <div className={classes.characterWrapper}>
      <div className={classes.headerWrapper}>
        <div className={classes.characterImageWrapper}>
          <img
            className={classes.characterImage}
            src={image}
            alt="Character"
          />
        </div>
        <div className={classes.header}>
          <p className={classes.headerName}>{name}</p>
          <p>{`id: ${id} - create ${getYear(created)} years ago`}</p>
        </div>
      </div>
      <div className={classes.detailsWrapper}>
        <div className={classes.details}>
          <div>STATUS</div>
          <div className={classes.rightDetails}>{status}</div>
        </div>
        <div className={classes.details}>
          <div>SPECIES</div>
          <div className={classes.rightDetails}>{species}</div>
        </div>
        <div className={classes.details}>
          <div>GENDER</div>
          <div className={classes.rightDetails}>{gender}</div>
        </div>
        <div className={classes.details}>
          <div>ORIGIN</div>
          <div className={classes.rightDetails}>{origin.name}</div>
        </div>
        <div className={classes.details}>
          <div>LAST LOCATION</div>
          <div className={classes.rightDetails}>{location.name}</div>
        </div>
      </div>
    </div>
  );
};

// export default withStyles(useStyles)(Character);
export default withStyles(useStyles)(Character);
