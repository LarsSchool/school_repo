double ekg[] = {0.19136,0.19136,0.27337,0.41006,0.54675,0.74282,2.0672,4.8761,9.1102,13.701,18.291,22.881,27.472,30.226,29.92,26.554,21.963,17.373,12.782,8.1921,4.2015,1.7103,0.7185,0.62638,0.53427,0.44215,0.35004,0.25792,0.16581,-0.9667,-6.2608,-14.335,-14.306,-1.4965,22.712,48.475,71.736,76.651,60.719,26.441,-10.339,-44.249,-57.116,-46.071,-20.956,-4.5927,0.149,0.24213,0.33526,0.42839,0.52151,0.61464,0.70777,0.80089,0.89402,0.98715,1.0803,1.1734,1.2665,1.3597,1.4528,1.5459,1.9248,3.0181,4.8258,7.0621,9.2985,11.535,13.771,15.65,16.097,15.053,12.877,10.64,8.404,6.1676,4.0046,2.3792,1.3647,0.88781,0.48964,0.1937,0.032284};

int potPin = A0; // Analog pin connected to potentiometer
int potValue = 0; // Variable to store potentiometer value

void setup() {
  Serial.begin(115200);
}

void loop() {  
  // Output ekg array
  for (int k = 0; k < 83; k++) {
    Serial.println(ekg[k], 4);
    delay(10);
  }

  // Read potentiometer value
  potValue = analogRead(potPin);

  // Map potentiometer value to delay range
  int delayValue = map(potValue, 0, 1023, 1, 100);

  for (int k = 0; k < delayValue; k++) {
    Serial.println(0);
    delay(10);
  }