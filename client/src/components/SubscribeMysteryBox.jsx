import React, { useState, useEffect } from "react";
// import Modal from "react-modal";
import ReactDOM from "react-dom";

export default function SubscribeMysteryBox() {
  const [option, setOption] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <div>
        <h2>Abonnement 1</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi alias
          rerum laudantium unde dignissimos eius quas eaque, culpa illo amet,
          molestiae quibusdam reprehenderit accusantium qui est dolorum dolore
          quisquam. Quaerat.
        </p>
        <button>Abonne-toi</button>
      </div>
      <div>
        <h2>Abonnement 2</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo
          dolor neque pariatur. Beatae perferendis rerum sequi consectetur
          labore maiores explicabo voluptatibus dolores voluptas natus ut, atque
          distinctio expedita quam ad?
        </p>
        <button>Abonne-toi</button>
      </div>
      <div>
        <h2>Abonnement 3</h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam
          consectetur provident incidunt iste dolor accusantium cum distinctio
          non, libero harum facere possimus veritatis? Eaque corporis quas quo
          ipsam neque dignissimos.
        </p>
        <button>Abonne-toi</button>
      </div>
    </div>
  );
}
