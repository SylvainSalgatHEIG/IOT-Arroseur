// Projet Arroseur - Alexandre Souto et Sylvain Salgat M49-2
// Février-Mars 2023
// Cours Option-IOT

int humidity_raw = 0; // raw humidity value from the sensor
int humidity = 0; // mapped humidity value
int light_raw = 0; // raw light value from the sensor
int light = 0; // mapped light value
int pump = 4; // pump digital pin



void setup() {

  Serial.begin(9600);
  pinMode(A0, INPUT); // sets the light sensor on analog pin 0 as an input pin
  pinMode(A1, INPUT); // sets the moisture sensor on analog pin 1 as an input pin
  pinMode(pump, OUTPUT); // sets the pump on digital pin 4 as an output pin

}

void loop() {

  // Reads the data from the sensors
  humidity_raw = analogRead(A1);
  light_raw = analogRead(A0);

  // Maps the humidity values (100 = dry, 0 = soaked)
  humidity = map(humidity_raw, 0, 1023, 0, 100);
  // Maps the light values (100 = bright, 0 = dark)
  light = map(light_raw, 0, 1023, 0, 100);

  // Sends the data as a String to the serial port, to read it in the Web interface
  Serial.println((String)humidity + "," + light);

  if (humidity > 70) { // pumps when the plant lacks water. (100 = dry, 0 = soaked)
    digitalWrite(pump, HIGH);  
    delay(1500);
    digitalWrite(pump, LOW);  
    delay(5000);
  }

}