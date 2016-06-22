// This #include statement was automatically added by the Particle IDE.
#include "MQTT/MQTT.h"

// This #include statement was automatically added by the Particle IDE.
#include "SparkJson/SparkJson.h"

#include "MQTT/MQTT.h"

// This #include statement was automatically added by the Particle IDE.
#include "HC_SR04/HC_SR04.h"


#define LOSANT_BROKER "broker.losant.com"
#define LOSANT_DEVICE_ID "360042000547353138383138"
#define LOSANT_ACCESS_KEY "703cfada-71fc-4712-8fd7-4dda0f0fdb8f"
#define LOSANT_ACCESS_SECRET "b39761aabfd316fdaff6d1e78e4f3f1359450976c7fe9b6e2497df18dbb63fe3"


// Topic used to subscribe to Losant commands.
String MQTT_TOPIC_COMMAND =
    String::format("losant/%s/command", LOSANT_DEVICE_ID);

// Topic used to publish state to Losant.
String MQTT_TOPIC_STATE =
    String::format("losant/%s/state", LOSANT_DEVICE_ID);

// MQTT client.
MQTT client(LOSANT_BROKER, 1883, callback);

// Toggles the LED on/off whenever "toggle" command is received.
bool ledValue = false;
void callback(char* topic, byte* payload, unsigned int length) {
    
    // Parse the command payload.
    StaticJsonBuffer<200> jsonBuffer;
    JsonObject& command = jsonBuffer.parseObject((char*)payload);

    Serial.println("Command received:");
    command.printTo(Serial);
    Serial.println();
}

double cm = 0.0;

int trigPin = D4;
int echoPin = D5;

int statusCode = 0;


HC_SR04 rangefinder = HC_SR04(trigPin, echoPin);

void setup()
{
    Serial.begin(9600);
    pinMode(D7, OUTPUT);
    Particle.variable("cm", &cm, DOUBLE);
}

void loop() {
    if (!client.isConnected()) {
        connect();
    }
    
    cm = rangefinder.getDistanceCM();
    //// Uncomment for extra experiment with Distance sensor
    // setRemoteServo(cm);
    
    if (cm < 0) {
        // Particle.publish("distance", "error-too-close");
        updateStatus(0);
        Serial.printf("oops\t");
        blinkLedFast();
    }
    else if (cm < 20) {
        // Particle.publish("distance", "good");
        updateStatus(1);
        // Particle.publish("good range");
        Serial.printf("good range\t");
        turnOnLed();
    }
    else if (cm > 20) {
        // Particle.publish("distance", "good-too-far");
        updateStatus(2);
        // Particle.publish("too far");
        Serial.printf("too far\t");
        turnOffLed();
    }
    else {
        // Particle.publish("distance", "error-too-far");
        updateStatus(3);
        // Particle.publish("unhandled case");
        Serial.printf("unhandled\t");
        blinkLedFast();
    }
    
    
    Serial.printf("Distance: %.2f cm\n", cm);
    
    // blinkLed();
    delay(750);    
}

void updateStatus( int statusCodeNew ) {
    
    if (statusCode == statusCodeNew) {
        Serial.printf("--------- \t\t statusCode %d, statusCodeNew %d \n", statusCode, statusCodeNew);
    }
    // if different, then publish
    else {
        Serial.printf("+changed+ \t\t statusCode %d, statusCodeNew %d \n", statusCode, statusCodeNew);
        statusCode = statusCodeNew;
        
        
        // Build the json payload:
        // { "data" : { "tempF" : val, "tempC" : val }}
        StaticJsonBuffer<200> jsonBuffer;
        JsonObject& root = jsonBuffer.createObject();
        JsonObject& state = jsonBuffer.createObject();


        // TODO: refer to your specific temperature sensor
        // on how to convert the raw voltage to a temperature.
        int tempRaw = analogRead(A0);
        
        if (cm < 0) {
            Particle.publish("distance", "error-too-close");
            state["distance"] = "error-too-close";
        }
        else if (cm < 20) {
            Particle.publish("distance", "good");
            state["distance"] = "good";
        }
        else if (cm > 20) {
            Particle.publish("distance", "good-too-far");
            state["distance"] = "good-too-far";
        }
        else {
            Particle.publish("distance", "error-too-far");
            state["distance"] = "error-too-far";
        }
        
        
        
        
        root["data"] = state;

        // Get JSON string.
        char buffer[200];
        root.printTo(buffer, sizeof(buffer));

        client.publish(MQTT_TOPIC_STATE, buffer);
        
    }
    
}


void blinkLed() {
    digitalWrite(D7,HIGH);
    delay(150);   
    digitalWrite(D7,LOW);    
}

void blinkLedFast() {
    digitalWrite(D7,HIGH);
    delay(100);   
    digitalWrite(D7,LOW);    
    delay(100);   
    digitalWrite(D7,HIGH);
    delay(100);   
    digitalWrite(D7,LOW);    
    delay(100);   
    digitalWrite(D7,HIGH);
    delay(100);   
    digitalWrite(D7,LOW);       
}

void turnOnLed() {
    digitalWrite(D7,HIGH);
}

void turnOffLed() {
    digitalWrite(D7,LOW);  
}

// Connects to the Losant MQTT broker.
void connect() {

    Serial.print("Connecting to Losant...");

    while(!client.isConnected()) {
        client.connect(
            LOSANT_DEVICE_ID,
            LOSANT_ACCESS_KEY,
            LOSANT_ACCESS_SECRET);

        if(client.isConnected()) {
            Serial.println("connected!");
            client.subscribe(MQTT_TOPIC_COMMAND);
        }
        else {
            Serial.print(".");
            delay(500);
        }
    }
}


//// Uncomment for extra experiment with Distance sensor
// void setRemoteServo(double cm) {
//     int newValue = (int) cm;
//     if (newValue > 50) {
//         newValue = 50;
//     } else if (newValue == -1) {
//         newValue = 10;
//     }
        
//     int servoPos = map(newValue, 10, 50, 179, 1);
//     Particle.publish("SetServoSon", String(servoPos));
// }