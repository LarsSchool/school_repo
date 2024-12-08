#include <Wire.h>
#include <Servo.h>

// Gebaseerd op http://electronoobs.com/eng_arduino_tut100_code1.php.

int IR_Sensor = A0;
Servo myservo;  
int servoPin = 9;


int Read = 0;
float distance = 0.0;
float elapsedTime, currentTime, timePrev;
float distance_previous_error, distance_error;
int interval = 10;  


float kp=8; //Mine was 8
float ki=0.2; //Mine was 0.2
float kd=3100; //Mine was 3100
float distance_setpoint = 18;           
float PID_p, PID_i, PID_d, PID_total;
int servoLocation = 125;


void setup() {
  // analogReference(EXTERNAL);
  Serial.begin(9600);  
  myservo.attach(servoPin);
  myservo.write(servoLocation);
  pinMode(IR_Sensor,INPUT);  
  currentTime = millis();
}

void loop() {
  if (millis() > currentTime+interval)
  {
    currentTime = millis();    
    distance = get_dist(1000);   
    distance_error = distance_setpoint - distance;   
    PID_p = kp * distance_error;
    float dist_diference = distance_error - distance_previous_error;     
    PID_d = kd*((distance_error - distance_previous_error)/interval);
      
    if(-3 < distance_error && distance_error < 3)
    {
      PID_i = PID_i + (ki * distance_error);
    }
    else
    {
      PID_i = 0;
    }
  
    PID_total = PID_p + PID_i + PID_d;  
    PID_total = map(PID_total, -150, 150, 0, 150);
    if(PID_total < 20){PID_total = 20;}
    if(PID_total > 160) {PID_total = 160; } 

    Serial.println(PID_total+30);
    myservo.write(PID_total+30);  
    distance_previous_error = distance_error;
  }
}




float get_dist(int n)
{
  long sum=0;
  for(int i=0;i<n;i++)
  {
    // Serial.println(analogRead(IR_Sensor));
    sum=sum+analogRead(IR_Sensor);
  }  
  float adc=sum/n;
  //float volts = analogRead(adc)*0.0048828125;  // value from sensor * (5/1024)
  //float volts = sum*0.003222656;  // value from sensor * (3.3/1024) EXTERNAL analog refference

  float distance_cm = 17569.7 * pow(adc, -1.2062);
  // Serial.println(distance_cm);
  //float distance_cm = 13*pow(volts, -1); 
  return(distance_cm);
}