import React, { useEffect, useReducer, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import _ from 'lodash';
import Character from '../Character/Character';
import { getCharacters } from '../../actions';
import useStyles from './CharactersStyle';

const initialState = {
  ascending: true,
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
    case 'genderDropChange':
      return {
        ...state,
        gender: { ...state.gender, value: action.value },
      };
    case 'speciesDropChange':
      return {
        ...state,
        species: { ...state.species, value: action.value },
      };
    case 'changeSort':
      return { ...state, ascending: action.value };
    default:
      return state;
  }
};
// Debounce method
const sendQuery = (obj, dispatch) => dispatch(getCharacters(obj));

const Characters = (props) => {
  const [currState, dispatchLocalState] = useReducer(
    reducer,
    initialState,
  );

  const { classes } = props;

  const dispatch = useDispatch();
  const delayedQuery = useRef(
    _.debounce((obj) => sendQuery(obj, dispatch), 500),
  ).current;

  const onInputChange = (value) => {
    const obj = {
      gender: currState.gender.value,
      species: currState.species.value,
      name: value,
    };
    dispatchLocalState({ type: 'inputChange', value });
    delayedQuery(obj);
  };

  const handleDropChange = (value, type) => {
    const { name } = currState;
    let gender = currState.gender.value;
    let species = currState.species.value;

    if (type === 'gender') {
      dispatchLocalState({ type: 'genderDropChange', value });
      gender = value;
    } else {
      dispatchLocalState({ type: 'speciesDropChange', value });
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

  const handleChangeSort = () => {
    dispatchLocalState({
      type: 'changeSort',
      value: !currState.ascending,
    });
  };

  const clearAll = () => {
    dispatchLocalState({ type: 'genderDropChange', value: '' });
    dispatchLocalState({ type: 'speciesDropChange', value: '' });
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
            <IconButton aria-label="search">
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
                handleDropChange(e.target.value, 'gender', currState)
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
                handleDropChange(e.target.value, 'species', currState)
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
        <FormControl
          component="fieldset"
          className={classes.dropDown}
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={currState.ascending}
                  onChange={handleChangeSort}
                  name="sort"
                />
              }
              label={currState.ascending ? 'Ascending' : 'Descending'}
            />
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid container item className={classes.charactersWrapper}>
        {characters &&
          characters
            .sort((a, b) => {
              return currState.ascending ? a.id - b.id : b.id - a.id;
            })
            .map((item) => (
              <Grid
                item
                xs={6}
                sm={3}
                className={classes.spacing}
                key={item.id}
              >
                <Character item={item} />
              </Grid>
            ))}
      </Grid>
    </div>
  );
};

export default withStyles(useStyles)(Characters);
