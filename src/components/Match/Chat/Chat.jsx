import React from 'react';
import { Link } from 'react-router-dom';
import { isRadiant, formatSeconds } from 'utility';
import strings from 'lang';
import { IconRadiant, IconDire } from 'components/Icons';
// import Heading from 'components/Heading';
import AvVolumeUp from 'material-ui/svg-icons/av/volume-up';
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import Toggle from 'material-ui/Toggle';
import heroes from 'dotaconstants/build/heroes.json';
import playerColors from 'dotaconstants/build/player_colors.json';
import styles from './Chat.css';

const Messages = ({ data }) => (
  <ul className={styles.Chat}>
    {data.map(((msg, index) => {
      const hero = heroes[msg.heroID];
      const rad = isRadiant(msg.player_slot);
      let message = (
        <article>
          {msg.key}
        </article>
      );
      if (msg.type === 'chatwheel') {
        if (Number(msg.key) >= 86) {
          message = (
            <article>
              <AvVolumeUp
                viewBox="-2 -2 28 28"
                onClick={() => new Audio(`/assets/chatwheel/dota_chatwheel_${msg.key}.wav`).play()}
                className={styles.play}
              />
              {strings[`chatwheel_${msg.key}`]}
            </article>
          );
        } else {
          message = (
            <article>
              <HardwareKeyboardArrowRight />
              {strings[`chatwheel_${msg.key}`]}
            </article>
          );
        }
      }

      return (
        <li id={index} key={index} className={rad ? styles.radiant : styles.dire}>
          {rad ? <IconRadiant className={styles.icon} /> : <IconDire className={styles.icon} />}
          <time>
            <a href={`#${index}`}>{formatSeconds(msg.time)}</a>
          </time>
          <img
            src={hero ? API_HOST + hero.img : '/assets/images/blank-1x1.gif'}
            alt={hero && hero.localized_name}
          />
          <Link
            to={`/players/${msg.accountID}`}
            style={{ color: playerColors[msg.player_slot] }}
            className={`${styles.author} ${msg.accountID ? '' : styles.disabled}`}
          >
            {msg.name}
          </Link>
          {message}
        </li>
      );
    }))}
  </ul>
);

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      radiant: true,
      dire: true,
      chat: true,
      chatwheel: true,
    };

    this.messages = this.props.data;
    this.filters = {
      radiant: this.props.data.filter(msg => isRadiant(msg.player_slot)),
      dire: this.props.data.filter(msg => !isRadiant(msg.player_slot)),
      chat: this.props.data.filter(msg => msg.type === 'chat'),
      chatwheel: this.props.data.filter(msg => msg.type === 'chatwheel'),
    };

    this.toggleType = this.toggleType.bind(this);
    this.toggleTeam = this.toggleTeam.bind(this);
  }

  toggleType(type) {
    const s = this.state;
    this.setState({ [type]: !s[type] });

    if (s[type]) {
      this.messages = this.props.data.filter(msg => msg.type !== type);
    } else {
      this.messages = (this.messages || []).concat(this.props.data.filter(msg => msg.type === type));
    }

    if (!s.radiant) {
      this.messages = this.messages.filter(msg => !isRadiant(msg.player_slot));
    }
    if (!s.dire) {
      this.messages = this.messages.filter(msg => isRadiant(msg.player_slot));
    }
  }

  toggleTeam(team) {
    const s = this.state;
    this.setState({ [team]: !s[team] });

    const troof = team === 'radiant' || false;

    if (s[team]) {
      this.messages = this.props.data.filter(msg => isRadiant(msg.player_slot) !== troof);
    } else {
      this.messages = (this.messages || []).concat(this.props.data.filter(msg => isRadiant(msg.player_slot) === troof));
    }

    this.messages = this.messages.filter(msg => msg.type !== ((!s.chat && 'chat') || (!s.chatwheel && 'chatwheel')));
  }

  render() {
    this.messages.sort((a, b) => Number(a.time) - Number(b.time));

    const f = this.filters;

    return (
      <div className={styles.Container}>
        <Messages data={this.messages} />
        <aside>
          <ul className={styles.Filters}>
            <li>
              <b>{f.radiant.length}</b>
              <Toggle
                label="Radiant"
                toggled={this.state.radiant}
                onToggle={() => this.toggleTeam('radiant')}
                thumbStyle={{ backgroundColor: styles.lightGray }}
                disabled={(f.radiant.length === 0) === this.state.dire}
              />
            </li>
            <li>
              <b>{f.dire.length}</b>
              <Toggle
                label="Dire"
                toggled={this.state.dire}
                onToggle={() => this.toggleTeam('dire')}
                thumbStyle={{ backgroundColor: styles.lightGray }}
                disabled={(f.dire.length === 0) === this.state.radiant}
              />
            </li>
            <hr className={styles.divider} />
            <li>
              <b>{f.chat.length}</b>
              <Toggle
                label="Chat"
                toggled={this.state.chat}
                onToggle={() => this.toggleType('chat')}
                thumbStyle={{ backgroundColor: styles.lightGray }}
                disabled={(f.chat.length === 0) === this.state.chatwheel}
              />
            </li>
            <li>
              <b>{f.chatwheel.length}</b>
              <Toggle
                label="Chatwheel"
                toggled={this.state.chatwheel}
                onToggle={() => this.toggleType('chatwheel')}
                thumbStyle={{ backgroundColor: styles.lightGray }}
                disabled={(f.chatwheel.length === 0) === this.state.chat}
              />
            </li>
          </ul>
        </aside>
      </div>
    );
  }
}

export default Chat;
