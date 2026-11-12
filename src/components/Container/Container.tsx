import React from "react";
import Heading from "../Heading/Heading";
import Error from "../Error/Error";
import { LoadingOverlayUpper30 } from "../LoadingOverlay";
import { Spacer } from "../Spacer/Spacer";

type ContainerProps = {
  title?: string;
  titleActions?: React.ReactNode;
  subtitle?: string | React.ReactNode;
  style?: any;
  className?: string;
  loading?: boolean;
  error?: string;
  children?: React.ReactNode;
  hide?: boolean;
  titleTo?: string;
  loaderWidth?: number;
  loaderHeight?: number;
  text?: string;
};

const Container = ({
  title,
  titleActions,
  subtitle,
  style,
  className,
  children,
  error,
  loading,
  hide,
  titleTo,
  loaderWidth,
  loaderHeight,
  text = "Loading...",
}: ContainerProps) =>
  !hide ? (
    <div className={className} style={{ ...style }}>
      {title && (titleActions ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <Heading title={title} subtitle={subtitle} titleTo={titleTo} />
          {titleActions}
        </div>
      ) : <Heading title={title} subtitle={subtitle} titleTo={titleTo} />)}
      {error && (
        <>
          <Spacer variant="1" />
          <Error />
        </>
      )}
      {!error && loading && <LoadingOverlayUpper30 text={text} />}
      {!error && !loading && (
        <>
          <Spacer variant="1" />
          {children}
        </>
      )}
    </div>
  ) : null;

export default Container;
