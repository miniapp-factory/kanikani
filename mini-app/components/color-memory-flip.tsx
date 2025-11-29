"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const COLORS = [
  "#e57373",
  "#f06292",
  "#ba68c8",
  "#9575cd",
  "#7986cb",
  "#64b5f6",
  "#4fc3f7",
  "#4dd0e1",
  "#e57373",
  "#f06292",
  "#ba68c8",
  "#9575cd",
  "#7986cb",
  "#64b5f6",
  "#4fc3f7",
  "#4dd0e1",
];
const COLOR_EMOJI_MAP = {
  "#e57373": "🐶",
  "#f06292": "🌸",
  "#ba68c8": "🍎",
  "#9575cd": "🐱",
  "#7986cb": "🌼",
  "#64b5f6": "🍌",
  "#4fc3f7": "🐰",
  "#4dd0e1": "🍓",
};

export default function ColorMemoryFlip() {
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<boolean[]>([]);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [time, setTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const pairColors = [...COLORS.slice(0, 8), ...COLORS.slice(0, 8)];
    shuffle(pairColors);
    setCards(pairColors);
    setMatched(Array(pairColors.length).fill(false));
    setFlipped([]);
    setMoves(0);
    setStartTime(Date.now());
    setTime(0);
    setGameOver(false);
  }, []);

  useEffect(() => {
    if (startTime !== null) {
      const timer = setInterval(() => {
        setTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [startTime]);

  const shuffle = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const handleClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched[index]) return;
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;
      if (cards[first] === cards[second]) {
        const newMatched = [...matched];
        newMatched[first] = true;
        newMatched[second] = true;
        setMatched(newMatched);
        setFlipped([]);
        if (newMatched.every(Boolean)) {
          setGameOver(true);
        }
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  const restart = () => {
    const pairColors = [...COLORS.slice(0, 8), ...COLORS.slice(0, 8)];
    shuffle(pairColors);
    setCards(pairColors);
    setMatched(Array(pairColors.length).fill(false));
    setFlipped([]);
    setMoves(0);
    setStartTime(Date.now());
    setTime(0);
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-4 gap-2">
        {cards.map((color, idx) => (
          <div
            key={idx}
            className="w-16 h-16 rounded-md cursor-pointer transition-transform duration-200"
            style={{
              backgroundColor: flipped.includes(idx) || matched[idx] ? color : "#cccccc",
              border: "2px solid #000",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              transform: flipped.includes(idx) || matched[idx] ? "rotateY(0)" : "rotateY(180deg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
            }}
            onClick={() => handleClick(idx)}
          >
            {(flipped.includes(idx) || matched[idx]) && (
              <span>{COLOR_EMOJI_MAP[color]}</span>
            )}
          </div>
        ))}
      </div>
      {gameOver && (
        <div className="text-center">
          <p className="text-lg font-semibold">You won!</p>
          <p>Time: {time}s | Moves: {moves}</p>
          <Button
            className="mt-2"
            onClick={restart}
          >
            Restart
          </Button>
        </div>
      )}
    </div>
  );
}
