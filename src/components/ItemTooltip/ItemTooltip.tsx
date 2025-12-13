import React from "react";
import styled from "styled-components";
import constants from "../constants";
import { styleValues } from "../../utility";
import config from "../../config";
import AbilityBehaviour from "../AbilityTooltip/AbilityBehaviour";
import { usePatchnotes } from "../../hooks/usePatchnotes.hook";
import { items } from "dotaconstants";

// Get patchnotes from up to two last letter patches
function getRecentChanges(item?: keyof Items, patchnotes?: PatchNotes) {
  const changes: { patch: any; note: string }[] = [];
  if (!patchnotes) {
    return changes;
  }
  const patches = Object.keys(patchnotes);
  const latest = patches[patches.length - 1];
  const previous = patches[patches.length - 2];
  // Latest patch wasn't a major patch e.g. 7_35b, return more entries
  if (latest.length > 4) {
    patchnotes[previous].items?.[item!]?.forEach((note: string) =>
      changes.push({ patch: previous, note }),
    );
  }
  patchnotes[latest].items?.[item!]?.forEach((note: string) =>
    changes.push({ patch: latest, note }),
  );
  return changes;
}

const textHighlightColors = {
  use: "#95c07a",
  active: "#9f9fcf",
  passive: "#7e8c9d",
};

const Wrapper = styled.div`
  width: 300px;
  background: linear-gradient(#16232b, #10171d);
  color: #7a80a7;
  overflow: hidden;

  hr {
    border: 1px solid #29353b;
    margin: 0 9px;
  }
`;

const Header = styled.div`
  font-size: ${constants.fontSizeCommon};
  text-transform: uppercase;
  color: ${constants.colorBlue};
  background-color: #222c35;

  .header-content {
    height: 50px;
    padding: 13px;
    white-space: nowrap;
    display: flex;
  }

  & .neutral_tier_bg_1 {
    background: linear-gradient(
      to right,
      rgba(190, 190, 190, 0.5),
      rgba(139, 139, 139, 0.5)
    );
  }

  & .neutral_tier_bg_2 {
    background: linear-gradient(
      to right,
      rgba(146, 228, 126, 0.5),
      rgba(95, 177, 75, 0.5)
    );
  }

  & .neutral_tier_bg_3 {
    background: linear-gradient(
      to right,
      rgba(127, 147, 252, 0.5),
      rgba(76, 96, 201, 0.5)
    );
  }

  & .neutral_tier_bg_4 {
    background: linear-gradient(
      to right,
      rgba(213, 123, 255, 0.5),
      rgba(162, 72, 204, 0.5)
    );
  }

  & .neutral_tier_bg_5 {
    background: linear-gradient(
      to right,
      rgba(255, 225, 149, 0.5),
      rgba(204, 174, 98, 0.5)
    );
  }

  #item-img {
    display: inline-block;
    height: 100%;
    width: 100%;
    border: 1px solid #080d15;
    box-sizing: border-box;
  }
`;

const HeaderText = styled.div`
  height: 100%;
  position: relative;
  bottom: 2px;
  display: inline-block;
  margin-left: 15px;
  color: ${constants.primaryTextColor};
  font-weight: bold;
  letter-spacing: 1px;

  & div {
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & #gold {
    color: ${constants.colorGolden};
    font-weight: normal;
    font-size: ${constants.fontSizeSmall};

    & img {
      height: 13px;
      margin-right: 5px;
      position: relative;
      top: 2px;
    }
  }

  & .neutral-header {
    font-weight: 550;
    text-transform: none;
    font-size: ${constants.fontSizeSmall};

    & .neutral_tier_2 {
      color: ${constants.colorNeutralTier2};
    }

    & .neutral_tier_3 {
      color: ${constants.colorNeutralTier3};
    }

    & .neutral_tier_4 {
      color: ${constants.colorNeutralTier4};
    }

    & .neutral_tier_5 {
      color: ${constants.colorNeutralTier5};
    }
  }
`;

const ResourceIcon = styled.img`
  max-width: 16px;
  max-height: 16px;
  vertical-align: sub;
  margin-right: 5px;
`;

const Attributes = styled.div`
  padding: 0 8px;
  margin: 9px 0;

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

const Enhancement = styled.div`
  padding: 0 6px;

  & .enhancement-header {
    margin: 5px;
    display: flex;
    flex-direction: column;

    & hr {
      margin: auto 0;
      width: 100%;
    }

    & span {
      margin: auto 5px;
      text-transform: uppercase;
    }

    & .enhancement-title {
      color: gray;
      font-size: ${constants.fontSizeSmall};
      font-weight: 500;
    }

    & .enhancement-name {
      color: white;
      font-size: ${constants.fontSizeMedium};
      font-weight: 600;
    }
  }

  & #enhancement-img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
