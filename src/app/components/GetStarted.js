import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import materialUIRoot from '../materialUIRoot';

const styles = theme => ({
  content: {
    margin: '50px 10px'
  },
  getStarted: {
    marginTop: '200px',
  }
});

class MainPage extends React.Component {
  render() {
    const { classes } = this.props
    
    return (      
      <div className={classes.content}>
        <Typography variant="display1" gutterBottom>
          React Color Mood AI
        </Typography>
        <Typography variant="subheading" gutterBottom>
          App will learn to determine color's mood based on your inputs with Machine Learning under the hood.
        </Typography>
          <Button className={classes.getStarted}  variant="raised" color="secondary" onClick={this.props.getStartedClick}>
            Get Started
          </Button>
      </div>
    );
  }
}

MainPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default materialUIRoot(withStyles(styles)(MainPage));