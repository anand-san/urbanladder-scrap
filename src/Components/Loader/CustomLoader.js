import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

// Inspired by the former Facebook spinners.
const useStylesFacebook = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  top: {
    color: '#1a90ff',
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
  },
  circle: {
    strokeLinecap: 'round',
  },
}));

export default function CustomCircularProgress(props) {
  const classes = useStylesFacebook();
  const size = props.size || 25
  const thickness = props.thickness || 2
  return (
	  <div style={{display: 'flex', justifyContent: 'center'}}>
    <div className={classes.root} >
      <CircularProgress
        variant="determinate"
        className={classes.bottom}
        size={size}
        thickness={thickness}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={size}
        thickness={thickness}
        {...props}
      />
    </div>
	</div>
  );
}

