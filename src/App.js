import { useEffect, useState } from "react";
import CharacterCard from "./components/CharacterCard";
import "./App.css";

const cardSrc = [
  { src: "/img/admiral-ackbar.png", matched: false },
  { src: "/img/c3p0.png", matched: false },
  { src: "/img/chewbacca.png", matched: false },
  { src: "/img/clone-trooper.png", matched: false },
  { src: "/img/darth-vader.png", matched: false },
  { src: "/img/ewok.png", matched: false },
  { src: "/img/luke-skywalker.png", matched: false },
  { src: "/img/stormtrooper.png", matched: false },
  { src: "/img/r2d2.png", matched: false },
  { src: "/img/yoda.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [cardOne, setCardOne] = useState(null);
  const [cardTwo, setCardTwo] = useState(null);
  const [interaction, setInteraction] = useState(false);

  const newGameHandler = () => {
    const setOfCards = [...cardSrc, ...cardSrc]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(setOfCards);
  };
  const chosenCards = (card) => {
    cardOne ? setCardTwo(card) : setCardOne(card);
  };

  console.log(cardOne, cardTwo);

  useEffect(() => newGameHandler(), []);

  const resetGame = () => {
    setCardOne(null);
    setCardTwo(null);
    setInteraction(false);
  };

  useEffect(() => {
    if (cardOne && cardTwo) {
      setInteraction(true);
      if (cardOne.src === cardTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            return card.src === cardOne.src ? { ...card, matched: true } : card;
          });
        });
        resetGame();
      } else {
        console.log("NO MATCH");
        setTimeout(() => resetGame(), 1000);
      }
    }
  }, [cardOne, cardTwo]);

  return (
    <div className="App">
      <h1 className="header">Star wars</h1>
      <button onClick={newGameHandler} className="btn">
        New Game
      </button>
      <div className="grid--4cols">
        {cards.map((card) => (
          <CharacterCard
            key={card.id}
            flipCard={card === cardOne || card === cardTwo || card.matched}
            card={card}
            chosenCards={chosenCards}
            interaction={interaction}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
