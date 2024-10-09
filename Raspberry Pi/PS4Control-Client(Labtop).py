import socket
import pygame

# Define host and port for the server
HOST = '172.20.10.13'  # Replace with the actual IP address of the Raspberry Pi
PORT = 12345

# Create a socket object
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Connect to the server
sock.connect((HOST, PORT))
# Initialize Pygame and the PS4 controller
pygame.init()
pygame.joystick.init()
controller = pygame.joystick.Joystick(0)
controller.init()
prev = ''

# Send data to the server based on PS4 controller inputs
try:
    while True:
        # Check for events in the event queue
        for event in pygame.event.get():
            if event.type == pygame.JOYAXISMOTION:
                # Get the current state of the axes
                axes = [controller.get_axis(i) for i in range(controller.get_numaxes())]
                
                # Map the axes values to commands
                if axes[1] < -0.5:  # Moving forward
                    sock.sendall(b'FORWARD')
                    prev = ''
                    print('FORWARD')
                elif axes[1] > 0.5:  # Moving backward
                    sock.sendall(b'BACKWARD')
                    prev = ''
                    print('BACKWARD')
                elif axes[0] < -0.5:  # Moving left
                    sock.sendall(b'LEFT')
                    prev = ''
                    print('LEFT')
                elif axes[0] > 0.5:  # Moving right
                    sock.sendall(b'RIGHT')
                    prev = ''
                    print('RIGHT')
                else:  # Stop
                    if prev != 'STOP':
                        prev = 'STOP'
                        sock.sendall(b'STOP')
                        print('STOP')
                    
                    

        # Allow other parts of the program to run and prevent excessive CPU usage
        pygame.time.wait(10)

finally:
    # Clean up the connection
    sock.close()
