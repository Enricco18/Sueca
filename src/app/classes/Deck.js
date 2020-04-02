import Card from "./Card";
class Deck {
  constructor() {
    this.cards = [];
    this.generateCards();
  }

  generateCards() {
    for (let i = 1; i < 14; i++) {
      for (let j = 0; j < 4; j++) {
        this.cards.push(new Card(i, j));
      }
    }
  }
}

export default Deck;
