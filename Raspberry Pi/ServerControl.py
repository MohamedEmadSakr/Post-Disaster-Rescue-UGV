import RPi.GPIO as GPIO
import socket

# Define host and port for the server
HOST = '0.0.0.0'
PORT = 12345

# Define GPIO pin numbers for car control
in1 = 3
in2 = 5
in3 = 11
in4 = 13

# Configure GPIO pins
GPIO.setmode(GPIO.BOARD)
GPIO.setup(in1, GPIO.OUT)
GPIO.setup(in2, GPIO.OUT)
GPIO.setup(in3, GPIO.OUT)
GPIO.setup(in4, GPIO.OUT)

# Create a socket object
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Bind the socket to a specific address and port
sock.bind((HOST, PORT))

# Listen for incoming connections
sock.listen(1)
print('Server started, waiting for incoming connections...')

# Wait for incoming connections
conn, addr = sock.accept()
print(f'Connected by {addr}')

# Flag to indicate button press received
button_pressed = False
GPIO.output(in1, GPIO.LOW)
GPIO.output(in2, GPIO.LOW)
GPIO.output(in3, GPIO.LOW)
GPIO.output(in4, GPIO.LOW)
# Receive and process data from the client
try:
    while True:
        if not button_pressed:
            data = conn.recv(1024)
            if not data:
                continue
            command = data.decode().strip()
            print(command)
            # Set the button_pressed flag to True
            button_pressed = True

            # Control the car based on the received command
            if command == 'FORWARD':
                GPIO.output(in1, GPIO.HIGH)
                GPIO.output(in2, GPIO.LOW)
                GPIO.output(in3, GPIO.HIGH)
                GPIO.output(in4, GPIO.LOW)
            elif command == 'BACKWARD':
                GPIO.output(in1, GPIO.LOW)
                GPIO.output(in2, GPIO.HIGH)
                GPIO.output(in3, GPIO.LOW)
                GPIO.output(in4, GPIO.HIGH)
            elif command == 'LEFT':
                GPIO.output(in1, GPIO.LOW)
                GPIO.output(in2, GPIO.LOW)
                GPIO.output(in3, GPIO.HIGH)
                GPIO.output(in4, GPIO.LOW)
            elif command == 'RIGHT':
                GPIO.output(in1, GPIO.HIGH)
                GPIO.output(in2, GPIO.LOW)
                GPIO.output(in3, GPIO.LOW)
                GPIO.output(in4, GPIO.LOW)
            elif command == 'STOP':
                GPIO.output(in1, GPIO.LOW)
                GPIO.output(in2, GPIO.LOW)
                GPIO.output(in3, GPIO.LOW)
                GPIO.output(in4, GPIO.LOW)
            else:
                print('Invalid command')
        
        # If button press received, continue looping until button is released
        while button_pressed:
            data = conn.recv(1024)
            if not data:
                continue
            command = data.decode().strip()
            if command == 'STOP':  # Button release command
                button_pressed = False
                print('Released')
                GPIO.output(in1, GPIO.LOW)
                GPIO.output(in2, GPIO.LOW)
                GPIO.output(in3, GPIO.LOW)
                GPIO.output(in4, GPIO.LOW)
                break

finally:
    # Clean up GPIO and the connection
    GPIO.cleanup()
    conn.close()
