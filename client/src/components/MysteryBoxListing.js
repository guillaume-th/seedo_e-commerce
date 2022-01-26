import { useEffect, useState } from "react";
const API_URL = process.env.REACT_APP_API_URL;

export default function MysteryBoxListing() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/article/mystery/all`)
            .then((res) => res.json())
            .then(res => {
                setData(res.result);
            })
            .catch(err => console.error(err));
    }, []);

    if (data) {
        return (
            <div className="wrapper">
                <div className="wrapper" style={{ padding: "3rem" }}>
                    <div className="std-colored-wrapper">
                        <h3>Une nouvelle manière d'aborder le jardinage</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquam velit non lectus suscipit feugiat. Sed consectetur at lectus sed efficitur. Vestibulum quis est non lectus pretium congue in et dui. Proin sit amet metus at tortor efficitur porttitor quis et massa. Curabitur semper eros eget urna ornare pharetra.  </p>
                        <div className="std-colored-wrapper" style={{ width: "auto" }}>
                            {data.map((e) => {
                                return (
                                    <div>
                                        {/* <img src={e.} /> */}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="std-colored-wrapper" >
                        <h3>Box garanties 100% recyclabes</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquam velit non lectus suscipit feugiat. Sed consectetur at lectus sed efficitur. Vestibulum quis est non lectus pretium congue in et dui. Proin sit amet metus at tortor efficitur porttitor quis et massa. Curabitur semper eros eget urna ornare pharetra.  </p>
                    </div>
                </div>
            </div>
        );
    }
    else {

        return (
            <p>Chargement en cours...</p>
        );
    }

}