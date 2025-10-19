import React from 'react';
import styled from 'styled-components';
import constants from '../constants';
import { formatSkillOrAttributeValues } from '../../utility';

const Ability = styled.div`
  margin-left: 8px;
  color: rgb(176, 198, 212);
  max-width: 85%;

  .ability-text {
    padding: 6px;
    font-weight: normal;
    color: rgb(169, 181, 193);
    text-shadow: 1px 1px black;
  }
`;

const AbilityDescription = styled.p`
  line-height: 16px;
  color: #c8dade;
  margin: 0px;
  padding: 0px;
  font-weight: normal;
`;

const AbilityIcon = styled.img`
  border-radius: 4px;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 15%;
  opacity: 0.7;
  overflow: hidden;
  border: 1px black solid;
  height: 42px;
  transition:
    opacity 0.2s,
    box-shadow 0.4s,
    transform 0.2s;

  &:hover {
    opacity: 1;
    box-shadow: 0 0 150px rgba(255, 255, 255, 0.4);
    transform: scale(1.1);
  }
`;

const AbilityTitle = styled.span`
  color: ${constants.textColorPrimary};
  text-transform: uppercase;
  font-size: 1rem;
`;

const Attributes = styled.div`
  margin-top: 4px;
  line-height: 16px;

  & #footer {
    color: #95a5a6;
  }

  & #value {
    font-weight: 500;
  }

  & #header {
    color: #95a5a6;
  }
`;

const Body = styled.div`
  display: flex;
  margin: 10px 9px 10px 9px;
  padding: 6px;
  font-weight: bold;
  color: ${constants.colorBlueGray};
`;

const Break = styled.div`
  margin-left: 13px;
  margin-right: 13px;
  height: 1px;
  background-color: #080d15;
`;

const NewAbility = styled.div`
  background-color: #335380;
  text-transform: uppercase;
  color: ${constants.textColorPrimary};
  text-align: center;
  font-size: 10px;
  padding: 0px 6px;
  width: 40%;
  margin: 4px 0px;
`;

const getAghsAttributes = (skillObject: any) => {
  const skills: any[] = skillObject.attrib || [];
  const attributes = skills.map((attrib) => (
    <div className="attribute" key={attrib.key}>
      <span id="header">{attrib.header} </span>
      <span id="value">{formatSkillOrAttributeValues(attrib.value)}</span>
      <span id="footer"> {attrib.footer || ''}</span>
    </div>
  ));
  return (
    <>
      {attributes}
      {skillObject.dmg ? (
        <div className="attribute">
          DAMAGE:{' '}
          <span id="value">
            {formatSkillOrAttributeValues(skillObject.dmg)}
          </span>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

const AghsTooltipBody = ({
  icon,
  skillName,
  isNewSkill,
  aghsDescription,
  skillObject,
  hasUpgrade,
}: {
  icon: string;
  skillName: string;
  isNewSkill: boolean;
  aghsDescription: string;
  skillObject: any;
  hasUpgrade: boolean;
}) => (
  <Body>
    {hasUpgrade ? (
      <>
        <AbilityIcon src={icon} />
        <Ability>
          <AbilityTitle>{skillName}</AbilityTitle>
          <NewAbility>
            {isNewSkill ? <span>New ability</span> : <span>Upgrade</span>}
          </NewAbility>
          <AbilityDescription>
            {aghsDescription}
            {skillObject.attrib && skillObject.attrib.length > 0 && (
              <div>
                <Break />
                <Attributes>{getAghsAttributes(skillObject)}</Attributes>
              </div>
            )}
          </AbilityDescription>
        </Ability>
      </>
    ) : (
      <span>No Aghanim&apos;s upgrade found</span>
    )}
  </Body>
);

export default AghsTooltipBody;
