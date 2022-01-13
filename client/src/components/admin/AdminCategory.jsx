import React, { useState, useRef, useEffect } from "react";
import Delete from "../../assets/delete.svg";
const API_URL = process.env.REACT_APP_API_URL;

export default function Category() {
  const [data, setData] = useState(null);
  const createForm = useRef();
  const updateForm = useRef();
  const [refresh, setRefresh] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/category/all`, {
      method: "GET",
      // body: data,
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((error) => console.error(error));

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpenModal(false);
    });
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

  function updateCategory(dataForm, id) {
    fetch(`${API_URL}/category/${id}/edit`, {
      method: "POST",
      body: dataForm,
    })
      .then((res) => res.json())
      .then(() => {
        setOpenModal(false);
        setRefresh(Math.random());
      })
      .catch((error) => console.error(error));
  }

  function deleteCategory(id) {
    fetch(`${API_URL}/category/delete/${id}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then(() => setRefresh(Math.random()))
      .catch((error) => console.error(error));
  }

  if (data) {
    return (
      <div className="wrapper" id="category">
        <form
          ref={createForm}
          encType="multipart/form-data"
          onSubmit={(e) => {
            e.preventDefault();
            let name = new FormData(createForm.current);
            createCategory(name);
          }}
          className="vertical-form"
        >
          <h2>Create</h2>
          <label htmlFor="name">
            <input name="name" type="text" placeholder="Nom catégorie" />
          </label>
          <button type="submit">Creer</button>
        </form>
        <ul className=" vertical-form">
          <h2>Read</h2>
          {data.map((e) => {
            // eslint-disable-next-line
            return (
              <>
                <li className="category-item" onClick={() => setOpenModal(e)}>
                  Categorie : {e.name}
                  <img
                    src={Delete}
                    className="icon"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      deleteCategory(e.id);
                    }}
                  ></img>
                </li>
              </>
            );
          })}
        </ul>
        {openModal && (
          <div className="modal">
            <section>
              <h2>Mettre à jour</h2>
              <form
                ref={updateForm}
                encType="multipart/form-data"
                onSubmit={(e) => {
                  e.preventDefault();
                  let current = new FormData(updateForm.current);
                  updateCategory(current, openModal.id);
                }}
              >
                <label htmlFor="name">
                  <input
                    name="name"
                    type="text"
                    placeholder="Nouveau nom"
                    defaultValue={openModal.name}
                  />
                </label>
                <input type="submit" value="Modifier"></input>
                <button onClick={() => setOpenModal(false)}>Annuler</button>
              </form>
            </section>
          </div>
        )}
      </div>
    );
  } else {
    return <p>Chargement en cours...</p>;
  }
}
