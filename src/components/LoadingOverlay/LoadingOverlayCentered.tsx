import React from "react";
import { LoadingOverlayBase } from "./LoadingOverlayBase";

interface LoadingOverlayCenteredProps {
  text?: string;
}

const LoadingOverlayCentered: React.FC<LoadingOverlayCenteredProps> = ({
  text,
}) => <LoadingOverlayBase text={text} paddingTop="50%" alignItems="center" />;

export { LoadingOverlayCentered };
