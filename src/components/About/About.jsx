import "./About.css";
import defaultImg from "../../vendor/images/default-img.jpg";

export default function About() {
  return (
    <div className="about__container">
      <img src={defaultImg} alt="" className="about__img" />
      <div className="about__information-container">
        <h2 className="about__title">About the author</h2>
        <p className="about__description">
          This block describes the project author. Here you should indicate your
          name, what you do, and which development technologies you know.
          <br />
          <br />
          You can also talk about your experience with TripleTen, what you
          learned there, and how you can help potential customers.
        </p>
      </div>
    </div>
  );
}
