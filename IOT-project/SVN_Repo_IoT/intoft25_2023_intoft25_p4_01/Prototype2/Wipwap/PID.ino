//bron: http://electronoobs.com/eng_arduino_tut100_code1.php

const float SETPOINT = 21;  //210mm
float input;
float outPut;
const float Kp = 3;    // 3
const float Ki = 0.1;  // 0.1
const float Kd = 4500;  // 4500
float PID_p, PID_i, PID_d, PID_total;
float afstand = 0.0;
float afstand_error;
float afstand_vorige_error;
const unsigned short PERIODE = 50;  // 50 milliseconde

void updateWaarde() {
  if (getTimer(PERIODE)) {
    setTimer();
    afstand = get_dist(100);
    afstand_error = SETPOINT - afstand;
    PID_p = Kp * afstand_error;
    PID_d = Kd * ((afstand_error - afstand) / PERIODE);
    if (-3 < afstand_error && afstand_error < 3) {
      PID_i = PID_i + (Ki * afstand_error);
    } else {
      PID_i = 0;
    }
    PID_total = PID_p + PID_i + PID_d;
    PID_total = map(PID_total, -150, 150, 0, 150);

    if (PID_total < 20) {
      PID_total = 20;
    }
    if (PID_total > 160) {
      PID_total = 160;
    }
    draaiMotor(PID_total);
    afstand_vorige_error = afstand_error;
  }
}

//overgenomen functie van de bron
float get_dist(unsigned short n) {
  long sum = 0;
  for (unsigned short i = 0; i < n; i++) {
    sum = sum + analogRead(ANALOGSENSOR);
  }
  float adc = sum / n;
  float distance_cm = 17569.7 * pow(adc, -1.2062);
  return (distance_cm);
}
