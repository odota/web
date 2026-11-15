import React from "react";
import { formatSkillOrAttributeValues } from "../../utility";
import styles from "./AghsTooltipBody.module.css";

const getAghsAttributes = (skillObject: any) => {
  const skills: any[] = skillObject.attrib || [];
  const attributes = skills.map((attrib) => (
    <div className="attribute" key={attrib.key}>
      <span id="header">{attrib.header} </span>
      <span id="value">{formatSkillOrAttributeValues(attrib.value)}</span>
      <span id="footer"> {attrib.footer || ""}</span>
    </div>
  ));
  return (
    <>
      {attributes}
      {skillObject.dmg ? (
        <div className="attribute">
          DAMAGE:{" "}
          <span id="value">
            {formatSkillOrAttributeValues(skillObject.dmg)}
          </span>
        </div>
      ) : (
        ""
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
  <div className={styles.body}>
    {hasUpgrade ? (
      <>
        <img className={styles.abilityIcon} src={icon} />
        <div className={styles.ability}>
          <span className={styles.abilityTitle}>{skillName}</span>
          <div className={styles.newAbility}>
            {isNewSkill ? <span>New ability</span> : <span>Upgrade</span>}
          </div>
          <p className={styles.abilityDescription}>
            {aghsDescription}
            {skillObject.attrib && skillObject.attrib.length > 0 && (
              <div>
                <div className={styles.break} />
                <div className={styles.attributes}>
                  {getAghsAttributes(skillObject)}
                </div>
              </div>
            )}
          </p>
        </div>
      </>
    ) : (
      <span>No Aghanim&apos;s upgrade found</span>
    )}
  </div>
);

export default AghsTooltipBody;
