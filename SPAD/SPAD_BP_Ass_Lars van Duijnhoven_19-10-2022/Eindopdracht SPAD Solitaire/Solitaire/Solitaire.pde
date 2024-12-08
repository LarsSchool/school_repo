int GROOTTE;
int locatieX;
int locatieY;
int diameter = 30;
int aantalKeerGekliktOpLocatie = 0;
int puntenAantalSpeler1 = 0;
int puntenAantalSpeler2 = 0;
int spelerBeurt = 1;
int gesneuveldeBlokjes = 0;
int aantalPechPionnen;
int aantalBonusPionnen;
int aantalZwartePionnen;
final int STARTSCHERM = 0;
final int SPEELSCHERM = 1;
final int EINDSCHERM = 2;
int scherm = STARTSCHERM;
PImage pijl_links;
PImage pijl_rechts;


void setup() {
  size (900, 900);
  background(GRIJS);
  diameterCirkel = width/11;
  breedteStopKnop = width/5;
  hoogteStopKnop = height/14;
  breedteStartKnop = breedteStopKnop;
  hoogteStartKnop = hoogteStopKnop;
  pijl_links = loadImage("pijlLinks.png");
  pijl_rechts = loadImage("pijlRechtsAchtergrond.png");
  pijl_links.resize(width/15, 50);
  pijl_rechts.resize(width/15, 50);
}

void draw() {
  tekenSchermen();
  fill(ROOD);
}

void mouseClicked() {
  checkWelkeKlik();
  if (scherm == SPEELSCHERM) {
    locatieX = checkLocatieX();
    locatieY = checkLocatieY();
  }
  if (scherm == SPEELSCHERM && (veld[locatieY][locatieX] ==  PION || veld[locatieY][locatieX] ==  ZWARTEPION || veld[locatieY][locatieX] ==  LEEG || veld[locatieY][locatieX] == GEKLIKTE_PION || veld[locatieY][locatieX] == GEKLIKTE_ZWARTE_PION)) {
    aantalKeerGekliktOpLocatie++;
  }
  if (scherm == SPEELSCHERM) {
    checkOfVerplaatsenPion();
  }
}
