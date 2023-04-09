import React, { useEffect } from "react";
import Select from "../form/Select";
import Modal from "../Modal/Base";
import TextInput from "../form/TextInput";
import DateInput from "../form/DateInput";
import Textarea from "../form/Textarea";
import styled from "styled-components";
import { GENRE_OPTIONS } from "../../configs/constants";

export default function MovieForm({ open, onClose, movie }) {

  const changeGenre = (selectedGenres) => {

  }

  const handleReset = () => {

  }

  const handleSubmit = () => {

  }

  const syncData = () => {

  }

  useEffect(() => {
    if (!open && onClose) {
      onClose();
    }
    if (movie) {
      syncData(movie);
    }
  }, [open, onClose, movie]);

  return (
    <Modal open={open} title="Add Movie" data-testid="add-movie-testid">
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
        <button className="btn btn-outline mr-3" onClick={handleReset}>reset</button>
        <button className="btn btn-contained" onClick={handleSubmit}>submit</button>
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
