import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from '../components/Modal/Base';
import { GENRE_OPTIONS } from '../commons/constants/global';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import FormText from '@/components/form/FormText';
import FormDate from '@/components/form/FormDate';
import FormTextarea from '@/components/form/FormTextarea';
import FormSelect from '@/components/form/FormSelect';
import { httpClient } from '@/configs/httpClient';
import { ObjectType } from '@/types/meta';

type FormValuesType = {
  title: string;
  releaseDate: Date;
  posterPath: string;
  voteAverage: number;
  genres: Array<string>;
  runtime: number;
  overview: string;
}

const DEFAULT_FORM_VALUES: FormValuesType = {
  title: '',
  releaseDate: new Date(),
  posterPath: '',
  voteAverage: 0,
  genres: [],
  runtime: 0,
  overview: '',
};
export default function MovieModal() {
  // Hooks
  const navigate = useNavigate();
  // Movie to edit
  const movie: ObjectType = useLoaderData();

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  useEffect(() => {
    // If movie existed => it's edit form and need to map to form
    if (movie) {
      Object.entries(movie).forEach(([key, value]) => {
        if (key in DEFAULT_FORM_VALUES) {
          if (key === 'genres') {
            const valueOptions = value.map((item: any) => GENRE_OPTIONS.find((option) => option.value === item));
            setValue('genres', valueOptions);
          } else {
            type FormKey = "title" | "releaseDate" | "posterPath" | "voteAverage" | "genres" | "runtime" | "overview" | `genres.${number}`;
            setValue(key as FormKey, value);
          }
        }
      });
    }
  }, [movie]);

  // State
  const [open, setOpen] = useState(true);

  const submit = async (formData: any) => {
    const { genres = [], voteAverage, runtime, ...restProps } = formData;
    const body = {
      ...restProps,
      genres: genres.map((genre: any) => genre.label),
      voteAverage: +voteAverage,
      runtime: +runtime,
    };

    if (movie) body.id = movie.id;

    const { data } = await httpClient({
      method: movie ? 'PUT' : 'POST',
      url: '/movies',
      data: body,
    });

    if (data) navigate('/');
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/');
  };

  const resetForm = () => reset();

  return (
    <Modal open={open} onClose={handleClose} title={movie ? 'Edit Movie' : 'Add Movie'} data-testid="add-movie-testid">
      <Form className="my-3">
        <FormText control={control} name="title" placeholder="Input Title" label="title" />
        <FormDate
          name="releaseDate"
          control={control}
          className="flex-1"
          placeholder="Input Date"
          label="release date"
        />
        <FormText control={control} name="posterPath" placeholder="Input Movie URL" label="movie url" />
        <FormText control={control} name="voteAverage" label="rating" type="number" placeholder="Input Rating" />
        <FormSelect name="genres" label="genres" control={control} className="flex-2" options={GENRE_OPTIONS} />
        <FormText control={control} name="runtime" type="number" placeholder="Input Runtime" label="Runtime" />
        <FormTextarea
          control={control}
          name="overview"
          label="Overview"
          className="col-span-full"
          placeholder="Input Placeholder"
        />
      </Form>
      <div className="flex justify-end">
        <button className="btn btn-outline mr-3" onClick={resetForm}>
          reset
        </button>
        <button className="btn btn-contained" onClick={handleSubmit(submit)}>
          submit
        </button>
      </div>
    </Modal>
  );
}

const Form = styled.form`
  grid-auto-columns: 1.5fr 1fr;
  display: grid;
  grid-template-areas: 'a b';
  grid-gap: 2rem 1rem;
`;
