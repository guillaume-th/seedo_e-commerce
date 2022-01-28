import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import boxSeedo from "../assets/boxSeedo.jpg";
import seeds from "../assets/lineOfSeeds.png";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    return (
        <div>
            <Carousel autoPlay={"true"} infiniteLoop={"true"} className="vertical-flex center-flex">
                <div onClick={() => navigate("/articles/promo")}>
                    <img src={img1} />
                </div>
                <div onClick={() => navigate("/mystery-boxes")}>
                    <img src={img2} />
                </div>
                <div onClick={() => navigate("/articles/new")}>
                    <img src={img3} />
                </div>
            </Carousel>
            <section className='boxMystere'>
                <h1 className='aboutTitle center-text'><em>Mystery Box</em></h1>
                <div className='horizontal-flex center-flex container'>
                    <div className='wrapper-rond'>
                        <img src={boxSeedo} />
                    </div>
                    <p className='textBox'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dignissim, sem id laoreet varius, 
                        mauris sem porttitor orci, et vulputate leo ligula quis risus. Nam imperdiet imperdiet mollis. 
                        Mauris elit leo, sollicitudin et elementum vitae, bibendum quis nulla. Lorem ipsum dolor sit amet, 
                        consectetur adipiscing elit
                    </p>
                </div>
            </section>
            <hr className='hrGreen'></hr>
            <section className='vertical-flex center-flex marginAuto seeds'>
                <img src={seeds} className='imgSeed'/>
                <p className='textSeeds'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dignissim, sem id laoreet varius, 
                    mauris sem porttitor orci, et vulputate leo ligula quis risus. Nam imperdiet imperdiet mollis. 
                    Mauris elit leo, sollicitudin et elementum vitae, bibendum quis nulla. Lorem ipsum dolor sit amet, 
                    consectetur adipiscing elit.</p>
            </section>
            <hr className='hrGreen'></hr>
            <section className="about vertical-flex marginAuto">
                <h1 className='aboutTitle'>Qui sommes nous ?</h1>
                <div className="content horizontal-flex">
                    <div className='contentImg'>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dignissim, sem id laoreet varius, 
                            mauris sem porttitor orci, et vulputate leo ligula quis risus. Nam imperdiet imperdiet mollis. 
                            Mauris elit leo, sollicitudin et elementum vitae, bibendum quis nulla. Lorem ipsum dolor sit amet, 
                            consectetur adipiscing elit. Vivamus consequat eu nulla nec commodo. Praesent leo quam, luctus sit 
                            amet libero in, mattis efficitur leo. 
                        </p>
                    </div>
                </div>
            </section>

        </div>
    );
}