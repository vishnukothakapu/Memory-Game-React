import React, { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";
const cardImages = [
  { src: "/img/rat.jpg", matched: false },
  { src: "/img/elephant.jpg", matched: false },
  { src: "/img/frog.jpg", matched: false },
  { src: "/img/cat.jpg", matched: false },
  { src: "/img/dog.jpg", matched: false },
  { src: "/img/dolphin.jpg", matched: false },
];
const App = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
   const preloadImages = () => {
     cardImages.forEach((card) => {
       const img = new Image();
       img.src = card.src;
     });
   };

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(0);
  };
  // handle a choice
  const handleChoice = (card) => {
    if (card.id === choiceOne?.id) return;
    console.log(card);
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };
  useEffect(() => {
    
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        console.log("cards match");
        resetTurn();
      } else {
        console.log("cards do not match");
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    preloadImages()
    shuffleCards()
  },[])
  return (
    <div className="App font-poppins">
      <h1 className="text-center text-4xl  font-extrabold">
        Magic Match
      </h1>
      <button
        className="button border border-1 border-white rounded-md hover:bg-blue-700 hover:border-blue-700 block mx-auto mt-5 px-2 py-1 font-medium cursor-pointer "
        onClick={shuffleCards}
      >
        New game
      </button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p className="text-center mt-5 font-semibold">Turns: {turns}</p>
    </div>
  );
};

export default App;
