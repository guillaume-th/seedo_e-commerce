import React, { useState } from "react";

export default function Connexion() {
    const [option, setOption] = useState('connexion')

    function ConnexionForm(){
        return (
            <div className='connexion-form'>
                <form action="POST">
                    <label htmlFor="email">Email : <input type="email" /></label>
                    <label htmlFor="password">Password : <input type="password"/></label>
                </form>
                <p>Vous n'avez pas de compte ? <button onClick={() => setOption('inscription')}>Inscrivez vous</button>.</p>
            </div>
                
        )
    }

    function InscriptionForm(){
        return (
            <div className="inscription-form">
                <form action="POST">
                    <label htmlFor="firstname">Prénom : <input type="text" /></label>
                    <label htmlFor="lastname">Nom : <input type="text" /></label>
                    <label htmlFor="email">Email : <input type="email" name="" id="" /></label>
                    <label htmlFor="password">Mot de passe : <input type="password" id="password" /></label>
                    <label htmlFor="confirm-password">Confirmez le mot de passe : <input type="password" id="confirm-password" /></label>
                </form>
                <p>Vous avez déjà un compte ? <button onClick={() => setOption('connexion')}>Connectez vous</button>.</p>
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