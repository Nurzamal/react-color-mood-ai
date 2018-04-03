import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import materialUIRoot from '../materialUIRoot';
import brain from 'brain.js'
import ReactTransitionGroupPlus from 'react-transition-group-plus'


import AppBar from '../components/AppBar'
import GetStarted from '../components/GetStarted'
import Train from '../components/Train'
import Animates from '../components/AnimatedContent'

const styles = theme => ({
  root: theme.mixins.gutters({
    textAlign: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    minHeight: '90vh',
  }),
});

class MainPage extends React.Component {
  state = {
    page: 'getStarted',
    progress: 0,
    randomColor: { r: 0, g: 0, b: 0 },
    trainingDataSet: [],
    network: null
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
    // const result = brain.likely({r: 101, g: 164, b: 115}, network)
    // const result1 = network.run({r: 101, g: 164, b: 115})
    this.setState({ network })
  }

  handleMoodClick = (e) => {
    const newDataSet = JSON.parse(JSON.stringify(this.state.trainingDataSet))
    const newProgress = this.state.progress + 10
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

  nextStepClick = () => {
    if (this.state.page === "getStarted") this.setState({ page: "train" })
    if (this.state.page === "train") this.setState({ page: "results" })
  }

  getComponentForRender = () => {
    if (this.state.page === "getStarted") return <GetStarted nextStepClick={this.nextStepClick}/>
    if (this.state.page === "train") return (
      <Train 
        in={this.state.page === "train"}
        progress={this.state.progress}
        handleMoodClick={this.handleMoodClick}
        randomColor={this.state.randomColor}
        network={this.state.network}
        nextStepClick={this.nextStepClick}
      />
    )
    if (this.state.page === "results") return <div />
  }

  render() {    
    const { classes } = this.props;
    return (
      <div>
        <AppBar />
        <div className={classes.root}>
          <Paper className={classes.root} elevation={4}>
          <ReactTransitionGroupPlus
            transitionMode="out-in"
            component="div"
            className="output-panel"
            onClick={this.handleClick}
            >
            <Animates
              key={this.state.page}
              enterDuration={0.8}
              leaveDuration={0.3}
              component={this.getComponentForRender()}
            />
          </ReactTransitionGroupPlus>
          </Paper>
        </div>
      </div>
    );
  }
}

MainPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default materialUIRoot(withStyles(styles)(MainPage));