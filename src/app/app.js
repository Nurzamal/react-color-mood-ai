import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import materialUIRoot from './materialUIRoot';

import AppBar from './components/AppBar'

const styles = theme => ({
  root: {
    textAlign: 'center',
  },
});

class App extends React.Component {
  state = {
    open: false,
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClick = () => {
    this.setState({
      open: true,
    });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <AppBar />
        <Dialog open={open} onClose={this.handleClose}>
          <DialogTitle>Get Started</DialogTitle>
          <DialogContent>
            <DialogContentText>There is nothing yet</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>
              OK :(
            </Button>
          </DialogActions>
        </Dialog>
        <Typography variant="display1" gutterBottom>
          React Color Mood AI
        </Typography>
        <Typography variant="subheading" gutterBottom>
          App will learn to determine color's mood based on your inputs with Machine Learning under the hood.
        </Typography>
        <Button variant="raised" color="secondary" onClick={this.handleClick}>
          Get Started
        </Button>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default materialUIRoot(withStyles(styles)(App));