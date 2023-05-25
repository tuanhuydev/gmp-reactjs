import { ObjectType } from '@/types/meta';
import React, { useEffect, useState, memo, Component } from 'react';
import { useSearchParams } from 'react-router-dom';

function withDeeplink(Component: any) {
  const DeepLinkComponent = () => {
    // Hooks
    const [searchParams, setSearchParams] = useSearchParams();

    // State
    const [filter, setFilter] = useState<ObjectType>();

    const makeFilter = () => {
      const filter: ObjectType = {};
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
