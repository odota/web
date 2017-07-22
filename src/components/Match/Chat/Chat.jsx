import React from 'react';
import { isRadiant, formatSeconds } from 'utility';
import strings from 'lang';
import { IconRadiant, IconDire } from 'components/Icons';
import AvVolumeUp from 'material-ui/svg-icons/av/volume-up';
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import heroes from 'dotaconstants/build/heroes.json';
import playerColors from 'dotaconstants/build/player_colors.json';
import styles from './Chat.css';

const Chat = data => (
  <div>
    <ul className={styles.Chat}>
      {data.data.map(((msg, index) => {
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
            <a
              href={`/players/${msg.accountID}`}
              style={{ color: playerColors[msg.player_slot] }}
              className={`${styles.author} ${msg.accountID ? '' : styles.disabled}`}
            >
              {msg.name}
            </a>
            {message}
          </li>
        );
      }))}
    </ul>
  </div>
);

export default Chat;
