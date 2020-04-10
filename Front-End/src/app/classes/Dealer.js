class Dealer{
    shuffle(deck){
        var currentIndex = deck.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = deck[currentIndex];
          deck[currentIndex] = deck[randomIndex];
          deck[randomIndex] = temporaryValue;
        }
      
        return deck;
    }

    giveCard(player,deck){
        if(deck.length>0){
            let card = deck.pop()
            return {player,card}
        }else{
            console.log('Game Over')
        }
    }
}

export default Dealer;