`;

const GameplayChanges = styled.div`
  margin: 10px 9px;
  background-color: #18212a;
  padding: 6px;

  & .patch {
    color: #a09259;
    margin-right: 2px;
  }

  & .note {
    color: grey;
  }
`;

const GameplayChange = styled.div`
  display: flex;
  align-items: flex-start;
  font-size: 10px;
`;

const Lore = styled.div`
  background-color: #0d1118;
  margin: 10px 9px 10px 9px;
  font-size: ${constants.fontSizeSmall};
  font-style: italic;
  color: #51565f;
  padding: 6px;
`;

const Hint = styled.div`
  margin: 10px 9px;
  padding: 6px;
  background-color: #51565f;
  color: #080d15;
`;

const Components = styled.div`
  font-family: Tahoma;
  margin: 6px 9px;

  #header {
    font-size: 10px;
    color: #51565f;
  }

  .component {
    display: inline-block;
    margin-right: 5px;

    & img {
      height: 25px;
      opacity: 0.75;
    }

    #cost {
      font-size: 10px;
      position: relative;
      bottom: 6px;
      text-align: center;
      color: ${constants.colorYelorMuted};
    }
  }
`;

const AbilityComponent = styled.div`
  margin: 10px 9px;

  & .ability-name {
    font-size: 13px;
    font-weight: bold;
    vertical-align: middle;
    padding-left: 4px;
    text-shadow: 1px 1px 0 #00000090;
  }

  & .header {
    height: 28px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;

    .entry {
      color: ${constants.textColorPrimary};
      margin-left: 10px;
    }
  }

  & .content {
    padding: 5px;
  }

  .active {
    color: #7a80a7;

    & .header {
      color: ${textHighlightColors.active};
      background: linear-gradient(to right, #373b7f, #181e30);
    }

    & .content {
      background-color: #181e30;
    }
  }

  .passive {
    color: #626d7b;

    & .header {
      color: ${textHighlightColors.passive};
      background: linear-gradient(to right, #263540, #1c2630);
    }

    & .content {
      background-color: #1c2630;
    }
  }

  .use {
    color: #7b8a72;

    & .header {
      color: ${textHighlightColors.use};
      background: linear-gradient(to right, #273f27, #17231f);
    }

    & .content {
      background-color: #17231f;
    }
  }
`;

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Ability = (
  item: any,
  type: keyof typeof abilityType,
  title: string,
  description: string,
  hasNonPassive: boolean,
) => {
  const styleType: keyof typeof textHighlightColors =
    abilityType[type] || "passive";
  const highlightStyle = `font-weight:500;color:${textHighlightColors[styleType]};text-shadow:2px 2px 0 #00000090;`;
  return (
    <AbilityComponent>
      <div className={styleType}>
        <div className="header">
          <span className="ability-name">{`${capitalizeFirstLetter(type)}: ${title}`}</span>
          <div>
            {item.mc && styleType !== "passive" && (
              <span className="entry">
                <ResourceIcon
                  src="/assets/images/dota2/ability_manacost.png"
                  alt="Mana icon"
                />
                <span className="values">{item.mc}</span>
              </span>
            )}
            {item.hc && styleType !== "passive" && (
              <span className="entry">
                <ResourceIcon
                  src="/assets/images/dota2/ability_healthcost.png"
                  alt="Health icon"
                />
                <span className="values">{item.hc}</span>
              </span>
            )}
            {item.cd &&
              ((!hasNonPassive && styleType === "passive") ||
                styleType !== "passive") && (
                <span className="entry">
                  <ResourceIcon
                    src="/assets/images/dota2/ability_cooldown.png"
                    alt="Cooldown icon"
                  />
                  <span className="values">{item.cd}</span>
                </span>
              )}
          </div>
        </div>
        <div className="content">
          <div
            className="ability-text"
            ref={(el) => styleValues(el, highlightStyle)}
          >
            {description}
          </div>
        </div>
      </div>
    </AbilityComponent>
  );
};

const AttributeContainer = ({ stats = [] }: any) => (
  <Attributes>
    {stats?.map((attrib: any) => (
      <div key={attrib.key}>
        <div id="header" ref={(el) => styleValues(el)}>
          {attrib.display.replace("{value}", attrib.value)}
        </div>
      </div>
    ))}
  </Attributes>
);

const EnhancementContainer = ({ enhancement }: any) => (
  <Enhancement>
    <div className="enhancement-header">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <hr />
        <span className="enhancement-title">{`Enchantment`}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <img
          id="enhancement-img"
          src={`${config.VITE_IMAGE_CDN}${enhancement.img}`}
          alt={enhancement.dname}
        />
        <span className="enhancement-name">{enhancement.dname}</span>
      </div>
    </div>
    <AttributeContainer stats={itemStats(enhancement)[0]} />
  </Enhancement>
);

// How each type should be styled
const abilityType: Record<string, keyof typeof textHighlightColors> = {
  active: "active",
  toggle: "active",
  passive: "passive",
  upgrade: "passive",
  use: "use",
};

const itemStats = (item: any) => {
  const upperCaseStats: string[] = [];
  const stats = item?.attrib
    .filter((a: any) => a.hasOwnProperty("display"))
    .filter((a: any) => {
      if (!/[a-z]/.test(a.display.replace("{value}", ""))) {
        upperCaseStats.push(a);
        return false;
      }
      return true;
    });
  return [stats, upperCaseStats];
};

const ItemTooltip = ({
  item,
  inflictor,
  value,
}: {
  item: Items["blink"] & any;
  inflictor?: keyof Items;
  value?: keyof Items;
}) => {
  const patchnotes = usePatchnotes();
  const recentChanges = getRecentChanges(inflictor, patchnotes);
  const enhancement = items[value!] || null;
  const [stats, upperCaseStats] = itemStats(item);
  const abilities = item.abilities || [];
  const hasNonPassive = abilities.some((a: { type: string }) =>
    ["active", "use"].includes(a.type),
  );
  return (
    <Wrapper>
      <Header>
        <div className={`header-content neutral_tier_bg_${item.tier}`}>
          <img
            id="item-img"
            src={`${config.VITE_IMAGE_CDN}${item.img}`}
            alt={item.dname}
          />
          <HeaderText>
            <div>{item.dname}</div>
            {item.tier ? (
              <div className="neutral-header">
                <span className={`neutral_tier_${item.tier}`}>
                  {`Tier ${item.tier} `}
                </span>
                <span>Artifact</span>
              </div>
            ) : (
              <div id="gold">
                <img
                  src={`${config.VITE_IMAGE_CDN}/apps/dota2/images/tooltips/gold.png`}
                  alt="Gold"
                />
                {item.cost}
              </div>
            )}
          </HeaderText>
        </div>
      </Header>
      {(item.behavior ||
        item.dmg_type ||
        item.bkbpierce ||
        item.dispellable) && (
        <div>
          <AbilityBehaviour ability={item} />
          <hr />
        </div>
      )}
      {stats && stats.length > 0 && <AttributeContainer stats={stats} />}
      {abilities.map(
        ({
          type,
          title,
          description,
        }: {
          type: keyof typeof abilityType;
          title: string;
          description: string;
        }) => Ability(item, type, title, description, hasNonPassive),
      )}
      {enhancement && <EnhancementContainer enhancement={enhancement} />}
      {item.hint?.map((hint: React.ReactNode) => (
        <Hint>{hint}</Hint>
      ))}
      {upperCaseStats.length > 0 && (
        <AttributeContainer stats={upperCaseStats} />
      )}
      {item.lore && <Lore>{item.lore}</Lore>}
      {recentChanges.length > 0 && (
        <GameplayChanges>
          {recentChanges.map(({ patch, note }) => (
            <GameplayChange>
              <span className="patch">{`${patch.replace("_", ".")}:`}</span>
              <span className="note">{note}</span>
            </GameplayChange>
          ))}
        </GameplayChanges>
      )}
      {item.components && (
        <Components>
          <div id="header">Components:</div>
          {item.components
            .concat(
              (items[`recipe_${inflictor}` as keyof typeof items] && [
                `recipe_${inflictor}`,
              ]) ||
                [],
            )
            .filter(Boolean)
            .map(
              (component: keyof typeof items) =>
                items[component] && (
                  <div className="component">
                    <img
                      src={`${config.VITE_IMAGE_CDN}${items[component].img}`}
                      alt=""
                    />
                    <div id="cost">{items[component].cost}</div>
                  </div>
                ),
            )}
        </Components>
      )}
    </Wrapper>
  );
};

export default ItemTooltip;
