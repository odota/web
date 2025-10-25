import React, { createElement } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Checkbox, FormControlLabel } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { heroes, player_colors as playerColors } from 'dotaconstants';
import emotes from 'dota2-emoticons/resources/json/charname.json';
import styled from 'styled-components';
import { isRadiant, formatSeconds } from '../../../utility';
import { IconRadiant, IconDire } from '../../Icons';
import constants from '../../constants';
import HeroImage from './../../Visualizations/HeroImage';
import { chat_wheel as chatWheelMessages } from 'dotaconstants';

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
    background: linear-gradient(
      to right,
      ${constants.primaryTextColor},
      rgba(0, 0, 0, 0)
    );
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

const isSpectator = (slot: number) => slot > 9 && slot < 128;

const getChatWheel = (
  id: string,
): {
  id: number;
  name: string;
  label?: string;
  message?: string;
  all_chat?: any;
  sound_ext?: string;
  image?: string;
} => chatWheelMessages[id as keyof typeof chatWheelMessages] || {};

type ChatProps = {
  data: any[];
  strings: Strings;
};

type ChatState = {
  radiant?: boolean;
  dire?: boolean;
  text?: boolean;
  phrases?: boolean;
  audio?: boolean;
  all?: boolean;
  allies?: boolean;
  spam?: boolean;
  playing?: any;
  messages?: any[] | null;
};

class Chat extends React.Component<ChatProps, ChatState> {
  raw = undefined as unknown as any[];
  state: ChatState = {
    radiant: true,
    dire: true,
    text: true,
    phrases: true,
    audio: true,
    all: true,
    allies: true,
    spam: true,

    playing: null,
    messages: null,
  };
  filters = {
    radiant: {
      f: (arr = this.raw) =>
        arr.filter(
          (msg) => isRadiant(msg.player_slot) || isSpectator(msg.slot),
        ),
      type: 'faction',
      disabled: () => !this.state.dire,
    },
    dire: {
      f: (arr = this.raw) => arr.filter((msg) => !isRadiant(msg.player_slot)),
      type: 'faction',
      disabled: () => !this.state.radiant,
    },
    text: {
      f: (arr = this.raw) => arr.filter((msg) => msg.type === 'chat'),
      type: 'type',
      disabled: () =>
        this.state.phrases === false && this.state.audio === false,
    },
    phrases: {
      f: (arr = this.raw) =>
        arr.filter(
          (msg) =>
            msg.type === 'chatwheel' &&
            !getChatWheel(msg.key).sound_ext &&
            !getChatWheel(msg.key).image,
        ),
      type: 'type',
      disabled: () => this.state.text === false && this.state.audio === false,
    },
    audio: {
      f: (arr = this.raw) =>
        arr.filter(
          (msg) => msg.type === 'chatwheel' && getChatWheel(msg.key).sound_ext,
        ),
      type: 'type',
      disabled: () => this.state.phrases === false && this.state.text === false,
    },
    all: {
      f: (arr = this.raw) =>
        arr.filter(
          (msg) =>
            msg.type === 'chat' ||
            (msg.type === 'chatwheel' && getChatWheel(msg.key).all_chat),
        ),
      type: 'target',
      disabled: () => !this.state.allies,
    },
    allies: {
      f: (arr = this.raw) =>
        arr.filter(
          (msg) => msg.type === 'chatwheel' && !getChatWheel(msg.key).all_chat,
        ),
      type: 'target',
      disabled: () => !this.state.all,
    },
    spam: {
      f: (arr = this.raw) => arr.filter((msg) => msg.spam),
      type: 'other',
      disabled: () => false,
    },
  };
  constructor(props: ChatProps) {
    super(props);

    this.raw = this.props.data;

    // detect spam
    for (let i = 0; i < this.raw.length - 1; i += 1) {
      const curr = this.raw[i];
      const next = this.raw[i + 1];
      if (curr.player_slot === next.player_slot) {
        if (next.time - curr.time < 15) {
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
          if (
            curr.key.slice(0, 2) === next.key.slice(0, 2) &&
            curr.key.slice(-2) === next.key.slice(-2)
          ) {
            next.spam = true;
          }
        }
      }
    }

    this.state.messages = this.filter();
  }

