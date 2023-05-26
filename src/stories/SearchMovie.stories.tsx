import React from 'react';
import SearchMovie from '../components/SearchMovie';

export default {
  title: 'Search Movie',
  component: SearchMovie,
};

export const Default = (args: any) => <SearchMovie {...args} />;
