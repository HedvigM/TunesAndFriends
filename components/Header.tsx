"use client";
import { ReactNode } from "react";
import headerStyles from "styles/Typography.module.scss";
import containerStyles from "styles/containers.module.scss";

type HeaderProps = {
  children: ReactNode;
  size: "small" | "medium" | "large";
  textAlign: "left" | "center";
};
export const Header = ({ children, size, textAlign }: HeaderProps) => (
  <div className={textAlign === "left" ? containerStyles.outerContainerLeft : containerStyles.outerContainerCenter} /* textAlign={textAlign} */>
    <div className={containerStyles.headerContainer}>
      {size === "large" && <h1 className={headerStyles.h1}>{children}</h1>}
      {size === "medium" && <h2 className={headerStyles.h2} >{children}</h2>}
      {size === "small" && <h3 className={headerStyles.h3} >{children}</h3>}
    </div>
  </div>
);
