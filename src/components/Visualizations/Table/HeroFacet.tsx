import React from "react";
import ReactTooltip from "react-tooltip";
import { heroes } from "dotaconstants";
import config from "../../../config";
import { useHeroAbilities } from "../../../hooks/useHeroAbilities.hook";
import styles from "./HeroFacet.module.css";

const HeroFacet = ({ heroID, facet }: { heroID?: string; facet?: number }) => {
  const heroAbilities = useHeroAbilities();

  if (!(heroID && facet)) {
    return null;
  }
  if (!heroAbilities) {
    return null;
  }

  const selectedFacet =
    heroAbilities[heroes[heroID as keyof Heroes].name]?.facets[facet - 1] ?? {};
  const { color, gradient_id, icon, name } = selectedFacet;

  const imageURL = `${config.VITE_IMAGE_CDN}/apps/dota2/images/dota_react/icons/facets/${icon}.png`;
  const colorClass = `color_${color}_${gradient_id}`;

  return (
    <div>
      <div
        className={`${styles.facet} ${styles[colorClass] || ""}`}
        data-tip
        data-for={name}
      >
        <img src={imageURL} alt="" />
        <div className="hero-tooltip">
          <ReactTooltip id={name} effect="solid" place="right">
            <div
              className={`${styles.facetTooltip} ${styles[colorClass] || ""}`}
              style={{
                height: "100%",
                width: "100%",
              }}
            >
              <div className={styles.facetHeader}>
                <div
                  style={{
                    padding: "10px",
                    background:
                      "linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1))",
                  }}
                >
                  <img src={imageURL} alt="" />
                </div>
                <span>{selectedFacet.title}</span>
              </div>
              <div className={styles.description}>
                <span>{selectedFacet.description}</span>
              </div>
            </div>
          </ReactTooltip>
        </div>
      </div>
    </div>
  );
};

export default HeroFacet;
