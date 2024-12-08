boolean[][] geklikteKnoppen = {
  {false, false, false, false, false}, 
  {false, false, false, false, false}, 
  {false, false, false, false, false}
};


void checkWelkeKlik() {
  if (scherm == STARTSCHERM) {
    for (int j = 0; j < 3; j++) {
      if (mouseX > width/4 && mouseX < width/4 + width/2 && mouseY > height/15 * (5 + (j*2)) + height/10 && mouseY < height/15 * (5 + (j*2)) + height/10 + height/10 - height/50) {
        for ( int i = 0; i < 5; i++) {
          if (mouseX > width/4 + i * width/10 && mouseX < width/4 + (i+1) * width/10) {
            geklikteKnoppen[j][i] = true;
            switch(j) {
            case 0:
              aantalZwartePionnen = i * 2;
              break;
            case 1:
              aantalBonusPionnen = i * 2;
              break;
            case 2:
              aantalPechPionnen = i * 2;
              break;
            }
          } else {
            geklikteKnoppen[j][i] = false;
          }
        }
      }
    }


    //rechts gridSize
    if (dist(mouseX, mouseY, width/2 - (width/15)/2 + width/6 + (width/15)/2 - 2, height/15 * 2 + 50/2) < diameterCirkel/2) {
      gekozenVeld++;
      if (gekozenVeld > 4) {
        gekozenVeld = 1;
      }
    } 
    //links gridSize
    else if (dist(mouseX, mouseY, width/2 - (width/15)/2 - width/6 + (width/15)/2 - 2, height/15 * 2 + 50/2) < diameterCirkel/2) {
      gekozenVeld--;
      if (gekozenVeld < 1) {
        gekozenVeld = 4;
      }
    }
    //rechts playerAantal
    if (dist(mouseX, mouseY, width/2 - (width/15)/2 + width/6 + (width/15)/2 - 2, height/15 * 4 + 50/2) < diameterCirkel/2) {
      playerAantal++;
      if (playerAantal > 2) {
        playerAantal = 1;
      }
    } 
    //links playerAantal
    else if (dist(mouseX, mouseY, width/2 - (width/15)/2 - width/6 + (width/15)/2 - 2, height/15 * 4 + 50/2) < diameterCirkel/2) {
      playerAantal--;
      if (playerAantal < 1) {
        playerAantal = 2;
      }
    }
  }

  if (mouseX > width/18 * 15 - breedteStartKnop/2 - 8 && mouseX < width/18 * 15 + breedteStartKnop/2 + 8 && mouseY > height - hoogteStartKnop - 16 - 30 && mouseY < height - 30) {
    switch(scherm) {
    case STARTSCHERM:
      scherm = SPEELSCHERM;
      veldKiezen();
      GROOTTE = height/veld.length;
      oudeTijd = millis();
      break;
    case SPEELSCHERM:
      scherm = EINDSCHERM;
      break; 
    case EINDSCHERM:
      puntenAantalSpeler1 = 0;
      puntenAantalSpeler2 = 0;
      gesneuveldeBlokjes = 0;
      scherm = STARTSCHERM;
      break;
    }
  }
}
