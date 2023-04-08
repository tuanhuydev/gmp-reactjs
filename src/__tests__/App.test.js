import { fireEvent, render, screen } from '@testing-library/react';
import '../setupTests';
import Couter from '../components/Counter';
import React from 'react';
import SearchMovie from '../components/SearchMovie';
import SelectGenre from '../components/form/Select';
import MovieTile from '../components/MovieTile';
import { mockMovie } from '../__tests__/mocks/mockMovie';

describe('Counter testsuits', function() {
  it('Counter testing', async function() {
    render(<Couter />);
    expect(await screen.findByTestId('counter')).not.toBeNull();
  });

  it('Counter should decrease/increase value on click', async function() {
    render(<Couter />);
    const [decreaseBtn, increaseBtn] = await screen.findAllByRole('button');
    fireEvent.click(decreaseBtn);
    const displayElement = await screen.findByTestId('counter');
    expect(displayElement.textContent).toEqual("-1");
    fireEvent.click(increaseBtn);
    expect(displayElement.textContent).toEqual("0");
  });

});

describe('Search form test suits', function() {
  it('Should render with default props', async function() {
    render(<SearchMovie />);
    const inputEl = screen.getByRole("textbox", { id: 'search-input' });
    const submitBtn = screen.getByRole("button", { id: 'search-btn' });
    expect(inputEl).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });
  it('Should perform submit on click', async function() {
    const onSearch = jest.fn(e => e.preventDefault());
    render(<SearchMovie onSearch={onSearch} />);
    const submitBtn = screen.getByRole("button", { id: 'search-btn' });
    expect(submitBtn).toBeInTheDocument();
    submitBtn.click();
    expect(onSearch).toBeCalled();
  });

  it('Should perform submit on input and submit', async function() {
    const onSearch = jest.fn(e => e.preventDefault());
    const onChange = jest.fn();
    const mockValue = 'Avatar 2: The way of water';
    render(<SearchMovie onSearch={onSearch} onChange={onChange} />);
    const inputEl = screen.getByRole("textbox", { id: 'search-input' });
    const submitBtn = screen.getByRole("button", { id: 'search-btn' });
    fireEvent.change(inputEl, {target: {value: mockValue }});
    expect(inputEl.value).toBe(mockValue);
    fireEvent.click(submitBtn);
    expect(onSearch).toBeCalled();
  });
});

describe('Genre select test suits', function() {
  const onChange = jest.fn();
  const mockOptions = [
    { label: "Crime", value: "crime" },
    { label: "Documentary", value: "documentary" },
    { label: "Horror", value: "horror" },
    { label: "Comedy", value: "comedy" },
  ];
  it('Component should render', async function() {
    render(<SelectGenre onSelect={onChange} options={mockOptions} placeholder="Please select genre" />);
    const selectEl = await screen.findByText("Please select genre");
    expect(selectEl).toBeInTheDocument();
  });
  it('Component should render options', async function() {

    render(<SelectGenre onSelect={onChange} options={mockOptions} placeholder="Please select genre" />);
    const selectEl = await screen.findByTestId("select-testid");
    fireEvent.click(selectEl);
    expect(await screen.findByText('Crime')).toBeInTheDocument();
    expect(await screen.findByText('Documentary')).toBeInTheDocument();
    expect(await screen.findByText('Horror')).toBeInTheDocument();
    expect(await screen.findByText('Comedy')).toBeInTheDocument();
  });
  it('Component should perform click', async function() {
    render(<SelectGenre onSelect={onChange} options={['crime', 'documentary', 'horror']} placeholder="Please select genre" />);
    const selectEl = await screen.findByTestId("select-testid");
    fireEvent.click(selectEl);
    fireEvent.click(screen.getByLabelText('crime'));
    expect(onChange).toBeCalled();
  });
});

describe('Movie tiles test suits', function() {
  const onChange = jest.fn();
  it('Movie tile should be render', async function() {
    render(<MovieTile {...mockMovie} onClick={onChange} />);
    expect(await screen.findByTestId("tile-testid")).toBeInTheDocument();
  });
});

