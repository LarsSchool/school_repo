int oudeLocatieX;
int oudeLocatieY;
int oudeTijd;

void checkOfVerplaatsenPion() {
  //eerste klik
  if (aantalKeerGekliktOpLocatie == 1 && (veld[locatieY][locatieX] == PION || veld[locatieY][locatieX] == ZWARTEPION)) {
    oudeLocatieX = locatieX;
    oudeLocatieY = locatieY;
    if (veld[locatieY][locatieX] == PION) {
      veld[locatieY][locatieX] = GEKLIKTE_PION;
    } else if (veld[locatieY][locatieX] == ZWARTEPION) {
      veld[locatieY][locatieX] = GEKLIKTE_ZWARTE_PION;
    }
  }
  //tweede klik
  if (aantalKeerGekliktOpLocatie == 2 && veld[locatieY][locatieX] == LEEG  && ((locatieX == oudeLocatieX + 2 || locatieX == oudeLocatieX - 2 && locatieY == oudeLocatieY) || ((locatieY == oudeLocatieY + 2) || (locatieY == oudeLocatieY - 2)) && locatieX == oudeLocatieX)) {

    // als je over een zwarte pion gaat, veranderd oude locatie in oude teken
    // dus je kan gewoon niet over een zwarte heen
    if (veld[(locatieY + oudeLocatieY)/2][(locatieX + oudeLocatieX)/2] == ZWARTEPION|| veld[(locatieY + oudeLocatieY)/2][(locatieX + oudeLocatieX)/2] == GEKLIKTE_ZWARTE_PION) {
      if (veld[oudeLocatieY][oudeLocatieX] == GEKLIKTE_PION) {
        veld[oudeLocatieY][oudeLocatieX] = PION;
      } else if (veld[oudeLocatieY][oudeLocatieX] == GEKLIKTE_ZWARTE_PION ) {
        veld[oudeLocatieY][oudeLocatieX] = ZWARTEPION;
      }
    }
    switch (veld[(locatieY + oudeLocatieY)/2][(locatieX + oudeLocatieX)/2]) {
    case BONUSPION:
      switch(spelerBeurt) {
      case 1:
        puntenAantalSpeler1 = puntenAantalSpeler1 * 2;
        floor(puntenAantalSpeler1);
        puntenAantalSpeler1--;
        break;
      case 2:
        puntenAantalSpeler2 = puntenAantalSpeler2 * 2;
        floor(puntenAantalSpeler2);
        puntenAantalSpeler2--;
        break;
      }

      break;
      //als het een pechpion is, doe punten delen door 2
    case PECHPION:
      switch(spelerBeurt) {
      case 1:
      println(spelerBeurt + puntenAantalSpeler1);
        puntenAantalSpeler1--;
        puntenAantalSpeler1 = puntenAantalSpeler1 / 2;
        floor(puntenAantalSpeler1);
        println(puntenAantalSpeler1);
        break;
      case 2:
        puntenAantalSpeler2--;
        puntenAantalSpeler2 = puntenAantalSpeler2 / 2;
        floor(puntenAantalSpeler2);
        break;
      }
      break;
    }

    // maak de locatie tussen de 2 blokjes leeg als het geen zwarte pion is.
    if (veld[(locatieY + oudeLocatieY)/2][(locatieX + oudeLocatieX)/2] == PION || veld[(locatieY + oudeLocatieY)/2][(locatieX + oudeLocatieX)/2] == BONUSPION || veld[(locatieY + oudeLocatieY)/2][(locatieX + oudeLocatieX)/2] == PECHPION) {
      veld[(locatieY + oudeLocatieY)/2][(locatieX + oudeLocatieX)/2] = LEEG;
    }
    //verplaats de oude pion naar de nieuwe locatie
    if (veld[oudeLocatieY][oudeLocatieX] == GEKLIKTE_PION && veld[(locatieY + oudeLocatieY)/2][(locatieX + oudeLocatieX)/2] != ZWARTEPION) { 
      veld[locatieY][locatieX] = PION;
      veld[oudeLocatieY][oudeLocatieX] = LEEG;
      gesneuveldeBlokjes++;
      if (playerAantal == 2) {
        if (spelerBeurt == 1) {
          puntenAantalSpeler1++;
        } else if (spelerBeurt == 2) {
          puntenAantalSpeler2++;
        }
      } else {
        puntenAantalSpeler1++;
      }
      if (playerAantal == 2) {
        spelerBeurt++;
        oudeTijd = millis();
      } else {
        spelerBeurt = 1;
      }
      //verplaats de oude zwarte pion naar de nieuwe locatie
    } else if (veld[oudeLocatieY][oudeLocatieX] == GEKLIKTE_ZWARTE_PION && veld[(locatieY + oudeLocatieY)/2][(locatieX + oudeLocatieX)/2] != ZWARTEPION) {
      veld[locatieY][locatieX] = ZWARTEPION;
      veld[oudeLocatieY][oudeLocatieX] = LEEG;
      gesneuveldeBlokjes++;
      if (playerAantal == 2) {
        if (spelerBeurt == 1) {
          puntenAantalSpeler1++;
        } else if (spelerBeurt == 2) { //DIT NOG TESTEN WANT IK SLOEG MET ZWARTE PION EN HIJ TELDE GEEN PUNTEN ER BIJ!!!!!!
          puntenAantalSpeler2++;
        }
        spelerBeurt++;
      } else {
        puntenAantalSpeler1++;
      }
    }


  }
  if (spelerBeurt >= 3) {
    spelerBeurt = 1;
  }
  //als je op dezelfde locatie klikt, verander het weer terug
  else if (aantalKeerGekliktOpLocatie == 2 && locatieX == oudeLocatieX && locatieY == oudeLocatieY) {
    if (veld[locatieY][locatieX] == GEKLIKTE_PION) {
      veld[locatieY][locatieX] = PION;
    } else if (veld[locatieY][locatieX] == GEKLIKTE_ZWARTE_PION ) {
      veld[locatieY][locatieX] = ZWARTEPION;
    }
  }
  //als er niet op een van de 4 juiste locaties geklikt wordt, veranderd de oude locatie weer terug
  else if (aantalKeerGekliktOpLocatie == 2 && ((locatieX != oudeLocatieX + 2|| locatieX != oudeLocatieX - 2 || locatieY == oudeLocatieY) || ((locatieY != oudeLocatieY + 2) || (locatieY != oudeLocatieY - 2)) || locatieX == oudeLocatieX)) {
    if (veld[oudeLocatieY][oudeLocatieX] == GEKLIKTE_PION) {
      veld[oudeLocatieY][oudeLocatieX] = PION;
    } else if (veld[oudeLocatieY][oudeLocatieX] == GEKLIKTE_ZWARTE_PION) {
      veld[oudeLocatieY][oudeLocatieX] = ZWARTEPION;
    }
  }
  if (aantalKeerGekliktOpLocatie == 2) {
    aantalKeerGekliktOpLocatie = 0;
  }
}
