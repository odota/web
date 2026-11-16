import React from "react";
import { patchDate } from "../../utility";
import styles from "./DotaMap.module.css";

const setMapSizeStyle = (width: number, maxWidth: number) => ({
  width,
  height: width,
  maxWidth,
  maxHeight: maxWidth,
});

const dotaMaps = [
  {
    patch: "7.40",
    images: {
      jpg: "/assets/images/dota2/map/detailed_740.jpg",
      webp: "/assets/images/dota2/map/detailed_740.webp",
    },
  },
  {
    patch: "7.38",
    images: {
      jpg: "/assets/images/dota2/map/detailed_738.jpg",
      webp: "/assets/images/dota2/map/detailed_738.webp",
    },
  },
  {
    patch: "7.33",
    images: {
      jpg: "/assets/images/dota2/map/detailed_733.jpg",
      webp: "/assets/images/dota2/map/detailed_733.webp",
    },
  },
  {
    patch: "7.32",
    images: {
      jpg: "/assets/images/dota2/map/detailed_732.jpg",
      webp: "/assets/images/dota2/map/detailed_732.webp",
    },
  },
  {
    patch: "7.23",
    images: {
      jpg: "/assets/images/dota2/map/detailed_723.jpg",
      webp: "/assets/images/dota2/map/detailed_723.webp",
    },
  },
  {
    patch: "7.20",
    images: {
      jpg: "/assets/images/dota2/map/detailed_720.jpg",
      webp: "/assets/images/dota2/map/detailed_720.webp",
    },
  },
  {
    patch: "7.07",
    images: {
      jpg: "/assets/images/dota2/map/detailed_707.jpg",
      webp: "/assets/images/dota2/map/detailed_707.webp",
    },
  },
  {
    patch: "7.00",
    images: {
      jpg: "/assets/images/dota2/map/detailed_700.jpg",
      webp: "/assets/images/dota2/map/detailed_700.webp",
    },
  },
  {
    patch: "6.86",
    images: {
      jpg: "/assets/images/dota2/map/detailed_686.jpg",
      webp: "/assets/images/dota2/map/detailed_686.webp",
    },
  },
  {
    patch: "6.82",
    images: {
      jpg: "/assets/images/dota2/map/detailed_682.jpg",
      webp: "/assets/images/dota2/map/detailed_682.webp",
    },
  },
  {
    patch: "6.70",
    images: {
      jpg: "/assets/images/dota2/map/detailed_pre682.jpg",
      webp: "/assets/images/dota2/map/detailed_pre682.webp",
    },
  },
];

const getPatchMap = (startTime: number | null) => {
  if (!startTime) return dotaMaps[0];

  const patchMap = dotaMaps.find(
    (dotaMap) => startTime >= patchDate[dotaMap.patch],
  );

  return patchMap || dotaMaps[0];
};

const DotaMap = ({
  startTime = null,
  maxWidth = 400,
  width = 400,
  children,
}: {
  startTime: number | null;
  maxWidth?: number;
  width?: number;
  children?: React.ReactNode;
}) => {
  const mapData = getPatchMap(startTime);

  return (
    <div className={styles.mapContainer} style={setMapSizeStyle(width, maxWidth)}>
      <picture className={styles.mapImage}>
        <source srcSet={mapData.images.webp} type="image/webp" />
        <source srcSet={mapData.images.jpg} type="image/jpeg" />
        <img src={mapData.images.jpg} alt={`Dota 2 Map - ${mapData.patch}`} />
      </picture>
      <div className={styles.mapContent}>{children}</div>
    </div>
  );
};

export default DotaMap;
