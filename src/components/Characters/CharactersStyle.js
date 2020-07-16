const useStyles = {
  filterWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '120px',
  },

  searchFilterWrapper: {
    width: '250px',
    border: '1px solid rgba(0,0,0,0.5)',
    paddingLeft: '20px',
    borderRadius: '25px',
  },
  dropDown: {
    width: '100px',
    margin: '0 30px',
  },
  formControl: {
    marginTop: '-16px',
  },
  clearFilter: {
    cursor: 'pointer',
    '& button': {
      width: '90px',
      height: '40px',
      cursor: 'pointer',
    },
  },
  spacing: {
    padding: '10px',
  },
};

export default useStyles;
