const letterinCard = { 1: "A", 11: "J", 12: "Q", 13: "K" };
const suits = ["H", "S", "C", "D"];
class Card {
  constructor(number, suit) {
    this.value = number;
    if (letterinCard[number]) {
      this.value = letterinCard[number];
    }
    this.suit = suits[suit];
  }
}

export default Card;
