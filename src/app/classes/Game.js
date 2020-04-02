import Deck from "./Deck";
import Dealer from "./Dealer";
import { next } from "sucrase/dist/parser/tokenizer";

class Game {
  constructor(id, players) {
    this.id = id;
    this.players = [players];
    this.deck = new Deck();
    this.dealer = new Dealer();
    this.turnPlayer = this.players[0];
  }

  turn(tPlayer) {
    if (tPlayer.socket.id == this.turnPlayer.socket.id) {
      const { player, card } = this.dealer.giveCard(
        tPlayer.name,
        this.deck.cards
      );
      const next = this.next(tPlayer);
      const rule = this.getRules(card);
      console.log({ player, card, rule, next: next.name });
      return { player, card, rule, next: next.name };
    }
  }
  getRules(carta) {
    const rules = {
      A: "Escolha uma pessoa para beber",
      2: "Escolha duas pessoas para beber",
      3: "Escolha três pessoas pra beber",
      4: "Eu nunca",
      5: "Sobre-coxa",
      6: "Mercado",
      7: "Pi",
      8: "Crie uma regra",
      9: "Dedinho",
      10: "Proíba uma palavra",
      J: "Quem tirou bebe",
      Q: "Mulheres bebem",
      K: "Homens bebem"
    };
    return rules[carta.value];
  }
  next(player) {
    let index = this.players.indexOf(player) + 1;
    this.turnPlayer = this.players[index % this.players.length];
    const nextPlayer = this.turnPlayer;
    return nextPlayer;
  }
}
export default Game;
