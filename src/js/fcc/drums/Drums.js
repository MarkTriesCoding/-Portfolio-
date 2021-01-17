import '../../../scss/fcc/drums.scss'
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Madewith from './Madewith.jsx'
import React from 'react'
import ReactDOM from 'react-dom'

const pads = [{
  padKey: "Q",
  sound: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  type: "Chord-1",
  keyCode: 81
}, {
  padKey: "W",
  sound: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  type: "Chord-2",
  keyCode: 87
}, {
  padKey: "E",
  sound: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
  type: "Chord-3",
  keyCode: 69
}, {
  padKey: "A",
  sound: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  type: "HH-Closed",
  keyCode: 65
}, {
  padKey: "S",
  sound: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  type: "HH-Open",
  keyCode: 83
}, {
  padKey: "D",
  sound: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  type: "Kick-n-Hat",
  keyCode: 68
}, {
  padKey: "Z",
  sound: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
  type: "Snare",
  keyCode: 90
}, {
  padKey: "X",
  sound: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  type: "Kick-1",
  keyCode: 88
}, {
  padKey: "C",
  sound: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  type: "Kick-2",
  keyCode: 67
}];

const activeStyle = {
  boxShadow: "0px 1px 2px 1px rgba(0,255,0,0.75)",
  background: "radial-gradient(rgba(30,40,30,1),rgba(20,20,20,1))"
}
const defaultStyle = {
  boxShadow: "0px 0.5px 5px 1px rgba(255,0,0,0.7)",
  background: "radial-gradient(rgba(35,30,30,1),rgba(10,10,10,1))"
}


class DrumPad extends React.Component {
  constructor(props) {
    super(props)
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.playBeat = this.playBeat.bind(this);
    this.pressStyle = this.pressStyle.bind(this);
    this.state = {
      style: defaultStyle
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(e) {
    if (e.keyCode === this.props.keyCode) {
      this.playBeat();
    }
  }

  pressStyle() {
    if (this.state.style === defaultStyle) {
      this.setState({
        style: activeStyle
      })
    } else {
      this.setState({
        style: defaultStyle
      })
    }
  }


  playBeat(e) {
    //beat constant
    const beat = document.getElementById(this.props.padKey);
    beat.currentTime = 0;
    beat.play();
    this.pressStyle();
    setTimeout(() => this.pressStyle(), 100);
    this.props.displayName(this.props.beatType.replace(/-/g, ' '))
  }
  render() {
    return ( < div
      //div attr id equal to props.beatType from Drums class
      id = {
        this.props.beatType
      }
      className = "drum-pad"
      //onClick event activates sound function
      onClick = {
        this.playBeat
      }
      style = {
        this.state.style
      } >
      < audio
      //audio attr id, className, src
      id = {
        this.props.padKey
      }
      className = "clip"
      src = {
        this.props.beat
      } >
      < /audio> {
      this.props.padKey
    } < /div>

  );
}
}

class Drums extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let drums;
    drums = this.props.drums.map((Obj, index, array) => {
      return ( < DrumPad padKey = {
          this.props.drums[index].padKey
        }
        keyCode = {
          array[index].keyCode
        }
        beat = {
          array[index].sound
        }
        beatType = {
          array[index].type
        }
        displayName = {
          this.props.displayName
        }
        />
      )
    });
    return ( < div id = "container" > {
        drums
      } < /div>)
    }
  }

  class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        currentPad: "Drum Machine",
        drumSet: pads
      }
      this.displayName = this.displayName.bind(this);
      this.clearName = this.clearName.bind(this);
    }
    displayName(shortName) {
      this.setState({
        currentPad: shortName
      });
    }
    clearName() {
      this.setState({
        currentPad: ""
      })
    }
    render() {
      return ( < div >
        < div class = "brand" > < a href = '/' > mh.dev < /a></div >
        < h2 id = "display" > {
          this.state.currentPad
        } < /h2> < Drums displayName = {
        this.displayName
      }
      drums = {
        this.state.drumSet
      }
      /> < Madewith / >
      < /div>
    );
  }
}


ReactDOM.render( < App / > , document.getElementById("root"))
