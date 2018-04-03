import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button';
import materialUIRoot from '../materialUIRoot';
import { LinearProgress } from 'material-ui/Progress';

const styles = theme => ({
    content: {
      width: 420,
      margin: 'auto'
    },
    description: {
      margin: '50px 10px'
    },
    colorBox: {
      height: 80,
      width: 350,
      margin: '0 auto'
    },
    colorPickControl: {
      padding: '20px 50px',
      display: 'flex',
      justifyContent: 'space-around'
    },
    divider: {
      width: 2,
      backgroundColor: 'rgba(0, 0, 0, 0.54)'
    },
    progressBar: {
      margin: '30px auto',
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      width: 350,
    }
  });

class TrainPage extends React.Component {

  render() {
    const { classes, progress, randomColor, handleMoodClick, network, nextStepClick } = this.props
    return (
    <div className={classes.content}>
      <div className={classes.description}>
        <Typography variant="display1" component="h3">
          Let's first train AI
        </Typography>
        <Typography component="p">
          Click on smiles according to your mood on given color.
        </Typography>
      </div>
      <div className={classes.colorPick}>
        <LinearProgress className={classes.progressBar} variant="determinate" value={progress} />
        <Paper className={classes.colorBox} elevation={6} style={{ backgroundColor: `rgba(${randomColor.r}, ${randomColor.b}, ${randomColor.g}, 1)`}}/>
        <div className={classes.colorPickControl}>
          <div>
            <Button variant="fab" color="primary" aria-label="add" onClick={handleMoodClick}>
              <img alt="" width="50px" src={process.env.PUBLIC_URL + '/happy.svg'} id="happy"/>
            </Button>
            <Typography component="p">
              happy
            </Typography>
          </div>
          <div className={classes.divider}/> 
          <div>
            <Button variant="fab" color="primary" aria-label="add" onClick={handleMoodClick}>
              <img alt="" width="50px" src={process.env.PUBLIC_URL + '/sad.svg'} id="sad"/>
            </Button>
            <Typography component="p">
              sad
            </Typography>
          </div>
        </div>
      </div>
      { network &&
        <Button className={classes.getStarted}  variant="raised" color="secondary" onClick={nextStepClick}>
          next
        </Button>
      }
    </div>
    );
  }
}

TrainPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default materialUIRoot(withStyles(styles)(TrainPage));