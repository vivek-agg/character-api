import React, { useEffect, useReducer } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Character from '../Character/Character';
import { getCharacters } from '../../actions';
import useStyles from './CharactersStyle';

const initialState = {
  name: '',
  species: {
    value: '',
    allSpecies: [
      { id: 1, value: 'human' },
      { id: 2, value: 'alien' },
      { id: 3, value: 'Humanoid' },
    ],
  },
  gender: {
    value: '',
    allGenders: [
      { id: 1, value: 'female' },
      { id: 2, value: 'male' },
      { id: 3, value: 'genderless' },
      { id: 4, value: 'unknown' },
    ],
  },
};

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'inputChange':
      return { ...state, name: action.value };
    case 'genderRadioChange':
      return {
        ...state,
        gender: { ...state.gender, value: action.value },
      };
    case 'speciesRadioChange':
      return {
        ...state,
        species: { ...state.species, value: action.value },
      };
    default:
      return state;
  }
};

const Characters = (props) => {
  const [currState, dispatchLocalState] = useReducer(
    reducer,
    initialState,
  );

  const { classes } = props;

  const dispatch = useDispatch();
  const onInputChange = (value) => {
    dispatchLocalState({ type: 'inputChange', value });
  };
  const onSearch = () => {
    dispatch(
      getCharacters({
        name: currState.name,
        gender: currState.gender.value,
        species: currState.species.value,
      }),
    );
  };

  const handleRadioChange = (value, type) => {
    const { name } = currState;
    let gender = currState.gender.value;
    let species = currState.species.value;

    if (type === 'gender') {
      dispatchLocalState({ type: 'genderRadioChange', value });
      gender = value;
    } else {
      dispatchLocalState({ type: 'speciesRadioChange', value });
      species = value;
    }
    dispatch(
      getCharacters({
        name,
        gender,
        species,
      }),
    );
  };

  const clearAll = () => {
    dispatchLocalState({ type: 'genderRadioChange', value: '' });
    dispatchLocalState({ type: 'speciesRadioChange', value: '' });
    dispatchLocalState({ type: 'inputChange', value: '' });
    dispatch(
      getCharacters({
        name: '',
        gender: '',
        species: '',
      }),
    );
  };

  useEffect(() => {
    dispatch(getCharacters());
  }, []);

  const characters = useSelector((store) => store.results);

  return (
    <div className={classes.main}>
      <Grid container className={classes.filterWrapper}>
        <div className={classes.searchFilterWrapper}>
          <div className={classes.searchFilter}>
            <InputBase
              className={classes.searchBox}
              placeholder="Enter a name"
              onChange={(e) => onInputChange(e.target.value)}
              value={currState.name}
            />
            <IconButton onClick={onSearch} aria-label="search">
              <SearchIcon />
            </IconButton>
          </div>
        </div>
        <FormGroup className={classes.dropDown}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">
              Gender
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currState.gender.value}
              onChange={(e) =>
                handleRadioChange(e.target.value, 'gender', currState)
              }
            >
              {currState.gender.allGenders.map((genderVal) => (
                <MenuItem value={genderVal.value} key={genderVal.id}>
                  {genderVal.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FormGroup>
        <FormGroup className={classes.dropDown}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">
              Species
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currState.species.value}
              onChange={(e) =>
                handleRadioChange(
                  e.target.value,
                  'species',
                  currState,
                )
              }
            >
              {currState.species.allSpecies.map((speciesVal) => (
                <MenuItem
                  value={speciesVal.value}
                  key={speciesVal.id}
                >
                  {speciesVal.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FormGroup>
        <div className={classes.clearFilter}>
          <button type="button" onClick={clearAll}>
            Clear All
          </button>
        </div>
      </Grid>
      <Grid container item className={classes.charactersWrapper}>
        {characters &&
          characters.map((item) => (
            <Grid item xs={6} sm={3} className={classes.spacing}>
              <Character item={item} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default withStyles(useStyles)(Characters);
