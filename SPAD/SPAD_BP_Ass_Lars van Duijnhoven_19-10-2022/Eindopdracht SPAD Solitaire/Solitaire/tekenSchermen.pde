
void tekenSchermen() {
  switch (scherm) {
  case STARTSCHERM:
    tekenStartscherm();
    specialePionnenGeplaatst = false;
    break;
  case SPEELSCHERM:
    tekenSpeelscherm(veld);
    break;
  case EINDSCHERM:
    tekenEindscherm();
    break;
  }
}
