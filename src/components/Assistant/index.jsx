import React from 'react';
import Heading from 'components/Heading';
import IconButton from 'material-ui/IconButton';
import Mic from 'material-ui/svg-icons/av/mic';

// Test
// window.speechSynthesis.speak(new window.SpeechSynthesisUtterance('some text here'))
const responses = [
  'furion can you tp top',
  'Unfortunately, this voice assistant is an ass, and we won\'t be working with it again.',
  'Sorry, we are currently busy placing a bet of $322 on a professional game.',

];
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 5;
const synth = window.speechSynthesis;

class Assistant extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    recognition.onresult = function (event) {
      this.setState({ ...this.state, recognizedSpeech: event.results[0][0].transcript });
      setTimeout(() => {
        const response = responses[Math.floor(Math.random() * responses.length)];
        this.setState({ ...this.state, responseSpeech: response });
        synth.speak(new window.SpeechSynthesisUtterance(response));
      }, 1000);
    }.bind(this);
  }

  render() {
    return (<div>
      <Heading title="Voice Assistant" subtitle="Your personal voice assistant to the world of Dota 2. Click the microphone and start speaking." />
      <div style={{ textAlign: 'center' }}>
        <div>
          <IconButton
            style={{
              width: 240,
              height: 240,
              padding: 60,
            }}
            iconStyle={{
              width: 120,
              height: 120,
              color: this.state.listening ? '#66cc00' : '#ffffff',
            }}
            onClick={() => {
              this.setState({ listening: true, recognizedSpeech: '', responseSpeech: '' }, () => {
                recognition.start();
                recognition.onend = () => {
                  this.setState({ ...this.state, listening: false });
                };
              });
            }}
          >
            <Mic />
          </IconButton>
        </div>
        <div>{this.state.recognizedSpeech}</div>
        <div>{this.state.responseSpeech}</div>
      </div>
    </div>);
  }
}

export default Assistant;
