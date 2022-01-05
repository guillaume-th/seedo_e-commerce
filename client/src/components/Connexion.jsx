import React, { useState } from "react";
import axios from "axios";

export default function Connexion() {
  const [option, setOption] = useState("connexion");

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
        lastname.value.match(/\d/) ||
        lastname.value.match(/\W/)
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
      if (password.value.length > 50 || password.value.length < 8) {
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
      let formData = new FormData(form);
      return formData;
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

  function ConnexionForm() {
    return (
      <div className="connexion-form">
        <form
          id="connexion"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label htmlFor="email">
            Email : <input type="email" id="email" placeholder="Email" />
          </label>
          <label htmlFor="password">
            Password :{" "}
            <input type="password" id="password" placeholder="Mot de passe" />
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
          id="inscription"
          onSubmit={async (e) => {
            e.preventDefault();
            if (verifInscriptionForm(e.target)) {
              let formData = new FormData(e.target);
              const options = {
                url: "http://localhost:8000/user/inscription",
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json;charset=UTF-8",
                },
                data: {
                  formData,
                },
              };
              axios(options).then((response) => {
                console.log(response.status);
              });
            }
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
              name="password_confirm"
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
      <h1>Lorem ipsum dolor sit amet.</h1>
      {option === "connexion" ? <ConnexionForm /> : <InscriptionForm />}
    </>
  );
}
