boolean specialePionnenGeplaatst = false;
int playerAantal = 1;
int breedteStopKnop;
int hoogteStopKnop;

void tekenSpeelscherm(int[][] speelVeld) {
  fill(GRIJS);
  rect(-1, -1, width + 1, height + 1);
  tekenGrid(speelVeld);
  if (!specialePionnenGeplaatst) {
    maakSpecialePionnen();
  }
  printScores();
  tekenBeeindigKnop();
  houdTijdBij();
}

//check locaties
int checkLocatieX() {
  int xBegin = (width - (GROOTTE * veld.length))/2; 
  int xVierkantKlik = ((mouseX - xBegin) / GROOTTE);
  return xVierkantKlik;
}

int checkLocatieY() {
  int yBegin = (height - (GROOTTE * veld.length))/2;  
  int yVierkantKlik = ((mouseY - yBegin) / GROOTTE);
  return yVierkantKlik;
}

void houdTijdBij() {
  if (millis() - oudeTijd > 10000) {
    switch (spelerBeurt) {
    case 1:
      spelerBeurt = 2;
      oudeTijd = millis();
      break;
    case 2:
      spelerBeurt = 1;
      oudeTijd = millis();
      break;
    }
  }
}

void printScores() {
  fill(FELGEEL);
  textSize(width/30);
  textAlign(CENTER, CENTER);
  if (playerAantal == 1) {
    switch(gekozenVeld) {
    case 1:
      text("Aantal punten: " + puntenAantalSpeler1, width/5, height/7);
      break;
    case 2:
      text("Aantal punten: " + puntenAantalSpeler1, width/5 - width/75, height/7);    
      break;
    case 3:
      text("Aantal punten: " + puntenAantalSpeler1, width/5 - width/50, height/7);    
      break;
    case 4:
      text("Aantal punten: " + puntenAantalSpeler1, width/5 - width/45, height/7);
      break;
    }
  } else  if (playerAantal == 2) {
    switch(gekozenVeld) {
    case 1:
      kleurSpelerAanBeurt(1);
      text("Punten speler 1: " + puntenAantalSpeler1, width/6, height/12);
      kleurSpelerAanBeurt(2);
      text("Punten speler 2: " + puntenAantalSpeler2, width/6, height/12 + height/15);
      break;
    case 2:
      kleurSpelerAanBeurt(1);
      text("Punten speler 1: " + puntenAantalSpeler1, width/6 - width/75, height/12);   
      kleurSpelerAanBeurt(2);
      text("Punten speler 2: " + puntenAantalSpeler2, width/6 - width/75, height/12 + height/15);
      break;
    case 3:
      kleurSpelerAanBeurt(1);
      text("Punten speler 1: " + puntenAantalSpeler1, width/6 - width/50, height/12);  
      kleurSpelerAanBeurt(2);
      text("Punten speler 2: " + puntenAantalSpeler2, width/6 - width/50, height/12 + height/15);
      break;
    case 4:
      kleurSpelerAanBeurt(1);
      text("Punten speler 1: " + puntenAantalSpeler1, width/6 - width/45, height/12);
      kleurSpelerAanBeurt(2);
      text("Punten speler 2: " + puntenAantalSpeler2, width/6 - width/45, height/12 + height/15);
      break;
    }
  }
}

void kleurSpelerAanBeurt(int speler) {
  if (spelerBeurt == speler) {
    fill (ROODORANJE);
  } else {
    fill(FELGEEL);
  }
}

void tekenBeeindigKnop() {
  strokeWeight(0);
  fill(0);
  rect(width/18 * 15 - (breedteStopKnop/2)- 8, height - hoogteStopKnop - 16 - 30, breedteStopKnop + 16, hoogteStopKnop + 16, 8);
  fill(ROOD);
  rect(width/18 * 15 - (breedteStopKnop/2), height - 8 - hoogteStopKnop - 30, breedteStopKnop, hoogteStopKnop, 8);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(width/40);
  text("Geen zetten", width/18 * 15, height - hoogteStopKnop/2 - 25 - 30);
  text("meer mogelijk", width/18 * 15, height - hoogteStopKnop/2 - 30 );
}

void maakSpecialePionnen() {
  //zwarte pionnen
  for (int i = 0; i < aantalZwartePionnen; i++) {
    int xRandom = kiesRandomNummer(0, veld.length-1);
    int yRandom = kiesRandomNummer(0, veld[0].length-1);
    while (veld[yRandom][xRandom] != PION) {
      xRandom = kiesRandomNummer(0, veld.length-1);
      yRandom = kiesRandomNummer(0, veld[0].length-1);
    }
    veld[yRandom][xRandom] = ZWARTEPION;
  }
  //pechpionnen
  for (int i = 0; i < aantalPechPionnen; i++) {
    int xRandom = kiesRandomNummer(0, veld.length-1);
    int yRandom = kiesRandomNummer(0, veld[0].length-1);
    while (veld[yRandom][xRandom] != PION) {
      xRandom = kiesRandomNummer(0, veld.length-1);
      yRandom = kiesRandomNummer(0, veld[0].length-1);
    }
    veld[yRandom][xRandom] = PECHPION;
  }
  //bonuspionnen
  for (int i = 0; i < aantalBonusPionnen; i++) {
    int xRandom = kiesRandomNummer(0, veld.length-1);
    int yRandom = kiesRandomNummer(0, veld[0].length-1);
    while (veld[yRandom][xRandom] != PION) {
      xRandom = kiesRandomNummer(0, veld.length-1);
      yRandom = kiesRandomNummer(0, veld[0].length-1);
    }
    veld[yRandom][xRandom] = BONUSPION;
  }
  specialePionnenGeplaatst = true;
}

int kiesRandomNummer(int nummer1, int nummer2) {
  return round(random(nummer1, nummer2));
}
