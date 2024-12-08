
/*
Met deze code kan je een byte (256 bits) opsplitsen in 2 waardes, namelijk 1 waarde die 0-9 kan zijn en dus 10 waardes heeft. 
Dit is bij ons patiëntID.
Daarnaast heb je ook nog een waarde die 0-24 kan zijn, omdat 0-25 te veel zou zijn, want dan heb je een machine die maar 5 patiënten kan hebben, omdat het limiet 255 is (met nul erbij geteld).
Dit is bij ons machineID.
Deze 2 waardes kunnen ook omgedraaid worden om meer patiënten te kunnen hebben, maar dan heb je wel ook minder machines ter beschikking.

*/

// De eerste twee letters (bij 2 is dat 002, dus 00) zijn het patiënten id en de andere is het machineID
byte ID_array[10] = {123, 111, 2, 0, 249, 200, 500, 69, -1, 18};  // Zorg ervoor dat deze inputs goed zijn, zoals bij 500 krijg je als ID 244, want 500 - 256 = 244.   
                                                                  // Bijvoorbeeld dan bij -1 krijg je patient ID van 5 met machine 25, wat niet kan, want dan kunnen maar 5 patiënten gebruik maken van machine 25.

byte values[2];

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);

  for(int i = 0; i < 10; i++){
    getIDs(ID_array[i], values);
    Serial.print("Patiënt ID: ");
    Serial.println(values[0]);
    Serial.print("Machine ID: ");
    Serial.println(values[1]);
    Serial.println();
    Serial.println();
  }
}

void loop() {
  // put your main code here, to run repeatedly:
}

void getIDs(byte ID, byte* returnValues){
  Serial.print("ID: ");
  Serial.println(ID);
  returnValues[0] = ID % 10; // Pak de laatste value door module 10 uit te voeren.
  returnValues[1] = (ID - returnValues[0])/10;  // Pak de eerste 2 waardes door alles eerst naar een afgerond honderdtal te krijgen door returnValues[0] eraf te halen 
                                                // en deel dit daarna door 10, om op een afgerond tiental te komen.
  /* Voorbeeldjes 
  155 % 10 = 5, want 150 kan je delen door 10 en dan heb je een rest van 5.
  Dan pak je de hiervoor berekende waarde, in dit geval 5, en haal je dit van het complete ID af.
  155 - 5 = 150, nu zit je op een mooi afgerond honderdtal en dit kan je delen door 10.
  150 / 10 = 15.
  Dus patiëntID is 5 en machineID is 15.
  
  0 % 10 = 0
  (0 - 0)/ 10 = 0
  PatiëntID = 0 en machineID = 0

  7 % 10 = 7
  (7 - 7) = 0
  PatiëntID = 7 en machineID = 0
  
  Groetjes van Lars :).
  */
}
