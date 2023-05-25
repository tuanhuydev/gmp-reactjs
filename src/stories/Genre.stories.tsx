import React from 'react';
import Select from '../components/form/FormSelect';

export default {
  title: 'Select',
  component: Select,
  parameters: {
    options: [
      { name: 'red', value: '#f00' },
      { name: 'green', value: '#0f0' },
      { name: 'blue', value: '#00f' },
    ],
    placeholder: 'Select items',
  },
  argTypes: {
    options: {
      control: { type: 'text' },
    },
  },
};

const Template = (args: any) => <Select {...args} />;

const genreOptions = [
  { label: 'Crime', value: 'crime' },
  { label: 'Documentary', value: 'documentary' },
  { label: 'Horror', value: 'horror' },
  { label: 'Comedy', value: 'comedy' },
];
export const Default = Template.bind({});

Default.args = {
  options: genreOptions,
  placeholder: 'Select Something',
};
