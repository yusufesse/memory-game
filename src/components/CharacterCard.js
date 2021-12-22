import "./CharacterCard.css";

export default function CharacterCard({
  card,
  chosenCards,
  flipCard,
  interaction,
}) {
  const handleClick = () => {
    !interaction && chosenCards(card);
  };

  return (
    <div className={`card ${flipCard && "flip-card"}`}>
      <div onClick={handleClick} className="card-cover"></div>
      <img className="card-front" src={card.src} alt="card cover" />
    </div>
  );
}
