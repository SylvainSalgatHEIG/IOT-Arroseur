let serial; // variable to hold an instance of the serialport library
let portName = "COM4"; // fill in your serial port name here

let width = window.innerWidth;
let height = window.innerHeight;

let data;
let splitString;

let humidityRawData; // raw humidity value from the serial port
let humidity; // clean humidity value after removing undefined values
let lightRawData; // raw light value from the serial port
let light; // clean light value after removing undefined values


function setup() {
  console.log("Setup sketch");
  createCanvas(width, height);

  // serial
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on("list", printList); // set a callback function for the serialport list event
  serial.on("connected", serverConnected); // callback for connecting to the server
  serial.on("open", portOpen); // callback for the port opening
  serial.on("data", serialEvent); // callback for when new data arrives
  serial.on("error", serialError); // callback for errors
  serial.on("close", portClose); // callback for the port closing

  serial.list(); // list the serial ports
  serial.open(portName); // open a serial port
}

// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (let i = 0; i < portList.length; i++) {
    console.log(i + ": " + portList[i]);
  }
}

function serverConnected() {
  console.log("connected to server.");
}

function portOpen() {
  console.log("the serial port is opened.");
}

function serialEvent() {

  data = serial.readLine(); // gets the data from the serial port
  splitString = split(data, ','); // splits the data in the String
  humidityRawData = splitString[0];
  lightRawData = splitString[1];

  
  if(humidityRawData != undefined && humidityRawData != ""){ // cleans the humidity data to remove undesired values
    humidity = humidityRawData;
  }

  if(lightRawData != undefined && lightRawData != ""){ // cleans the light data to remove undesired values
    light = lightRawData;
  }
}

function serialError(err) {
  console.log("Something went wrong with the serial port. " + err);
}

function portClose() {
  console.log("The serial port is closed.");
}

function draw() {
  background(255,255,255);
  
  // Displays the light level
  if(light > 80){ 
    text("Niveau de luminosité : Très lumineux", 10, 50);
  } else if (light <= 80 && light > 60){
    text("Niveau de luminosité : Lumineux", 10, 50);
  } else if (light <= 60 && light > 40){
    text("Niveau de luminosité : Moyennement lumineux", 10, 50);
  } else if (light <= 40 && light > 20){
    text("Niveau de luminosité : Sombre", 10, 50);
  } else if (light <= 20){
    text("Niveau de luminosité : Très sombre", 10, 50);
  }

  // Displays the humidity level
  if(humidity > 80){
    text("Niveau d'humidité : Très sec", 10, 100);
  } else if (humidity <= 80 && humidity > 60){
    text("Niveau d'humidité : Sec", 10, 100);
  } else if (humidity <= 60 && humidity > 40){
    text("Niveau d'humidité : Moyennement humide", 10, 100);
  } else if (humidity <= 40 && humidity > 20){
    text("Niveau d'humidité : Humide", 10, 100);
  } else if (humidity <= 20){
    text("Niveau d'humidité : Très humide", 10, 100);
  }
  
}
