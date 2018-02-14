import React from 'react';
import PropTypes from 'prop-types';
// import strings from 'lang';
import { getTeamName } from 'utility';
import heroes from 'dotaconstants/build/heroes.json';
import styled from 'styled-components';
// import constants from '../../constants';

const Styled = styled.div`
.Draft {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 4px;
}

.pickban {
  width: calc(100% / 3);
  display: flex;
  flex-direction: column;
}

.pickban > span {
  align-self: center;
}

.dire.Draft > .pickban {
  margin-left: calc(100% / 3);
  order: 0;
}

.dire.Draft > .image {
  order: 1;
}

.radiant.Draft > .pickban {
  margin-right: calc(100% / 3);
  order: 1;
}

.radiant.Draft > .image {
  order: 0;
}

.image {
  width: calc(100% / 3);
  display: flex;
  align-items: flex-start;
}

.dire.Draft > .image > img {
  margin-left: auto;
}

.image > img {
  width: 100px;
}

.teams {
  display: flex;
}

.teams > .radiant {
  align-self: flex-start;
}

.teams > .dire {
  margin-left: auto;
}
`;

// one-based indexing (since draft[i].order starts at 1)
const orderOne = [1, 3, 5, 7, 10, 12, 14, 16, 18, 20, 21];
const orderTwo = [2, 4, 6, 8, 9, 11, 13, 15, 17, 19, 22];
const picks = [7, 8, 9, 10, 15, 16, 17, 18, 21, 22];

const Draft = ({ radiantTeam, direTeam, draft }) => {
  const firstIsTeamTwo = draft[0].active_team === 2;
  const radiantOrder = firstIsTeamTwo ? orderTwo : orderOne;
  return (
    <Styled>
      <section className="teams">
        <h3 className="radiant">{getTeamName(radiantTeam)}</h3>
        <h3 className="dire">{getTeamName(direTeam)}</h3>
      </section>
      <section className="draft-order">
        {draft.map(pb => (
          <section key={pb.order} className={`${radiantOrder.includes(pb.order) ? 'radiant' : 'dire'} Draft`}>
            <div className="pickban">
              <span>{picks.includes(pb.order) ? 'Pick' : 'Ban'}</span>
            </div>
            <div className="image">
              <img
                src={heroes[pb.hero_id] && process.env.REACT_APP_API_HOST + heroes[pb.hero_id].img}
                alt=""
              />
            </div>
          </section>
        ))}
      </section>
    </Styled>
  );
};

Draft.propTypes = {
  radiantTeam: PropTypes.shape({}),
  direTeam: PropTypes.shape({}),
  draft: PropTypes.arrayOf({}),
};

export default Draft;
