import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;

export default function Connexion() {
  const [option, setOption] = useState("connexion");
  const connexionForm = useRef();
  const inscriptionForm = useRef();
  const navigate = useNavigate(); 

  function verifInscriptionForm(form) {
    const verified = [];
    const mustBeVerified = [
      "firstname",
      "lastname",
      "email",
      "password",
      "passwordVerif",
    ];
    const firstname = document.querySelector("#firstname");
    const lastname = document.querySelector("#lastname");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    const passwordVerif = document.querySelector("#confirm_password");
    const regexEmail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    if (form.id === "inscription") {
      // firstname check
      if (
        firstname.value.length > 30 ||
        firstname.value.length < 1 ||
        firstname.value.match(/\d/) ||
        firstname.value.match(/\W/)
      ) {
        firstname.style.backgroundColor = "red";
        verified[0] = "";
      } else {
        firstname.style.backgroundColor = "green";
        verified[0] = "firstname";
      }
      // lastname check
      if (
        lastname.value.length > 30 ||
        lastname.value.length < 1 ||
        lastname.value.match(/\d/)
      ) {
        lastname.style.backgroundColor = "red";
        verified[1] = "";
      } else {
        lastname.style.backgroundColor = "green";
        verified[1] = "lastname";
      }
      // email check
      if (!email.value.match(regexEmail)) {
        email.style.backgroundColor = "red";
        verified[2] = "";
      } else {
        email.style.backgroundColor = "green";
        verified[2] = "email";
      }
      // password check
      if (password.value.length > 50 && password.value.length < 8) {
        password.style.backgroundColor = "red";
        verified[3] = "";
      } else {
        password.style.backgroundColor = "green";
        verified[3] = "password";
        // verif password check
        if (passwordVerif.value !== password.value) {
          passwordVerif.style.backgroundColor = "red";
          verified[4] = "";
        } else {
          passwordVerif.style.backgroundColor = "green";
          verified[4] = "passwordVerif";
        }
      }
    }
    if (JSON.stringify(verified) === JSON.stringify(mustBeVerified)) {
      return true;
    } else {
      return false;
    }
  }

  function levelPassword(password) {
    let level = 0;
    if (password.match(/[A-Z]/)) {
      level++;
    }
    if (password.match(/[a-z]/)) {
      level++;
    }
    if (password.match(/\W/)) {
      level++;
    }
    if (password.match(/\d/)) {
      level++;
    }
    return level;
  }

  function sendFormInscription(element, data) {
    if (verifInscriptionForm(element.target)) {
      fetch(`${API_URL}/user/inscription`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          // console.log(res);
          if (res.status === "ok") {
              navigate("/profile"); 
          }
        })
        .catch((error) => console.error(error));
    }
  }

  function sendFormConnexion(data) {
    fetch(`${API_URL}/connexion`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === "ok") {
            navigate("/profile"); 
        }
        if (res.status != "fail") {
          localStorage.setItem("user_id", res.user_id);
          localStorage.setItem("admin", res.admin);
        }
      })
      .catch((error) => console.error(error));
  }

  function ConnexionForm() {
    return (
      <div className="connexion-form">
        <form
          id="connexion"
          encType="multipart/form-data"
          ref={connexionForm}
          onSubmit={async (e) => {
            e.preventDefault();
            let data = new FormData(connexionForm.current);
            sendFormConnexion(data);
          }}
        >
          <label htmlFor="email">
            Email :{" "}
            <input name="email" type="email" id="email" placeholder="Email" />
          </label>
          <label htmlFor="password">
            Password :{" "}
            <input
              name="password"
              type="password"
              id="password"
              placeholder="Mot de passe"
            />
          </label>
          <button type="submit">Connexion</button>
        </form>
        <p>
          Vous n'avez pas de compte ?{" "}
          <button onClick={() => setOption("inscription")}>
            Inscrivez vous
          </button>
        </p>
      </div>
    );
  }

  function InscriptionForm() {
    return (
      <div>
        <form
          encType="multipart/form-data"
          id="inscription"
          ref={inscriptionForm}
          onSubmit={async (e) => {
            e.preventDefault();
            const data = new FormData(inscriptionForm.current);
            sendFormInscription(e, data);
          }}
        >
          <label htmlFor="firstname">
            Prénom :{" "}
            <input
              name="firstname"
              type="text"
              id="firstname"
              placeholder="Prenom"
              minLength={1}
              maxLength={30}
            />
          </label>
          <label htmlFor="lastname">
            Nom :{" "}
            <input
              name="lastname"
              type="text"
              id="lastname"
              placeholder="Nom"
              minLength={1}
              maxLength={30}
            />
          </label>
          <label htmlFor="email">
            Email :{" "}
            <input name="email" type="text" id="email" placeholder="Email" />
          </label>
          <label htmlFor="password">
            Mot de passe :{" "}
            <input
              name="password"
              type="password"
              id="password"
              placeholder="Mot de passe"
              onChange={(e) => {
                levelPassword(e.target.value);
              }}
            />
          </label>
          <label htmlFor="confirm_password">
            Confirmez le mot de passe :{" "}
            <input
              name="confirm_password"
              type="password"
              id="confirm_password"
              placeholder="Confirmez le mot de passe"
            />
          </label>
          <button type="submit">Inscrire</button>
        </form>
        <p>
          Vous avez déjà un compte ?{" "}
          <button onClick={() => setOption("connexion")}>Connectez vous</button>
        </p>
      </div>
    );
  }

  return (
    <>
      <h1>{option[0].toUpperCase() + option.slice(1, option.length)}</h1>
      {option === "connexion" ? <ConnexionForm /> : <InscriptionForm />}
    </>
  );
}
