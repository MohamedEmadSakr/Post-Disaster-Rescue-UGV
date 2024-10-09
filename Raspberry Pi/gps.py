import serial
import time
import string
import pynmea2
from serial import Serial
from flask import Flask, jsonify
from flask_cors import CORS

port = "/dev/serial0"

app = Flask(__name__)
CORS(app)

ser = serial.Serial(port, baudrate=9600, timeout=0.5)
dataout = pynmea2.NMEAStreamReader()

@app.route('/coordinates')
def generate_coordinates():
    x = 0
    y = 0
    newdata = ser.readline().decode('utf-8', errors='replace')
    while newdata[0:6] != "$GPRMC":
        newdata = ser.readline().decode('utf-8', errors='replace')
    try:
        newmsg = pynmea2.parse(newdata)
        x = float(newmsg.latitude)
        y = float(newmsg.longitude)

    except pynmea2.ParseError as e:
        print("Error parsing NMEA sentence: {}".format(e))
    return jsonify({'lat': x, 'lng': y})

if __name__ == '__main__':
    app.run('0.0.0.0', ssl_context="adhoc")
