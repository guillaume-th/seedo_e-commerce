import React, { useState } from "react";

export default function Connexion() {
    const [option, setOption] = useState('connexion')

    function verifInscriptionForm(object){
        const email = document.querySelector('#email')
        const regexEmail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
        if(object.target.id === 'inscription'){
            if(email.value.match(regexEmail)){
                // console.log(object.target.children[0].children[0].value.match(regexEmail))
                console.log('OK')
            }
        }
    }

    function levelPassword(password){
        let level = 0;
        if(password.match(/[A-Z]/)){
            level++
        }
        if(password.match(/[a-z]/)){
            level++
        }
        if(password.match(/\W/)){
            level++
        }
        if(password.match(/\d/)){
            level++
        }
        return level
    }

    function ConnexionForm(){
        return (
            <div className='connexion-form'>
                <form id="connexion" onSubmit={(e) => {
                    e.preventDefault();
                    // verifForm(e);
                }}>
                    <label htmlFor="email">Email : <input type="email" id="email" placeholder="Email"/></label>
                    <label htmlFor="password">Password : <input type="password" id="password" placeholder="Mot de passe"/></label>
                    <button type="submit">Connexion</button>
                </form>
                <p>Vous n'avez pas de compte ? <button onClick={() => setOption('inscription')}>Inscrivez vous</button></p>
            </div>
                
        )
    }

    function InscriptionForm(){
        return (
            <div>
                <form id="inscription" onSubmit={(e) => {
                    e.preventDefault();
                    verifInscriptionForm(e);
                }}>
                    <label htmlFor="firstname">Prénom : <input type="text" placeholder="Prenom"/></label>
                    <label htmlFor="lastname">Nom : <input type="text" placeholder="Nom"/></label>
                    <label htmlFor="email">Email : <input type="text" id="email" placeholder="Email"/></label>
                    <label htmlFor="password">Mot de passe : <input type="password" id="password" placeholder="Mot de passe" onChange={(e)=>{levelPassword(e.target.value)}}/></label>
                    <label htmlFor="confirm-password">Confirmez le mot de passe : <input type="password" id="confirm-password" placeholder="Confirmez le mot de passe"/></label>
                    <button type="submit">Inscrire</button>
                </form>
                <p>Vous avez déjà un compte ? <button onClick={() => setOption('connexion')}>Connectez vous</button></p>
                {/* <p>{passwordLevel}</p> */}
            </div>
        )
    }

    return (
        <>
            <h1>Lorem ipsum dolor sit amet.</h1>
            {option === 'connexion' ? <ConnexionForm /> : <InscriptionForm />}
        </>

    )
}