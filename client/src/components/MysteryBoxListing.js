import { current } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateCart } from "../CartSlice";
const API_URL = process.env.REACT_APP_API_URL;

export default function MysteryBoxListing() {
  const [data, setData] = useState(null);
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const elementsBySlide = 3;

  useEffect(() => {
    fetch(`${API_URL}/mystery/mystery_all`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.result);
      })
      .catch((err) => console.error(err));
  }, []);

  const computePrice = (e) => {
    console.log(e);
    return Math.round(
      parseFloat(
        e.promo > 0 ? e.subsprice - (e.subsprice * e.promo) / 100 : e.subsprice
      ),
      2
    );
  };

  if (data) {
    return (
      <div className="wrapper">
        <div className="" style={{ padding: "3rem" }}>
          <div className="std-colored-wrapper">
            <h3>Une nouvelle manière d'aborder le jardinage</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              aliquam velit non lectus suscipit feugiat. Sed consectetur at
              lectus sed efficitur. Vestibulum quis est non lectus pretium
              congue in et dui. Proin sit amet metus at tortor efficitur
              porttitor quis et massa. Curabitur semper eros eget urna ornare
              pharetra.{" "}
            </p>
            <div className="gallery">
              {currentIndex > 0 && (
                <div className="vertical-flex center-flex">
                  <img
                    className="arrow arrow-left slide-mystery"
                    src="/arrow.png"
                    onClick={() =>
                      setCurrentIndex(currentIndex - elementsBySlide)
                    }
                  />
                </div>
              )}
              {data.length > 0 ? (
                data
                  .slice(currentIndex, currentIndex + elementsBySlide)
                  .map((e) => {
                    return (
                      <div
                        onClick={() => navigate("/article/" + e.id)}
                        key={e.id}
                        className="thumbnail slide-mystery"
                      >
                        <div className="img-wrapper">
                          {e.photo[0] && (
                            <img
                              alt="article"
                              src={e.photo[0].image_link}
                            ></img>
                          )}
                        </div>
                        {e.new && <span className="new">Nouveauté !</span>}
                        {e.promo > 0 ? (
                          <>
                            <span className="promo"> -{e.promo}%</span>
                            <p className="firstPrice">
                              <strike>{e.subprice} €</strike>
                            </p>
                          </>
                        ) : (
                          <div className="noPromo"></div>
                        )}
                        <div className="infos mystery-infos">
                          <div className="sub-info">
                            <p className="name">{e.name}</p>
                            {e.promo > 0 ? (
                              <div className="prices">
                                <p>{computePrice(e)} €</p>
                              </div>
                            ) : (
                              <p>{e.subprice} €</p>
                            )}
                          </div>
                          <button
                            onClick={(event) => {
                              event.stopPropagation();
                              navigate("/mystery-subscription", {
                                state: e,
                              });
                            }}
                          >
                            S'abonner
                          </button>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <div>Pas de résultats</div>
              )}
              {currentIndex + elementsBySlide < data.length && (
                <div className="vertical-flex center-flex">
                  <img
                    className="arrow slide-mystery"
                    src="/arrow.png"
                    onClick={() =>
                      setCurrentIndex(currentIndex + elementsBySlide)
                    }
                  />
                </div>
              )}
            </div>
          </div>
          <div className="std-colored-wrapper">
            <h3>Box garanties 100% recyclabes</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              aliquam velit non lectus suscipit feugiat. Sed consectetur at
              lectus sed efficitur. Vestibulum quis est non lectus pretium
              congue in et dui. Proin sit amet metus at tortor efficitur
              porttitor quis et massa. Curabitur semper eros eget urna ornare
              pharetra.{" "}
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return <p>Chargement en cours...</p>;
  }
}
