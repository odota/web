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

// All chat
// https://github.com/dotabuff/d2vpkr/blob/8fdc29b84f3e7e2c130fc1b8c6ffe3b811e2d4a7/dota/scripts/chat_wheel.txt
const chatwheelAll = [75, 76, 108, 109, 110];

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
        <li
          id={index}
          key={index}
          className={`
            ${rad ? styles.radiant : styles.dire}
            ${msg.spam && styles.spam}
          `}
        >
          {rad ? <IconRadiant className={styles.icon} /> : <IconDire className={styles.icon} />}
          <time>
            <a href={`#${index}`}>{formatSeconds(msg.time)}</a>
          </time>
          <img
            src={hero ? API_HOST + hero.img : '/assets/images/blank-1x1.gif'}
            alt={hero && hero.localized_name}
          />
          <span className={styles.target}>
            [{msg.type === 'chat' && 'ALL'}
            {msg.type === 'chatwheel' && (chatwheelAll.includes(Number(msg.key)) ? 'ALL' : 'ALLIES')}]
          </span>
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

// --------------------------------------------

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.raw = this.props.data;

    // detect spam
    for (let i = 0; i < this.raw.length - 1; i += 1) {
      const curr = this.raw[i];
      const next = this.raw[i + 1];
      if (curr.key === next.key) {
        if (curr.player_slot === next.player_slot) {
          if (next.time - curr.time < 10) {
            next.spam = true;
          }
        }
      }
    }

    this.state = {
      radiant: true,
      dire: true,

      chat: true,
      chatwheel: true,

      spam: false,
    };

    this.filters = {
      radiant: (arr = this.raw) => arr.filter(msg => isRadiant(msg.player_slot)),
      dire: (arr = this.raw) => arr.filter(msg => !isRadiant(msg.player_slot)),

      chat: (arr = this.raw) => arr.filter(msg => msg.type === 'chat'),
      chatwheel: (arr = this.raw) => arr.filter(msg => msg.type === 'chatwheel'),

      spam: (arr = this.raw) => arr.filter(msg => msg.spam),
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(key) {
    if (key !== undefined) {
      this.state[key] = !this.state[key];
      this.forceUpdate();
    }

    this.messages = this.raw.slice();

    Object.keys(this.state).forEach((k) => {
      if (!this.state[k]) {
        this.filters[k]().forEach((obj) => {
          const index = this.messages.indexOf(obj);
          if (index >= 0) {
            this.messages.splice(index, 1);
          }
        });
      }
    });
  }

  render() {
    if (!this.messages) {
      this.toggle();
    }

    // sort by time, considering spam
    this.messages.sort((a, b) => {
      const timeDiff = Number(a.time) - Number(b.time);
      if (timeDiff === 0) {
        if (a.spam === b.spam) {
          return 0;
        }
        return a.spam ? 1 : -1;
      }
      return timeDiff;
    });

    return (
      <div className={styles.Container}>
        <Messages data={this.messages} />
        <aside>
          <ul className={styles.Filters}>
            {Object.keys(this.state).map((key) => {
              const len = this.filters[key]().length;

              return len > 0 && (
                <li key={key}>
                  <b>{len}</b>
                  <Toggle
                    label={key}
                    toggled={this.state[key]}
                    onToggle={() => this.toggle(key)}
                    thumbStyle={{ backgroundColor: styles.lightGray }}
                  />
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    );
  }
}

export default Chat;
