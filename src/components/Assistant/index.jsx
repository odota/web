/* eslint-disable */
import React from 'react';
import Heading from '../Heading';
import IconButton from 'material-ui/IconButton';
import Mic from 'material-ui/svg-icons/av/mic';

// Test
// window.speechSynthesis.speak(new window.SpeechSynthesisUtterance('some text here'))
const responses = [
  'Did you say furion can you tp top furion can you tp top furion can you tp top furion can you tp top',
  'Unfortunately, this software is an ass, and we won\'t be working with it again.',
  'Sorry, I am currently busy placing a bet of $322 on a professional game.',
  'Despite the odds, I was hit by a Sheever ravage and am currently unavailable',
  'Currently stuck in a PGG Black Hole.  Please try again later.',
  'This will start working soon, it will!  Wow!',
  'wwwwwwwwwwwww',
  'No one has ever said that in the history of Dota',
  '10% of capacity was diverted and your request cannot be served at this time.',
  'I am currently unavailable for pressing ceremonial reasons.',
  'Sorry, I am still in beta. The technology is not there yet.',
  'The song is Sand King - Sandstorm',
  '༼ つ ◕_◕ ༽つ Give DIRETIDE',
  'I only have 13 mana right now and cannot service your request.',
  'Sylar to fall, Liquid are doing it',
  'Improve your Michael skills to increase your level of play.',
  'pls no copy pasterino',
  'Source 3 will fix the assistant.',
  'Sorry, currently looking for a missing keyboard.',
  'I am a good assistant, a bit overrated in my opinion. But definitely okay to be in a top team!',
  'When the frist hit strikes wtih desolator, the hit stirkes as if the - armor debuff had already been placed?',
  'Busy freeing a cat trapped under a couch. Try again later.',
  '10 years since this worked.',
  'I\'m voice assistant, come from China',
  'I am currently staying in the trees and cannot answer.',
  'I am earning real money and will be available later.',
  'Currently selling mayonnaise.',
  'Scientists baffled by why this isn\'t working',
  'There is a 17% chance that this will work if you try again.',
  'Currently playing Necrophos in the jungle. Try again later.',
  'Hello. I am voice assistant. I wanted to ask if you give me permission to sometimes use your stream content in my answers.',
  'Thanks Purge',
  'Brutal. Savage. Rekt.',
  'Sorry bad englandsky. I grow up in small farm to have make potatos. Father say "Potato harvest is bad. Need you to have play professional DOTO2 in Amerikanski for make money for head-scarf for babushka."',
  'This answer is literally nothing.',
  'Ask Arteezy for advice on how to play Riki',
  '-w33fresh this page and something will happen. Maybe.',
  'You are playing against Alliance. You do not ban Furion because you can counter it. Alliance instantly picks Furion. You lose against Alliance. You ban Furion next time you play against Alliance because you\'re not stupid',
  'Service currently paused by Puppey.',
  'Service denied by kYxY.',
  'Cooldown increased from 28 to 28.0 seconds',
  'Just ward his jungle, or jungle his wards.',
  'You\'re a flower. You\'re also a rainbow and a river.',
  'If you buy the compendium, you get all the previous rewards.',
  'From the Ghastly Eyrie I can see to the ends of the world, and from this vantage point I declare with utter certainty that this one is in the bag!',
  'KA LE',
  'Sorry, not finished farming yet.',
  'we lost',
  'LMFAO wHo cAREAS HAHA Xd.',
  'Don\'t questionmark me',
  'Delete your lies and apologize',
  'Your stick your stick your stick, drop your stick',
  'nice la',
  'It\'s a disastah',
// 'They storm up the river, patience from Zhou, waiting in the wings, NaVi\'s about to be caught.
// Oh there\'s the sleep, the surge, he catches everyone! Oh this could be a total disaster!
// Vacuum in, ravage on everyone, here\'s the Black Hole as well. LightOfHeaven, he turns it around, ravage as well, stolen by Dendi.
// ARE YOU KIDDING ME, THEY TURNED IT AROUND. 4 heroes dead, 5 heroes dead, Chuan trying to survive, Chuan\'s gonna go down.
// Puppey talked about the naga counter, it\'s LightOfHeaven with his BKB. They turned it around. Standing ovation from the crowd.',
// Maelk Award
// IT'S A DISASTER!
// The Play; Patience from Zhou
// Bruno's No Legs Strat
// ASSFAGGOTS
// Cancer Lancer
// Outworld Demolisher
// The River Fag
// Puppey Pause; 1-800-Merlini
// TI2 just ended, give them some time.
// XBOCT (4)
// kotl giff me mana
// The best Dota 2 photographer
// /u/croatianpride refuses to eat a shoe
// Please win a lan before u talk
// Sven boar stun
// Million Dollar Dream Coil
// r[A]ts
// My daughter Alexa
// con fuckign gratys u can buy null talis
// I range like the wind.
// The only active Dota photographer
// Cat Ears Drow
// shoot arrow, hit arrow
// Bulldog x Sheever
// THE REFRACTION
// XBOCT double rapier
// Jerax Earth Spirit
// S A D B O Y S
// n0tail u r fuckin perfect m8.
// When game is going full retard, you can only go with it.
// C R U M B L I N G
// Brooklyn Kurtz
// Gaben likes to play Sand King
// enough for do my power
// Arteezy sat in a dark room. The words "Dire Victory" filled up the screen.
// DIGITAL SPORTS
// Thank you Sheevar for making my every single day worth living.
// Era gets replaced by Excalibur, Fnatic TI4 Drama
// Everything can work.
// 22-0
// This was a heinous and cowardly act.
// Gigi's boobs get signed by Black^
// This will be explosive.
// EG vs VG RTZ midas on Alchemist
// Chinese Death Ball
// Sheever's Whore Moment; Sheever, we need to have a talk.
// PPD salt
// ( ͡°╭͜ʖ╮͡° ) DAY TUCKER NIGHT FUCKER ( ͡°╭͜ʖ╮͡° )
// Ebola Spirit
// Zyori cuts his dreads
// EE pours Monster over H4nni's head
// LMFAO wHo cAREAS HAHA Xd
// Hi, 4k player here who reported slahser.; "SLASHER'S WAY"
// Hello I'm Snith, playing my 202143th game on Chen.
// measure ur words cuz i might smash ur head when i meet u
// Just a boy trying to play dota.
// Cloud9 no TP scrolls vs Secret
// Old man Fear in a wheelchair: "Where am I?"
// One less ego one more championship
// Spin 2 Win
// tfw valve memes u
// hey its me ur brother
// DROP YOUR STICK
// Hello I'm Synderen. I sexually identify as a pig molester.
// HO HO, HA HA
// ez bugatti
// Wolves Need no Armor
// 6.84 is coming after Starladder
// Expert Analyzers
// Icefrog likes Mangos
// Polish
// Futa's Way: Warlock.; Mangolems, Mangolian Scepter
// Bruno is Icefrog
// I look at the moon and I tell myself... I fucked up... I FUCKED UP!
// I'm a simple man.
// Good Jokes mate real funny see u at FUCK YOUJ
// Matumbawoman
// PogChamp WTF 3 Merlinis PogChamp
// Topless Gamer Grill Stream
// Experts and Synderen
// OSfrog Imbalance Demands it OSfrog
// Artstyle graves himself
// Swindlemelonzz drops his Eul's; Delete your Eul's and apologize
// 420 Booty Wizard
// IT'S A DISASTAH! v2.0
// One of my favorites! Thus I invoke Masturbation
// THAT'S ILL EAGLE
// RTC? TI5?
// Introducing Team SUNSfan Digital Chaos
// nope ._.
// "Pit Lord" picked in Moon Duck Elimination Tournament for the first time
// Aghanim's Scepter: Riki (Pocket Riki)
// pls mr lizard
// 8 0 0 0 M A T C H M A K I N G P O I N T S
// Kuroky was right, Arteezy was left.; Arteezy was right, Kuroky was left.
// DC Scrim Leak Drama
// Beesa shares a story about Ritsu
// Orangutang Ganja, Overrated Gamers, Olympic Gays
// QUALITY MEMES. I love the memes there, Jack.
// 6.86: Literally nothing.
// Happy little trees.
// Whatever kid. Oh I'm sorry did I fucking trigger you?
// Does s4 remember the million dollar Dream Carl?
// Thank you, Dota 2. I owe you one.
// BabyRage PEDUUUUUR BabyRage
// The Shanghai Major.
// RTZ Sven gets sprouted
];

let recognition;
let synth;

class Assistant extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 5;
    synth = window.speechSynthesis;
    recognition.onresult = function (event) {
      this.setState({ ...this.state, recognizedSpeech: event.results[0][0].transcript });
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
                  setTimeout(() => {
                    const response = responses[Math.floor(Math.random() * responses.length)];
                    this.setState({ ...this.state, responseSpeech: response });
                    synth.speak(new window.SpeechSynthesisUtterance(response));
                  }, 500);
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
