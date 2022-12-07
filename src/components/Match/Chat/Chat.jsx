import React, { createElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AvVolumeUp from 'material-ui/svg-icons/av/volume-up';
import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import heroes from 'dotaconstants/build/heroes.json';
import playerColors from 'dotaconstants/build/player_colors.json';
import chatWheelMessages from 'dotaconstants/build/chat_wheel.json';
import emotes from 'dota2-emoticons/resources/json/charname.json';
import styled from 'styled-components';
import { isRadiant, formatSeconds } from '../../../utility';
import { IconRadiant, IconDire } from '../../Icons';
import constants from '../../constants';
import HeroImage from './../../Visualizations/HeroImage';

const StyledDiv = styled.div`
  padding-left: 32px;
  padding-right: 32px;

  @media (max-width: 768px) {
    padding-left: 0;
    padding-right: 0;
  }

  & .Chat,
  & .Filters {
    margin: 0;
    padding: 0;
  }

  & .Chat {
    & .radiant {
      & svg.icon {
        fill: ${constants.colorSuccess};
      }
    }

    & .dire {
      & svg.icon {
        fill: ${constants.colorDanger};
      }
    }
    & .radiant,
    & .dire {
      display: flex;
      align-items: flex-end;
      flex-wrap: wrap;

      &:not(:last-of-type) {
        padding-bottom: 10px;
      }

      & svg.icon {
        width: 16px;
        height: 16px;
      }

      & time {
        display: inline-block;
        width: 54px;
        text-align: center;

        & a {
          font-size: ${constants.fontSizeSmall};
          margin: 2px;
        }
      }

      & time,
      & time > a {
        color: ${constants.colorMutedLight};
      }

      & img {
        &:not(.chatwheel) {
          width: 36px;
        }

        height: 20px;

        &.unknown {
          width: 16px;
          height: 16px;
        }
      }

      & .target {
        font-size: ${constants.fontSizeMedium};
        margin-left: 8px;
      }

      & .author {
        font-size: ${constants.fontSizeMedium};
        font-weight: ${constants.fontWeightMedium};
        margin: 0 8px;
      }

      & article {
        & svg,
        & .chatwheel {
          vertical-align: sub;
          margin-right: 5px;
          height: 18px !important;
        }

        /* override material-ui */
        & svg {
          width: 18px !important;
          border-radius: 50%;
          background-color: ${constants.colorBlueMuted};

          &.play {
            &:hover {
              cursor: pointer;
              background-color: ${constants.colorBlue};
              color: ${constants.primarySurfaceColor} !important;
            }

            &:active {
              opacity: 0.6;
            }
          }

          &.playing {
            background-color: ${constants.colorBlue};
            color: ${constants.primarySurfaceColor} !important;
          }
        }

        & .emote {
          width: 20px;
          height: 20px;
          vertical-align: bottom;
        }
      }

      &.spam {
        opacity: 0.5;
        color: ${constants.colorMuted} !important;
        filter: grayscale(100%);
        pointer-events: none;
      }
    }

    & .disabled {
      pointer-events: none;
    }
  }

  & .divider {
    border: 0;
    height: 1px;
    background: linear-gradient(to right, ${constants.primaryTextColor}, rgba(0, 0, 0, 0));
    opacity: 0.1;
    margin: 6px 0 20px 0;
  }

  & .Filters {
    display: flex;
    flex-flow: row wrap;

    & > li {
      display: flex;
      flex-direction: column;
      margin: 0;
      padding-right: 32px;

      & > div {
        text-transform: uppercase;
        font-size: ${constants.fontSizeSmall};
        color: ${constants.colorMutedLight};
        margin-bottom: 8px;
      }

      & > ul {
        padding: 0;
        display: flex;
        flex-flow: row wrap;

        & > li {
          margin-bottom: 10px;

          &:not(:last-of-type) {
            margin-right: 16px;
          }

          /* override material-ui */
          & > div {
            display: block !important;

            & > div {
              & > div {
                margin-right: 8px !important;
              }

              & > label {
                width: auto !important;

                & > span {
                  display: inline-block;

                  & > div {
                    display: flex;
                    justify-content: space-between;
                    flex-direction: row;
                  }

                  & > div > b,
                  & > small {
                    text-align: right;
                    color: ${constants.colorMutedLight};
                  }

                  & > div > b,
                  & > small > span {
                    margin-left: 4px;
                    width: 32px;
                    display: inline-block;
                  }

                  & > small {
                    display: block;
                    font-weight: ${constants.fontWeightNormal};
                    font-size: ${constants.fontSizeSmall};
                    text-transform: lowercase;
                    margin-top: -4px;
                  }
                }
              }
            }
          }
        }
      }

      &:not(:last-of-type) {
        margin-right: 16px;
      }
    }
  }
`;

const isSpectator = slot => slot > 9 && slot < 128;

const getChatWheel = id => chatWheelMessages[id] || {};

class Chat extends React.Component {
  static propTypes = {
    data: PropTypes.shape({}),
    strings: PropTypes.shape({}),
  };

  constructor(props) {
    super(props);

    this.raw = this.props.data;

    // detect spam
    for (let i = 0; i < this.raw.length - 1; i += 1) {
      const curr = this.raw[i];
      const next = this.raw[i + 1];
      if (curr.player_slot === next.player_slot) {
        if ((next.time - curr.time) < 15) {
          if (curr.key === next.key) {
            next.spam = true;
          }
        }
        // ex: 3334005345
        if (curr.type === 'chat' && next.type === 'chat') {
          // for some reason some strings have trailing space
          curr.key = curr.key.trim();
          next.key = next.key.trim();
          // if first and last 2 chars matches, it's spam
          if (curr.key.slice(0, 2) === next.key.slice(0, 2) && curr.key.slice(-2) === next.key.slice(-2)) {
            next.spam = true;
          }
        }
      }
    }

    this.state = {
      radiant: true,
      dire: true,
      text: true,
      phrases: false,
      audio: true,
      all: true,
      allies: true,
      spam: true,

      playing: null,
      messages: null,
    };

    this.filters = {
      radiant: {
        f: (arr = this.raw) => arr.filter(msg => isRadiant(msg.player_slot) || isSpectator(msg.slot)),
        type: 'faction',
        disabled: () => !this.state.dire,
      },
      dire: {
        f: (arr = this.raw) => arr.filter(msg => !isRadiant(msg.player_slot)),
        type: 'faction',
        disabled: () => !this.state.radiant,
      },
      text: {
        f: (arr = this.raw) => arr.filter(msg => msg.type === 'chat'),
        type: 'type',
        disabled: () => this.state.phrases === false && this.state.audio === false,
      },
      phrases: {
        f: (arr = this.raw) => arr.filter(msg => msg.type === 'chatwheel' && !getChatWheel(msg.key).sound_ext && !getChatWheel(msg.key).image),
        type: 'type',
        disabled: () => this.state.text === false && this.state.audio === false,
      },
      audio: {
        f: (arr = this.raw) => arr.filter(msg => msg.type === 'chatwheel' && getChatWheel(msg.key).sound_ext),
        type: 'type',
        disabled: () => this.state.phrases === false && this.state.text === false,
      },
      all: {
        f: (arr = this.raw) => arr.filter(msg => msg.type === 'chat' || (msg.type === 'chatwheel' && getChatWheel(msg.key).all_chat)),
        type: 'target',
        disabled: () => !this.state.allies,
      },
      allies: {
        f: (arr = this.raw) => arr.filter(msg => msg.type === 'chatwheel' && !getChatWheel(msg.key).all_chat),
        type: 'target',
        disabled: () => !this.state.all,
      },
      spam: {
        f: (arr = this.raw) => arr.filter(msg => msg.spam),
        type: 'other',
        disabled: () => false,
      },
    };

    this.state.messages = this.filter();
  }

  audio = (message, index) => {
    const a = new Audio(`https://odota.github.io/media/chatwheel/dota_chatwheel_${message.id}.${message.sound_ext}`);
    a.play();
    this.setState({
      playing: index,
    });
    const i = setInterval(() => {
      if (a.paused) {
        this.setState({
          playing: null,
        });
        clearInterval(i);
      }
    }, 500);
  };

  toggleFilter = (key) => {
    if (key !== undefined) {
      this.setState((state) => ({[key]: !state[key]}), () => {this.setState({messages: this.filter()})});
    }
  }

  filter = () => {
    const messages = this.raw.slice();

    Object.keys(this.filters).forEach((k) => {
      if (!this.state[k]) {
        this.filters[k].f().forEach((obj) => {
          const index = messages.indexOf(obj);
          if (index >= 0) {
            messages.splice(index, 1);
          }
        });
      }
    });

    // sort by time, considering spam
    messages.sort((a, b) => {
      const timeDiff = Number(a.time) - Number(b.time);
      if (timeDiff === 0) {
        if (a.spam === b.spam) {
          return 0;
        }
        return a.spam ? 1 : -1;
      }
      return timeDiff;
    });

    return messages
  };

  render() {
    const emoteKeys = Object.keys(emotes);

    const Messages = ({ strings }) => (
      <div>
        <ul className="Chat">
          {this.state.messages.map((msg, index) => {
            const hero = heroes[msg.heroID];
            const rad = isRadiant(msg.player_slot);
            const spec = isSpectator(msg.slot);

            let message = null;
            if (msg.type === 'chatwheel') {
              const messageInfo = getChatWheel(msg.key);
              message = [
                (messageInfo.message || '').replace(/%s1/, 'A hero'),
              ];
              if (messageInfo.sound_ext) {
                message.unshift(<AvVolumeUp
                  key={messageInfo.id}
                  viewBox="-2 -2 28 28"
                  onClick={() => this.audio(messageInfo, index)}
                  className={`play ${this.state.playing === index ? 'playing' : ''}`}
                />);
              } else {
                message.unshift(<img
                  key={messageInfo.id}
                  src="/assets/images/dota2/chat_wheel_icon.png"
                  alt="Chat Wheel"
                  className="chatwheel"
                />);
              }
            } else if (msg.type === 'chat') {
              const messageRaw = msg.key
                .split('')
                .map((char) => {
                  const emote = emotes[emoteKeys[emoteKeys.indexOf(char)]];
                  if (emote) {
                    return createElement('img', {
                      alt: emote,
                      src: `/assets/images/dota2/emoticons/${emote}.gif`,
                      className: 'emote',
                    });
                  }
                  return char;
                });
              // Join sequences of characters
              let buffer = [];
              message = [];
              messageRaw.forEach((char) => {
                if (typeof char === 'object') {
                  message.push(buffer.join(''), char)
                  buffer = [];
                } else {
                  buffer.push(char);
                }
              })
              message.push(buffer.join(''));
            }

            let target = strings.chat_filter_all;
            if (msg.type === 'chatwheel' && !getChatWheel(msg.key)) {
              target = strings.chat_filter_allies;
            }
            if (spec) {
              target = strings.chat_filter_spectator;
            }

            let icon = (<img
              src="/assets/images/blank-1x1.gif"
              alt="???"
              className="unknown"
            />);
            if (!spec) {
              if (rad) {
                icon = <IconRadiant className="icon" />;
              } else {
                icon = <IconDire className="icon" />;
              }
            }

            return (
              <li
                id={index}
                className={`
                  ${rad ? 'radiant' : 'dire'}
                  ${msg.spam ? 'spam' : ''}
                `.trim()}
              >
                {icon}
                <time>
                  <a href={`#${index}`}>{formatSeconds(msg.time)}</a>
                </time>
                {hero ? <HeroImage id={hero.id} alt={hero && hero.localized_name} />
                  : <img src="/assets/images/blank-1x1.gif" alt="" />}
                <span className="target">
                  [{target.toUpperCase()}]
                </span>
                <Link
                  to={`/players/${msg.accountID}`}
                  style={{ color: playerColors[msg.player_slot] || 'red' }}
                  className={`author ${msg.accountID ? '' : 'disabled'}`}
                >
                  {msg.name || msg.unit}
                </Link>
                <article>
                  {message}
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    );

    const Filters = ({ strings }) => {
      const categories = Object.keys(this.filters).reduce((cats, name) => {
        const c = cats;
        const f = this.filters;
        if (f[name].f().length > 0) {
          c[f[name].type] = c[f[name].type] || [];
          c[f[name].type].push({
            name,
            f: f[name].f,
            disabled: f[name].disabled,
          });
        }
        return c;
      }, {});

      return (
        <ul className="Filters">
          {Object.keys(categories).map(cat => (
            <li key={cat}>
              <div>{strings[`chat_category_${cat}`]}</div>
              <ul>
                {categories[cat].map((filter) => {
                  const len = filter.f().length;
                  const lenFiltered = filter.f(this.state.messages).length;

                  return (
                    <li key={filter.name}>
                      <Checkbox
                        label={
                          <span>
                            <div>
                              {strings[`chat_filter_${filter.name}`] || strings[`general_${filter.name}`]}
                              <b>{len}</b>
                            </div>
                            {len !== lenFiltered && <small>{strings.chat_filtered.toLowerCase()} <span>{lenFiltered}</span></small>}
                          </span>
                        }
                        checked={this.state[filter.name]}
                        onCheck={() => this.toggleFilter(filter.name)}
                        checkedIcon={<Visibility />}
                        uncheckedIcon={<VisibilityOff />}
                        disabled={filter.disabled()}
                      />
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      );
    };

    return (
      <StyledDiv>
        <Filters strings={this.props.strings} />
        <hr className="divider" />
        <Messages strings={this.props.strings} />
      </StyledDiv>
    );
  }
}

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(Chat);
