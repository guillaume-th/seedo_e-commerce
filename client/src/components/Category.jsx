import React, { useState, useRef, useEffect } from "react";
const API_URL = process.env.REACT_APP_API_URL;

export default function Category() {
  const createForm = useRef();
  const updateForm = useRef();
  const categories = [];

  useEffect(() => {
    fetch(`${API_URL}/category/all`, {
      method: "GET",
      // body: data,
    })
      .then((res) => res.json())
      .then((res) => console.log(res[0]))
      .catch((error) => console.error(error));
  }, [categories]);

  return (
    <>
      <section>
        <h2>Create</h2>
        <form ref={createForm} encType="multipart/form-data">
          <label htmlFor="name">
            <input name="name" type="text" placeholder="Nom catégorie" />
          </label>
          <button type="submit">Creer</button>
        </form>
      </section>
      <section>
        <h2>Read</h2>
      </section>
      <section>
        <h2>Update</h2>
        <form ref={updateForm} encType="multipart/form-data">
          <label htmlFor="id">
            <input name="id" type="text" placeholder="id" />
          </label>
          <label htmlFor="name">
            <input name="name" type="text" placeholder="Nouveau nom" />
          </label>
          <button type="submit"></button>
        </form>
      </section>
      <section>
        <h2>Delete</h2>
      </section>
    </>
  );
}
