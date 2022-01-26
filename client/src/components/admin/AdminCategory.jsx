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
          className="new-category-form"
        >
          <h2 style={{transform:"translate(10px, -30px)"}}>Creer une nouvelle categorie</h2>
          <div style={{width:"600px", margin:"auto"}}>
          <label htmlFor="name"> Catégorie :
            <input name="name" type="text" placeholder="Nom catégorie"/>
          </label>
          <button style={{height:"2.7rem", width:"5rem", borderTopRightRadius: "50px",borderBottomRightRadius:"50px", transform: "translate(-45px, -1.5px)",border:"none"}} type="submit">Creer</button>
        </div>
        </form>
        <ul className="categories-admin">
          <h2>Read</h2>
          {data.map((e) => {
            // eslint-disable-next-line
            return (
              <>
                <li className="category-item" onClick={() => setOpenModal(e)}>
                  Categorie : {e.name}
                  <img
                    alt="delete-category"
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
             <div style={{display:"flex", justifyContent:"space-between", marginTop:"-0.8rem"}}>
              <h1 style={{color:"white", marginLeft:"0.5rem"}}>Mettre à jour</h1>
              <button className="hover_annuler" style={{height:"1.8rem"}} onClick={() => setOpenModal(false)}>X</button>
              </div>
              <form style={{width:"400px", margin:"auto"}}
                ref={updateForm}
                encType="multipart/form-data"
                onSubmit={(e) => {
                  e.preventDefault();
                  let current = new FormData(updateForm.current);
                  updateCategory(current, openModal.id);
                }}
              >
                <div style={{ display:"flex", alignItems:"center"}}>
                <label htmlFor="name">
                  <input style={{borderRadius:"2rem"}}
                    name="name"
                    type="text"
                    placeholder="Nouveau nom"
                    defaultValue={openModal.name}
                  />
                </label>
                <input className="hover_save" style={{height:"2.7rem", borderRadius:"2rem", position:"relative", left:"5rem"}} type="submit" value="Modifier"></input>
                </div>
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
