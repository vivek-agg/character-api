import React, { useEffect, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
// import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Character from './Character/Character';
import { getCharacters } from '../actions';

const useStyles = makeStyles({
  main: {
    background: '#202329',
  },
  filterWrapper: {
    color: '#fff',
  },
  radioFilterWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid',
    width: 'calc(100% - 60px)',
    margin: '0 auto',
    display: 'flex',
    height: '100%',
  },
  searchFilterWrapper: {
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 'calc(100% - 60px)',
    margin: '0 auto',
    display: 'flex',
    height: '130px',
  },
  searchFilter: {
    // display: 'inline-block',
    background: '#fff',
  },
  clearFilter: {
    cursor: 'pointer',
    '& button': {
      width: '90px',
      height: '40px',
      cursor: 'pointer',
    },
  },
  formLabel: {
    color: '#fff',
  },
  spacing: {
    padding: '10px',
  },
  formgroups: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  radio: {
    color: '#fff !important',
  },
});

const initialState = {
  name: '',
  species: {
    value: '',
    allSpecies: [
      { id: 1, value: 'human', isChecked: false },
      { id: 2, value: 'alien', isChecked: false },
      { id: 3, value: 'Humanoid', isChecked: false },
    ],
  },
  gender: {
    value: '',
    allGenders: [
      { id: 1, value: 'female', isChecked: true },
      { id: 2, value: 'male', isChecked: false },
      { id: 3, value: 'genderless', isChecked: false },
      { id: 4, value: 'unknown', isChecked: false },
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

const Characters = () => {
  const [currState, dispatchLocalState] = useReducer(
    reducer,
    initialState,
  );

  const classes = useStyles();

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
        <Grid item xs={12} sm={4}>
          <div className={classes.searchFilterWrapper}>
            <div className={classes.searchFilter}>
              <InputBase
                className={classes.searchBox}
                placeholder="Search ex: Rick, Morty"
                inputProps={{ 'aria-label': 'search google maps' }}
                onChange={(e) => onInputChange(e.target.value)}
                value={currState.name}
              />
              <IconButton onClick={onSearch} aria-label="search">
                <SearchIcon />
              </IconButton>
            </div>
            <div className={classes.clearFilter}>
              <button type="button" onClick={clearAll}>
                Clear ALL
              </button>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={4} direction="row">
          <FormGroup className={classes.radioFilterWrapper}>
            <FormControl>
              <FormLabel className={classes.formLabel}>
                Gender
              </FormLabel>
              <RadioGroup
                className={classes.formgroups}
                aria-label="gender"
                name="gender"
                value={currState.gender.value}
                onChange={(e) =>
                  handleRadioChange(
                    e.target.value,
                    'gender',
                    currState,
                  )
                }
              >
                {currState.gender.allGenders.map((genderVal) => (
                  <FormControlLabel
                    key={genderVal.id}
                    value={genderVal.value}
                    control={<Radio className={classes.radio} />}
                    label={genderVal.value}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </FormGroup>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormGroup className={classes.radioFilterWrapper}>
            <FormControl>
              <FormLabel className={classes.formLabel}>
                Species
              </FormLabel>
              <RadioGroup
                className={classes.formgroups}
                aria-label="species"
                name="species"
                value={currState.species.value}
                onChange={(e) =>
                  handleRadioChange(e.target.value, 'species')
                }
              >
                {currState.species.allSpecies.map((speciesVal) => (
                  <FormControlLabel
                    key={speciesVal.id}
                    value={speciesVal.value}
                    control={<Radio className={classes.radio} />}
                    label={speciesVal.value}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </FormGroup>
        </Grid>
      </Grid>
      <Grid container item>
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

export default Characters;

// class Characters1 extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: '',
//       species: '',
//       gender: '',
//       characters: [],
//       ascending: true,
//       genders: [
//         { id: 1, value: 'female', isChecked: false },
//         { id: 2, value: 'male', isChecked: false },
//         { id: 3, value: 'genderless', isChecked: false },
//         { id: 4, value: 'unknown', isChecked: false },
//       ],
//       allSpecies: [
//         { id: 1, value: 'human' },
//         { id: 2, value: 'alien' },
//         { id: 3, value: 'Humanoid' },
//       ],
//     };
//   }

//   componentDidMount() {
//     store.dispatch(getCharDataBegin());
//   }

//   static getDerivedStateFromProps(props) {
//     const { data } = props;
//     if (props) {
//       return {
//         characters: data.results,
//         pages: data.info && data.info.pages,
//       };
//     }
//     return null;
//   }

//   handleChangeSort = () => {
//     const { characters, ascending } = this.state;
//     const sorted = characters.sort((a, b) => {
//       return ascending ? b.id - a.id : a.id - b.id;
//     });
//     this.setState((prevState) => ({
//       ascending: !prevState.ascending,
//       characters: sorted,
//     }));
//   };

//   handleChangeGender = (value) => (event) => {
//     const { species, gender } = this.state;
//     if (value === 'gender') {
//       this.setState({ gender: event.target.value, ascending: true });
//       store.dispatch(
//         getCharDataBegin({
//           gender: event.target.value,
//           species,
//         }),
//       );
//     } else if (value === 'species') {
//       this.setState({ species: event.target.value, ascending: true });
//       store.dispatch(
//         getCharDataBegin({
//           gender,
//           species: event.target.value,
//         }),
//       );
//     }
//   };

//   clearFilter = () => {
//     this.setState(
//       {
//         species: '',
//         gender: '',
//         name: '',
//       },
//       () => store.dispatch(getCharDataBegin()),
//     );
//   };

//   searchFilter = () => (e) => {
//     this.setState({
//       name: e.target.value,
//     });
//   };

//   clickSearch = () => {
//     const { name } = this.state;
//     store.dispatch(getCharDataBegin({ name }));
//   };

//   render() {
//     const {
//       characters,
//       name,
//       ascending,
//       genders,
//       gender,
//       allSpecies,
//       species,
//     } = this.state;
//     return (
//       <>
//         <div className="col-12 character-container">
//           <div className="col-3 filter-container">
//             <div className="search-bar">
//               <InputBase
//                 className=""
//                 placeholder="Search ex: Rick, Morty"
//                 inputProps={{ 'aria-label': 'search google maps' }}
//                 onChange={this.searchFilter()}
//                 value={name}
//               />
//               <IconButton
//                 onClick={this.clickSearch}
//                 aria-label="search"
//               >
//                 <SearchIcon />
//               </IconButton>
//             </div>
//             <div className="filter-header">
//               <h1>Filters</h1>{' '}
//               <button type="button" onClick={this.clearFilter}>
//                 Clear ALL
//               </button>
//             </div>
//             <FormGroup className="filter-wrap">
//               <FormControl>
//                 <FormLabel>Gender</FormLabel>
//                 <RadioGroup
//                   aria-label="gender"
//                   name="gender1"
//                   value={gender}
//                   onChange={this.handleChangeGender('gender')}
//                 >
//                   {genders.map((genderVal) => (
//                     <FormControlLabel
//                       key={genderVal.id}
//                       value={genderVal.value}
//                       control={<Radio />}
//                       label={genderVal.value}
//                     />
//                   ))}
//                 </RadioGroup>
//               </FormControl>
//             </FormGroup>
//             <FormGroup className="filter-wrap">
//               <FormControl>
//                 <FormLabel>Species</FormLabel>
//                 <RadioGroup
//                   aria-label="species"
//                   name="species1"
//                   value={species}
//                   onChange={this.handleChangeGender('species')}
//                 >
//                   {allSpecies.map((speciesVal) => (
//                     <FormControlLabel
//                       key={speciesVal.id}
//                       value={speciesVal.value}
//                       control={<Radio />}
//                       label={speciesVal.value}
//                     />
//                   ))}
//                 </RadioGroup>
//               </FormControl>
//             </FormGroup>
//           </div>

//           <div className="col-9 characters-wrap">
//             <div className="right-filter">
//               {' '}
//               <FormControlLabel
//                 control={
//                   <Switch
//                     checked={ascending}
//                     onChange={this.handleChangeSort}
//                     value={ascending}
//                     inputProps={{
//                       'aria-label': `${
//                         ascending ? 'Ascending' : 'Descending'
//                       }`,
//                     }}
//                   />
//                 }
//                 label={ascending ? 'Ascending' : 'Descending'}
//               />
//             </div>
//             <div className="card-wrapper">
//               {characters &&
//                 characters.map((character) => (
//                   <Character
//                     key={character.id}
//                     imageSrc={character.image}
//                     name={character.name}
//                     species={character.species}
//                     gender={character.gender}
//                     id={character.id}
//                     created={character.created}
//                     status={character.status}
//                     lastLocation={character.location.name}
//                     origin={character.origin.name}
//                   />
//                 ))}
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }
// }
// const mapStateToProps = (state) => ({
//   data: state.data && state.data,
// });

// export default compose(connect(mapStateToProps))(Characters1);
