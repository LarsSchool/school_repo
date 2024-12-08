int breedteStartKnop;
int hoogteStartKnop;
int diameterCirkel;

void tekenStartscherm() {
  background(ACHTERGROND);
  int knoppenX = width/4;
  tekenKnopZwartePionnen(knoppenX);
  tekenKnopBonusPionnen(knoppenX);
  tekenKnopPechPionnen(knoppenX);
  tekenStartKnop();
  tekenSpelerAantalKnoppen();
  tekenGridSizeKnoppen();
}

void tekenKnopZwartePionnen(int x) {
  tekenKnop(x, height/15 * 6, width/2, height/10, GEEL, 0);
  textSize(width/40);
  textAlign(CENTER, CENTER);
  for (int i = 0; i < 5; i++) {
    int kleur;
    if (geklikteKnoppen[0][i]) {
      kleur = KNOP_INGEDRUKT_KLEUR;
    } else {
      kleur = GEEL;
    }
    tekenKnop(x + i * (width/2)/5, height/15 * 6 + height/30, (width/2)/5, height/10 - height/50, kleur, 0);
    fill(0);
    text(i * 2, x + i * (width/2)/5 + (width/2)/10, height/15 * 6 + height/30 + (height/10 - height/50)/2);
  }
  fill(0);
  text("Aantal Zwarte Pionnen", width/2, height/90 * 37);
}

void tekenKnopBonusPionnen(int x) {
  tekenKnop(x, height/15 * 8, width/2, height/10, GEEL, 0);
  textSize(width/40);
  textAlign(CENTER, CENTER);
  for (int i = 0; i < 5; i++) {
    int kleur;
    if (geklikteKnoppen[1][i]) {
      kleur = KNOP_INGEDRUKT_KLEUR;
    } else {
      kleur = GEEL;
    }
    tekenKnop(x + i * (width/2)/5, height/15 * 8 + height/30, (width/2)/5, height/10 - height/50, kleur, 0);
    fill (0);
    text(i * 2, x + i * (width/2)/5 + (width/2)/10, height/15 * 8 + height/30 + (height/10 - height/50)/2);
  }
  text("Aantal Bonus Pionnen", width/2, height/90 * 49);
}

void tekenKnopPechPionnen(int x) {
  tekenKnop(x, height/15 * 10, width/2, height/10, GEEL, 0);
  textSize(width/40);
  textAlign(CENTER, CENTER);
  for (int i = 0; i < 5; i++) {
    int kleur;
    if (geklikteKnoppen[2][i]) {
      kleur = KNOP_INGEDRUKT_KLEUR;
    } else {
      kleur = GEEL;
    }
    tekenKnop(x + i * (width/2)/5, height/15 * 10 + height/30, (width/2)/5, height/10 - height/50, kleur, 0);
    fill(0);
    text(i * 2, x + i * (width/2)/5 + (width/2)/10, height/15 * 10 + height/30 + (height/10 - height/50)/2);
  }
  fill(0);
  text("Aantal Pech Pionnen", width/2, height/90 * 61);
}

void tekenStartKnop() {
  fill(0);
  stroke(0);
  strokeWeight(3);
  rect(width/18 * 15 - (breedteStartKnop/2)- 8, height - hoogteStartKnop - 16 - 30, breedteStartKnop + 16, hoogteStartKnop + 16, 8);
  fill(FEL_LICHTGROEN);
  stroke(FEL_LICHTGROEN);
  rect(width/18 * 15 - (breedteStartKnop/2), height - 8 - hoogteStartKnop - 30, breedteStartKnop, hoogteStartKnop, 8);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(width/40);
  text("START", width/18 * 15, height - hoogteStartKnop/2 - 8 - 30);
}

void tekenGridSizeKnoppen() {
  String gridSize = "Niet gekozen";
  int middenlijnSpelerPijl =  width/2 - (width/15)/2;
  switch(gekozenVeld) {
  case 1:
    gridSize = "9x9";
    break;
  case 2:
    gridSize = "15x15";
    break;
  case 3:
    gridSize = "21x21";
    break;
  case 4:
    gridSize = "27x27";
    break;
  }

  //links
  stroke(ACHTERGROND);
  circle(middenlijnSpelerPijl - width/6 + (width/15)/2, height/15 * 4 + 50/2, diameterCirkel);
  image(pijl_links, middenlijnSpelerPijl - width/6, height/15 * 4);
  //rechts
  circle(middenlijnSpelerPijl + width/6 + (width/15)/2, height/15 * 4 + 50/2, diameterCirkel);
  image(pijl_rechts, middenlijnSpelerPijl + width/6, height/15 * 4);
  textSize(width/28);
  textAlign(CENTER, CENTER);
  text("Grid size:", width/2, height/15 * 2);
  text(gridSize, width/2, height/15 * 2 + 40);
}

void tekenSpelerAantalKnoppen() {
  int middenlijnGridPijl =  width/2 - (width/15)/2;
  //links
  stroke(ACHTERGROND);
  circle(middenlijnGridPijl - width/6 + (width/15)/2, height/15 * 2 + 50/2, diameterCirkel);
  image(pijl_links, middenlijnGridPijl - width/6, height/15 * 2);
  //rechts
  circle(middenlijnGridPijl + width/6 + (width/15)/2, height/15 * 2 + 50/2, diameterCirkel);
  image(pijl_rechts, middenlijnGridPijl + width/6, height/15 * 2);
  textSize(width/23);
  textAlign(CENTER, CENTER);
  text("Spelers: " + playerAantal, width/2, height/15 * 4 + 20);
}

void tekenKnop(int x, int y, int breedte, int hoogte, int kleur, int kleur2) {
  stroke(kleur2);
  fill(kleur);
  rect(x, y, breedte, hoogte, 5);
}
