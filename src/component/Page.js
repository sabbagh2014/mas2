import React from "react";
import { Helmet } from "react-helmet";
export default function Page(props) {
  const { title, children } = props;

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div>{children}</div>
    </>
  );
}
