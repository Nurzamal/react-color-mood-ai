import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button';
import materialUIRoot from '../materialUIRoot';
import { LinearProgress } from 'material-ui/Progress';
import AppBar from '../components/AppBar'
import brain from 'brain.js'

const styles = theme => ({
    root: theme.mixins.gutters({
      textAlign: 'center',
      paddingTop: 16,
      paddingBottom: 16,
      minHeight: '90vh'
      // marginTop: theme.spacing.unit * 3,
    }),
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
  state = {
    progress: 0,
    randomColor: { r: 0, g: 0, b: 0 },
    trainingDataSet: []
  };

  componentDidMount() {
    this.getRandomRgb()
  }

  getRandomRgb = () => {
    const randomColor = {
      r: Math.round(Math.random()*205),
      g: Math.round(Math.random()*205),
      b: Math.round(Math.random()*205),
    }
    this.setState({ randomColor })
  }

  trainNetwork = () => {
    const network = new brain.NeuralNetwork()
    network.train(this.state.trainingDataSet)
    const result = brain.likely({r: 101, g: 164, b: 115}, network)
    const result1 = network.run({r: 101, g: 164, b: 115})
    console.log(result, result1);
  }

  handleMoodClick = (e) => {
    const newDataSet = JSON.parse(JSON.stringify(this.state.trainingDataSet))
    const newProgress = this.state.progress + 10
    console.log(e.target.id);
    if (e.target.id === "happy") {
      newDataSet.push({
        input: { r: this.state.randomColor.r, g: this.state.randomColor.g, b: this.state.randomColor.b }, output: { happy: 1 }
      })
    } else {
      newDataSet.push({
        input: { r: this.state.randomColor.r, g: this.state.randomColor.g, b: this.state.randomColor.b }, output: { sad: 1 }
      })
    }
    if (newProgress < 100) this.setState({ trainingDataSet: newDataSet, progress: newProgress }, this.getRandomRgb())
    else if (newProgress === 100) this.setState({ trainingDataSet: newDataSet, progress: newProgress }, this.trainNetwork())
  }

  render() {
    const { classes } = this.props;
    const { randomColor } = this.state
    return (
      <div>
        <AppBar />
          <div className={classes.root}>
          <Paper className={classes.root} elevation={4}>
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
                <LinearProgress className={classes.progressBar} variant="determinate" value={this.state.progress} />
                <Paper className={classes.colorBox} elevation={6} style={{ backgroundColor: `rgba(${randomColor.r}, ${randomColor.b}, ${randomColor.g}, 1)`}}/>
                <div className={classes.colorPickControl}>
                  <div>
                    <Button variant="fab" color="primary" aria-label="add" onClick={this.handleMoodClick}>
                      <img alt="" width="50px" src={process.env.PUBLIC_URL + '/happy.svg'} id="happy"/>
                    </Button>
                    <Typography component="p">
                      happy
                    </Typography>
                  </div>
                  <div className={classes.divider}/> 
                  <div>
                    <Button variant="fab" color="primary" aria-label="add" onClick={this.handleMoodClick}>
                      <img alt="" width="50px" src={process.env.PUBLIC_URL + '/sad.svg'} id="sad"/>
                    </Button>
                    <Typography component="p">
                      sad
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </Paper>
          </div>
      </div>
    );
  }
}

TrainPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default materialUIRoot(withStyles(styles)(TrainPage));