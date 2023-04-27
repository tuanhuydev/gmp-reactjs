import React, { useEffect } from "react";
import { memo } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function withDeeplink(Component) {
  return memo(() => {
    // Hooks
    const [searchParams, setSearchParams] = useSearchParams();

    // State
    const [filter, setFilter] = useState();

    const makeFilter = () => {
      const filter = {};
      // URL params
      for (const [key, value] of searchParams.entries()) {
        filter[key] = value;
      }
      setFilter(filter);
    };

    useEffect(() => {
      makeFilter();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <Component {...filter} setSearchParams={setSearchParams} />;
  });
}

export default withDeeplink;
