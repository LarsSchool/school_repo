//const uint8_t SETPOINT = 15;  //210mm;
//const uint8_t Kp = 3;    // 3
//const float Ki = 0.1;  // 0.1
//const uint16_t Kd = 3500;  // 4500
//const uint8_t PERIODE = 250;  // 30 milliseconde

const unsigned short pidSize = 2;

float PID_p[pidSize], PID_i[pidSize], PID_d[pidSize], PID_total[pidSize];
float afstand[pidSize] = {0.0, 0.0};
float afstand_error[pidSize];
float afstand_vorige_error[pidSize];

void updateAlleWipwaps(){
  for (int i = 0; i < pidSize; i ++){
    switch(i){
      case 0:
    updateWaarde(0, 17, 3 , 0.1, 4500, 200);
      break;
      case 1:
    updateWaarde(1, 15, 3 , 0.1, 6500, 250);
      break;
    }
  }
}


void updateWaarde(unsigned short id, uint8_t SETPOINT, uint8_t Kp, float Ki, uint16_t Kd, uint8_t PERIODE) {
  if(id > pidSize)
  {
    return;
  }
  if (millis() >  getTimer(id)+ PERIODE) {
    setTimer(id);
    afstand[id] = get_dist(id, 100);
    afstand_error[id] = SETPOINT - afstand[id];
    PID_p[id] = Kp * afstand_error[id];
    PID_d[id] = Kd * ((afstand_error[id] - afstand_vorige_error[id]) / PERIODE);
    if (-3 < afstand_error[id] && afstand_error[id] < 3) {
      PID_i[id] = PID_i[id] + (Ki * afstand_error[id]);
    } else {
      PID_i[id] = 0;
    }
    PID_total[id] = (PID_p[id] + PID_i[id] + PID_d[id] );
    PID_total[id] = map(PID_total[id], -150, 150, 0, 150);

    if (PID_total[id] < 20) {
      PID_total[id] = 20;
    }
    if (PID_total[id] > 150) {
      PID_total[id] = 150;
    }
//    Serial.println(PID_total[id]);
    draaiMotor(id, PID_total[id]);
    afstand_vorige_error[id] = afstand_error[id];
  }
}


//overgenomen functie van de bron
float get_dist(unsigned short id, unsigned short n) {
  long sum = 0;
  for (unsigned short i = 0; i < n; i++) {
    sum = sum + getAfstand(id);
  }
  float adc = sum / n;
  float distance_cm = 17569.7 * pow(adc, -1.2062);
  return (distance_cm);
}
