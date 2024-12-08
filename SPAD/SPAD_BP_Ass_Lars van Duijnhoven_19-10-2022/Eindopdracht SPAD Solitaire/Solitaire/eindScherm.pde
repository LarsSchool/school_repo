final int PAARS_ACHTERGROND = #361F5D; //#361F5D
final int DONKER_BLAUW = #31AFD4; //#00A7E1, #0938B8
final int GOUD = #FFAE00;

void tekenEindscherm() {
  background(PAARS_ACHTERGROND);
  tekenOpnieuwKnop();
  kleurScores();
}

void kleurScores() {
  int breedteRechthoek = width/8 * 6;
  int hoogteRechthoek = height/8;
  textSize(width/20);
  textAlign(CENTER, TOP);
  switch(playerAantal) {
  case 1:
    strokeWeight(16);
    stroke(DONKER_BLAUW);
    rect(width/2 - (breedteRechthoek/3 * 2) / 2, height/5 - hoogteRechthoek/4, breedteRechthoek/3 * 2, hoogteRechthoek, 7);
    fill(DONKER_BLAUW);
    text("Aantal punten: " + puntenAantalSpeler1, width/2, height/5);
    break;
  case 2:
    //de winnaar een goud randje geven
    if (puntenAantalSpeler1 > puntenAantalSpeler2) {
      tekenScores(breedteRechthoek, hoogteRechthoek, GOUD, DONKER_BLAUW);
    } else if (puntenAantalSpeler1 < puntenAantalSpeler2) {
      tekenScores(breedteRechthoek, hoogteRechthoek, DONKER_BLAUW, GOUD);
    } else {
      tekenScores(breedteRechthoek, hoogteRechthoek, DONKER_BLAUW, DONKER_BLAUW);
    }
    break;
  }
  stroke(DONKER_BLAUW);
  fill(0);
  rect(width/2 - (breedteRechthoek - 70)/2, height/5 * 3 - hoogteRechthoek/4, breedteRechthoek - 70, hoogteRechthoek, 12);
  fill(DONKER_BLAUW);
  text("Gesneuvelde blokjes: " + gesneuveldeBlokjes, width/2, height/5 * 3);
}

void tekenOpnieuwKnop() {
  fill(0);
  stroke(0);
  rect(width/18 * 15 - (breedteStartKnop/2)- 8, height - hoogteStartKnop - 16 - 30, breedteStartKnop + 16, hoogteStartKnop + 16, 8);
  fill(FEL_LICHTGROEN);
  stroke(FEL_LICHTGROEN);
  rect(width/18 * 15 - (breedteStartKnop/2), height - 8 - hoogteStartKnop - 30, breedteStartKnop, hoogteStartKnop, 8);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(width/40);
  text("OPNIEUW?", width/18 * 15, height - hoogteStartKnop/2 - 8 - 30);
}

void tekenScores(int breedteRechthoek, int hoogteRechthoek, int kleur1, int kleur2) {
  strokeWeight(16);
  stroke(kleur1);
  fill(0);
  rect(width/2 - breedteRechthoek/2, height/5 - hoogteRechthoek/4, breedteRechthoek, hoogteRechthoek, 12);
  fill(kleur1);
  text("Aantal punten speler 1: " + puntenAantalSpeler1, width/2, height/5 );
  stroke(kleur2);
  fill(0);
  rect(width/2 - breedteRechthoek/2, height/5 * 2 - hoogteRechthoek/4, breedteRechthoek, hoogteRechthoek, 12);
  fill(kleur2);
  text("Aantal punten speler 2: " + puntenAantalSpeler2, width/2, height/5 * 2 );
}
