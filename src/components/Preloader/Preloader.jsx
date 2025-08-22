import "./Preloader.css";

export default function Preloader({ text = "Searching for news..." }) {
  return (
    <div className="preloader">
      <span className="circle-preloader" />
      <p className="preloader__text">{text}</p>
    </div>
  );
}
