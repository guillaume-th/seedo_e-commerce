import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../assets/1.jpeg";
import img2 from "../assets/2.jpeg";
import img3 from "../assets/3.jpeg";

export default function Home() {
  return (
    <div>
      <Carousel
        autoPlay={"true"}
        infiniteLoop={"true"}
        className="vertical-flex center-flex"
      >
        <div>
          <img src={img1} />
        </div>
        <div>
          <img src={img2} />
        </div>
        <div>
          <img src={img3} />
        </div>
      </Carousel>
      {/* <h1>Qui sommes nous ?</h1> */}
    </div>
  );
}
