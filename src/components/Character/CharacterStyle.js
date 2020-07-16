const useStyles = {
  characterWrapper: {
    background: '#323131',
    // width: '300px',
    boxShadow: '0 0 10px #000',
    color: '#fff',
  },
  headerWrapper: {
    position: 'relative',
  },
  header: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    background: 'rgba(0, 0, 0, 0.75)',
    padding: '12px',
  },
  headerName: {
    fontSize: '26px',
    fontWeight: '700',
  },
  characterImage: {
    width: '100%',
  },
  detailsWrapper: {
    padding: '12px',
  },
  details: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #000',
    padding: '10px 0',
    fontSize: '12px',

    '&:last-child': {
      borderBottom: 'none',
    },
  },
  rightDetails: {
    color: '#ff9800',
  },
};

export default useStyles;
