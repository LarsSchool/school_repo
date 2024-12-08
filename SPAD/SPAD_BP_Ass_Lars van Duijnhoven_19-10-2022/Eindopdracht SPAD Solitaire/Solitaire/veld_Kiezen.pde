int[][] veld;
int gekozenVeld = -1;

void veldKiezen() {
  switch (gekozenVeld) {
  case 1:
    veld = new int[veld1.length][veld1[0].length];
    for (int i = 0; i < veld1.length; i++) {
      for (int j = 0; j < veld1[i].length; j++) {
        veld[i][j] = veld1[i][j];
      }
    }
    break;
  case 2:
    veld = new int[veld2.length][veld2[0].length];
    for (int i = 0; i < veld2.length; i++) {
      for (int j = 0; j < veld2[i].length; j++) {
        veld[i][j] = veld2[i][j];
      }
    }
    break;
  case 3:
    veld = new int[veld3.length][veld3[0].length];
    for (int i = 0; i < veld3.length; i++) {
      for (int j = 0; j < veld3[i].length; j++) {
        veld[i][j] = veld3[i][j];
      }
    }
    break;
  case 4:
    veld = new int[veld4.length][veld4[0].length];
    for (int i = 0; i < veld4.length; i++) {
      for (int j = 0; j < veld4[i].length; j++) {
        veld[i][j] = veld4[i][j];
      }
    }
    break;
  }
}
