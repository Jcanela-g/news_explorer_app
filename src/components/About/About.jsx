import "./About.css";
import defaultImg from "../../vendor/images/author-img.jpg";

export default function About() {
  return (
    <div className="about__container">
      <img src={defaultImg} alt="" className="about__img" />
      <div className="about__information-container">
        <h2 className="about__title">About the author</h2>
        <p className="about__description">
          Hi there! My name is Jose Canela. Welcome to the NewsExplorer site!
          I'm currently a Ride Tech at a theme park, but I'm aspiring to be a
          Software Engineer some day. I have learned and now know a ton of
          development technologies like HTML, CSS, JavaScript, React, Node.js,
          Express.js, and many more. Checkout my GitHub with the link down below
          to see some of my other projects.
          <br />
          <br />I learned everything I know about coding thus far through
          TripleTen. Their Software Engineering program is amazing, they do a
          great job in teaching the material. In addition to their course they
          have a ton of support avaliable almost 24/7 to help you understand and
          get through the material. If you're interested you can check out their
          site in the link below to view all that they offer.
        </p>
      </div>
    </div>
  );
}
