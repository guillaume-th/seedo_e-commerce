import React, { useState, useRef, useEffect } from "react";
const API_URL = process.env.REACT_APP_API_URL;

export default function Category() {
  const [data, setData] = useState(null);
  const createForm = useRef();
  const updateForm = useRef();
  const deleteForm = useRef();
  const [refresh, setRefresh] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/category/all`, {
      method: "GET",
      // body: data,
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((error) => console.error(error));
  }, [refresh]);

  function createCategory(name) {
    fetch(`${API_URL}/category/new`, {
      method: "POST",
      body: name,
    })
      .then((res) => res.json())
      .then(() => setRefresh(Math.random()))
      .catch((error) => console.error(error));
  }

  function updateCategory(dataForm) {
    const id = dataForm.get("id");
    fetch(`${API_URL}/category/${id}/edit`, {
      method: "POST",
      body: dataForm,
    })
      .then((res) => res.json())
      .then(() => setRefresh(Math.random()))
      .catch((error) => console.error(error));
  }

  function deleteCategory(dataForm) {
    const id = dataForm.get("id");
    fetch(`${API_URL}/category/delete/${id}`, {
      method: "POST",
      body: dataForm,
    })
      .then((res) => res.json())
      .then(() => setRefresh(Math.random()))
      .catch((error) => console.error(error));
  }

  if (data) {
    return (
      <>
        <section>
          <h2>Create</h2>
          <form
            ref={createForm}
            encType="multipart/form-data"
            onSubmit={(e) => {
              e.preventDefault();
              let name = new FormData(createForm.current);
              createCategory(name);
            }}
          >
            <label htmlFor="name">
              <input name="name" type="text" placeholder="Nom catégorie" />
            </label>
            <button type="submit">Creer</button>
          </form>
        </section>
        <section>
          <h2>Read</h2>
          <ul>
            {data.map((e) => {
              // eslint-disable-next-line
              return (
                <>
                  <li>
                    Id : {e.id} &nbsp; Categorie : {e.name}
                  </li>
                </>
              );
            })}
          </ul>
        </section>
        <section>
          <h2>Update</h2>
          <form
            ref={updateForm}
            encType="multipart/form-data"
            onSubmit={(e) => {
              e.preventDefault();
              let current = new FormData(updateForm.current);
              updateCategory(current);
            }}
          >
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
          <form
            ref={deleteForm}
            encType="multipart/form-data"
            onSubmit={(e) => {
              e.preventDefault();
              let current = new FormData(deleteForm.current);
              deleteCategory(current);
            }}
          >
            <label>
              <input name="id" type="text" />
            </label>
            <button type="submit">Supprimer</button>
          </form>
        </section>
      </>
    );
  } else {
    return <p>Chargement en cours...</p>;
  }
}
