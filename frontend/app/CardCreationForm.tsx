import { useState } from "react";
import { Input, Button, Textarea } from "@nextui-org/react";

const CardCreationForm = ({ onCardCreate }) => {
  const [cardName, setCardName] = useState("");
  const [attackValue, setAttackValue] = useState("");
  const [defenseValue, setDefenseValue] = useState("");
  const [artworkPrompt, setArtworkPrompt] = useState("");

  const handleCreateCard = () => {
    // Placeholder for card creation logic
    onCardCreate({
      name: cardName,
      attack: attackValue,
      defense: defenseValue,
      artwork: artworkPrompt,
    });
  };

  return (
    <div className="flex lex flex-col w-full max-w-md bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-lg p-8 gap-8 border border-stone-500/50">
      <h4 className="text-center text-white">Create a New Card</h4>
      <Input
        size="sm"
        variant="faded"
        placeholder="Card name"
        value={cardName}
        onChange={(e) => setCardName(e.target.value)}
        className="input"
      />
      <Textarea
        variant="faded"
        placeholder="Describe the artwork"
        value={artworkPrompt}
        onChange={(e) => setArtworkPrompt(e.target.value)}
        className="input"
      />
      <div className="flex flex-row gap-6">
        <Input
          size="sm"
          variant="faded"
          placeholder="Attack value"
          value={attackValue}
          onChange={(e) => setAttackValue(e.target.value)}
          className="input"
        />
        <Input
          size="sm"
          variant="faded"
          placeholder="Defense value"
          value={defenseValue}
          onChange={(e) => setDefenseValue(e.target.value)}
          className="input"
        />
      </div>
      <Button
        auto
        flat
        className="w-full mt-4 bg-gradient-to-tr from-purple-500 to-pink-600 text-white shadow-lg"
        // className="card-button mt-4"
        onClick={handleCreateCard}
      >
        Generate Card
      </Button>
    </div>
  );
};

export default CardCreationForm;
