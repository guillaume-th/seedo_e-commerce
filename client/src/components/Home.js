import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
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
          <section className="boxMystere">
            <h1 className="aboutTitle center-text">
              <em>Mystery Box</em>
            </h1>
            <div className="horizontal-flex center-flex container">
              <div className="wrapper-rond">
                <img src={img1} />
              </div>
              <p className="textBox">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas dignissim, sem id laoreet varius, mauris sem porttitor
                orci, et vulputate leo ligula quis risus. Nam imperdiet
                imperdiet mollis. Mauris elit leo, sollicitudin et elementum
                vitae, bibendum quis nulla. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit
              </p>
            </div>
          </section>
          <hr className="hrGreen"></hr>
          <section className="about vertical-flex marginAuto">
            <h1 className="aboutTitle">Qui sommes nous ?</h1>
            <div className="content horizontal-flex">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas dignissim, sem id laoreet varius, mauris sem porttitor
                orci, et vulputate leo ligula quis risus. Nam imperdiet
                imperdiet mollis. Mauris elit leo, sollicitudin et elementum
                vitae, bibendum quis nulla. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Vivamus consequat eu nulla nec
                commodo. Praesent leo quam, luctus sit amet libero in, mattis
                efficitur leo. Suspendisse sodales ex non vehicula sagittis.
                Nulla euismod aliquam erat, ut viverra magna tristique in. In
                quis dolor a justo gravida sollicitudin. Maecenas vehicula
                lectus at purus sagittis vulputate. Nunc lobortis nulla nunc, eu
                tristique erat suscipit in. Quisque lacinia quam tincidunt,
                faucibus ligula sed, porta urna. Etiam dapibus mauris nulla,
                eget egestas est varius vitae.
              </p>
              <img src={img1} />
            </div>
          </section>
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
