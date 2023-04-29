import React, { useEffect, useState, memo } from 'react';
import { useSearchParams } from 'react-router-dom';

function withDeeplink(Component) {
  const DeepLinkComponent = () => {
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
    }, []);
    return <Component {...filter} setSearchParams={setSearchParams} />;
  };
  return memo(DeepLinkComponent);
}

export default withDeeplink;
