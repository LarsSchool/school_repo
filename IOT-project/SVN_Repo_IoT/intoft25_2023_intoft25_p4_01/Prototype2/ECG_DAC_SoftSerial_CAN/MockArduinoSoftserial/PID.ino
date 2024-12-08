//bron: http://electronoobs.com/eng_arduino_tut100_code1.php  


const uint8_t SETPOINT1 = 15;  //150mm;
float input1;
float outPut1;
const uint8_t Kp1 = 3;    // 3
const float Ki1 = 0.1;  // 0.1
const uint16_t Kd1 = 4500;  // 4500
float PID_p1, PID_i1, PID_d1, PID_total1;
float afstand1 = 0.0;
float afstand_error1;
float afstand_vorige_error1;
const uint8_t PERIODE1 = 100; //250ms

void updateWaarde1() {
  if (getTimer(PERIODE1+getTimer1())) {
    setTimer1();
    afstand1 = get_dist1(100);
    afstand_error1 = SETPOINT1 - afstand1;
    Serial.print("afstand error");
    Serial.println(afstand_error1);
    PID_p1 = Kp1 * afstand_error1;
    PID_d1 = Kd1 * ((afstand_error1 - afstand_vorige_error1) / PERIODE1);
    if (-3 < afstand_error1 && afstand_error1 < 3) {
      PID_i1 = PID_i1 + (Ki1 * afstand_error1);
    } else {
      PID_i1 = 0;
    }
//    Serial.print("Kp: ");
//    Serial.println(PID_p1);
//    Serial.print("Ki: ");
//    Serial.println(PID_i1);
//    Serial.print("Kd: ");
//    Serial.println(PID_d1);
    PID_total1 = (PID_p1 + PID_i1 + PID_d1 );
    //Serial.println(PID_total1);
    PID_total1 = map(PID_total1, -150, 150, 0, 150);
    Serial.print("PID total");
    Serial.println(PID_total1);
    if (PID_total1 < 20) {
      PID_total1 = 20;
    }
    if (PID_total1 > 160) {
      PID_total1 = 160;
    }
    draaiMotor1(PID_total1+10);
    afstand_vorige_error1 = afstand_error1;
  }
}

float get_dist1(unsigned short n) {
  long sum = 0;
  for (unsigned short i = 0; i < n; i++) {
    sum = sum + analogRead(A2);
  }
  float adc = sum / n;
  float distance_cm = 17569.7 * pow(adc, -1.2062);
  return (distance_cm);
}



const uint8_t SETPOINT2 = 15;  //150mm;
float input2;
float outPut2;
const uint8_t Kp2 = 3;    // 3
const float Ki2 = 0.1;  // 0.1
const uint16_t Kd2 = 3500;  // 4500
float PID_p2, PID_i2, PID_d2, PID_total2;
float afstand2 = 0.0;
float afstand_error2;
float afstand_vorige_error2;
const uint8_t PERIODE2 = 100; //250ms

void updateWaarde2() {
  if (getTimer(PERIODE2+getTimer2())) {
    setTimer2();
    afstand2 = get_dist2(100);
//    Serial.println(afstand2);
    afstand_error2 = SETPOINT2 - afstand2;
    PID_p2 = Kp2 * afstand_error2;
    PID_d2 = Kd2 * ((afstand_error2 - afstand_vorige_error2) / PERIODE2);
    if (-3 < afstand_error2 && afstand_error2 < 3) {
      PID_i2 = PID_i2 + (Ki2 * afstand_error2);
    } else {
      PID_i2 = 0;
    }
//    Serial.println(PID_p);
//    Serial.print("Ki: ");
//    Serial.println(PID_i);
//    Serial.print("Kd: ");
//    Serial.println(PID_d);
    PID_total2 = (PID_p2 + PID_i2 + PID_d2 );
//    Serial.print("PID_total: ");
//    Serial.println(PID_total);
    PID_total2 = map(PID_total2, -150, 150, 0, 150);
//    Serial.println(PID_total2);
    if (PID_total2 < 20) {
      PID_total2 = 20;
    }
    if (PID_total2 > 160) {
      PID_total2 = 160;
    }
//    Serial.println(PID_total2);
    draaiMotor2(PID_total2+5);
    afstand_vorige_error2 = afstand_error2;
  }
}


float get_dist2(unsigned short n) {
  long sum = 0;
  for (unsigned short i = 0; i < n; i++) {
    sum = sum + analogRead(A2);
  }
  float adc = sum / n;
  float distance_cm = 17569.7 * pow(adc, -1.2062);
  return (distance_cm);
}

//const uint8_t SETPOINT = 15;  //150mm;
//float input;
//float outPut;
//const uint8_t Kp = 3;    // 3
//const float Ki = 0.1;  // 0.1
//const uint16_t Kd = 3500; // 4500
//float PID_p, PID_i, PID_d, PID_total;
//float afstand = 0.0;
//float afstand_error;
//float afstand_vorige_error;
//const uint8_t PERIODE = 250;//30 milliseconde
//
//void updateWaarde() {
//  if (getTimer(PERIODE)) {
//    setTimer1();
//    afstand = get_dist(100);
//    afstand_error = SETPOINT - afstand;
//    PID_p = Kp * afstand_error;
//    PID_d = Kd * ((afstand_error - afstand_vorige_error) / PERIODE);
//    if (-3 < afstand_error && afstand_error < 3) {
//      PID_i = PID_i + (Ki * afstand_error);
//    } else {
//      PID_i = 0;
//    }
////    Serial.println(afstand_error);
////    Serial.println(PID_p);
////    Serial.print("Ki: ");
////    Serial.println(PID_i);
////    Serial.print("Kd: ");
////    Serial.println(PID_d);
//    PID_total = (PID_p + PID_i + PID_d );
////    Serial.print("PID_total: ");
////    Serial.println(PID_total);
//    PID_total = map(PID_total, -150, 150, 0, 150);
//
//    if (PID_total < 20) {
//      PID_total = 20;
//    }
//    if (PID_total > 160) {
//      PID_total = 160;
//    }
//    Serial.println(PID_total);
//    draaiMotor1(PID_total+5);
//    afstand_vorige_error = afstand_error;
//  }
//}
//
//
////overgenomen functie van de bron
//float get_dist(unsigned short n) {
//  long sum = 0;
//  for (unsigned short i = 0; i < n; i++) {
//    sum = sum + analogRead(A1);
//  }
//  float adc = sum / n;
//  float distance_cm = 17569.7 * pow(adc, -1.2062);
//  return (distance_cm);
//}
