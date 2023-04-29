import React from "react";
import styled from "styled-components";
import { useState } from "react";
import Modal from "./Modal/Base";
import Select from "./form/Select";
import TextInput from "./form/TextInput";
import DateInput from "./form/DateInput";
import Textarea from "./form/Textarea";
import { GENRE_OPTIONS } from "../commons/constants";
import { useNavigate } from "react-router-dom";

export default function AddNewMovie() {
  // Hooks
  const navigate = useNavigate();
  // State
  const [open, setOpen] = useState(true);

  const changeGenre = (selectedGenres) => {};

  const handleReset = () => {};

  const handleSubmit = () => {};

  const syncData = () => {};

  const handleClose = () => {
    setOpen(false);
    navigate('/');
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Add Movie"
      data-testid="add-movie-testid"
    >
      <Form className="my-3">
        <TextInput
          name="title"
          placeholder="Input Title"
          className="flex-2"
          label="title"
        />
        <DateInput
          name="date"
          className="flex-1"
          placeholder="Input Date"
          label="release date"
        />
        <TextInput
          name="url"
          className="flex-2"
          placeholder="Input Movie URL"
          label="movie url"
        />
        <TextInput
          name="rating"
          className="flex-1"
          placeholder="Input Rating"
          label="rating"
        />
        <Select
          name="genre"
          label="genre"
          className="flex-2"
          options={GENRE_OPTIONS}
          onSelect={changeGenre}
        />
        <TextInput
          name="runtime"
          className="flex-1"
          placeholder="Input Runtime"
          label="Runtime"
        />
        <Textarea
          name="description"
          label="Overview"
          className="col-span-full"
          placeholder="Input Placeholder"
        />
      </Form>
      <div className="flex justify-end">
        <button className="btn btn-outline mr-3" onClick={handleReset}>
          reset
        </button>
        <button className="btn btn-contained" onClick={handleSubmit}>
          submit
        </button>
      </div>
    </Modal>
  );
}

const Form = styled.form`
  grid-auto-columns: 1.5fr 1fr;
  display: grid;
  grid-template-areas: "a b";
  grid-gap: 2rem 1rem;
`;