  audio = (message: any, index: number) => {
    const a = new Audio(
      `https://odota.github.io/media/chatwheel/dota_chatwheel_${message.id}.${message.sound_ext}`,
    );
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

  toggleFilter = (key: keyof typeof this.state) => {
    if (key !== undefined) {
      this.setState(
        (state: ChatState) => ({ [key]: !state[key] }),
        () => {
          this.setState({ messages: this.filter() });
        },
      );
    }
  };

  filter = () => {
    const messages = this.raw.slice();

    Object.keys(this.filters).forEach((k) => {
      if (!this.state[k as keyof ChatState]) {
        //@ts-expect-error
        this.filters[k].f().forEach((obj: any) => {
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

    return messages;
  };

  render() {
    const emoteKeys = Object.keys(emotes);

    const Messages = ({ strings }: { strings: Strings }) => (
      <div>
        <ul className="Chat">
          {this.state.messages?.map((msg, index) => {
            const hero = heroes[msg.heroID as keyof Heroes];
            const rad = isRadiant(msg.player_slot);
            const spec = isSpectator(msg.slot);

            let message: any[] = null as unknown as any[];
            if (msg.type === 'chatwheel') {
              const messageInfo = getChatWheel(msg.key);
              message = [(messageInfo.message || '').replace(/%s1/, 'A hero')];
              if (messageInfo.sound_ext) {
                message.unshift(
                  <VolumeUpIcon
                    key={messageInfo.id}
                    viewBox="-2 -2 28 28"
                    onClick={() => this.audio(messageInfo, index)}
                    className={`play ${this.state.playing === index ? 'playing' : ''}`}
                  />,
                );
              } else {
                message.unshift(
                  <img
                    key={messageInfo.id}
                    src="/assets/images/dota2/chat_wheel_icon.png"
                    alt="Chat Wheel"
                    className="chatwheel"
                  />,
                );
              }
            } else if (msg.type === 'chat') {
              const messageRaw = msg.key.split('').map((char: any) => {
                //@ts-expect-error
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
              let buffer: any[] = [];
              message = [];
              messageRaw.forEach((char: any) => {
                if (typeof char === 'object') {
                  message.push(buffer.join(''), char);
                  buffer = [];
                } else {
                  buffer.push(char);
                }
              });
              message.push(buffer.join(''));
            }

            let target = strings.chat_filter_all;
            if (msg.type === 'chatwheel' && !getChatWheel(msg.key)) {
              target = strings.chat_filter_allies;
            }
            if (spec) {
              target = strings.chat_filter_spectator;
            }

            let icon = (
              <img
                src="/assets/images/blank-1x1.gif"
                alt="???"
                className="unknown"
              />
            );
            if (!spec) {
              if (rad) {
                icon = <IconRadiant className="icon" />;
              } else {
                icon = <IconDire className="icon" />;
              }
            }

            return (
              <li
                id={String(index)}
                className={`
                  ${rad ? 'radiant' : 'dire'}
                  ${msg.spam ? 'spam' : ''}
                `.trim()}
              >
                {icon}
                <time>
                  <a href={`#${index}`}>{formatSeconds(msg.time)}</a>
                </time>
                {hero ? (
                  <HeroImage id={String(hero.id)} />
                ) : (
                  <img src="/assets/images/blank-1x1.gif" alt="" />
                )}
                <span className="target">[{target.toUpperCase()}]</span>
                <Link
                  to={`/players/${msg.accountID}`}
                  style={{
                    color:
                      playerColors[
                        msg.player_slot as keyof typeof playerColors
                      ] || 'red',
                  }}
                  className={`author ${msg.accountID ? '' : 'disabled'}`}
                >
                  {msg.name || msg.unit}
                </Link>
                <article>{message}</article>
              </li>
            );
          })}
        </ul>
      </div>
    );

    const Filters = ({ strings }: { strings: Strings }) => {
      const categories: Record<string, any> = Object.keys(this.filters).reduce(
        (cats, name) => {
          const c: Record<string, any[]> = cats;
          const f = this.filters;
          if (f[name as keyof typeof f].f().length > 0) {
            c[f[name as keyof typeof f].type] =
              c[f[name as keyof typeof f].type] || [];
            c[f[name as keyof typeof f].type].push({
              name,
              f: f[name as keyof typeof f].f,
              disabled: f[name as keyof typeof f].disabled,
            });
          }
          return c;
        },
        {},
      );

      return (
        <ul className="Filters">
          {Object.keys(categories).map((cat) => (
            <li key={cat}>
              <div>{strings[`chat_category_${cat}` as keyof Strings]}</div>
              <ul>
                {categories[cat as keyof typeof categories].map(
                  (filter: any) => {
                    const len = filter.f().length;
                    // const lenFiltered = filter.f(this.state.messages).length;

                    return (
                      <li key={filter.name}>
                        <FormControlLabel
                          label={
                            <>
                              <div>
                                {strings[
                                  `chat_filter_${filter.name}` as keyof Strings
                                ] ||
                                  strings[
                                    `general_${filter.name}` as keyof Strings
                                  ]}
                                <b style={{ marginLeft: '1em' }}>{len}</b>
                              </div>
                              {/* <small>
                              {strings.chat_filtered.toLowerCase()}{' '}
                              <span>{lenFiltered}</span>
                            </small> */}
                            </>
                          }
                          control={
                            <Checkbox
                              checked={
                                this.state[filter.name as keyof ChatState]
                              }
                              onChange={() => this.toggleFilter(filter.name)}
                              checkedIcon={<VisibilityIcon />}
                              icon={<VisibilityOffIcon />}
                              disabled={filter.disabled()}
                            />
                          }
                        />
                      </li>
                    );
                  },
                )}
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

const mapStateToProps = (state: any) => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(Chat);
