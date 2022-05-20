#!/bin/bash

# This scripts assumes that you have: tmux installed and a mongodb container called 'mongodb'

# If docker daemon is off, turns it on
if [ $(systemctl is-active docker) != "active" ];
then
    sudo systemctl start docker.service containerd.service
    echo Starting docker...
else
    echo Docker is active!
fi

session=flowviz

# Starting mongdb container
echo Starting mongodb...
docker start mongodb

# Creating session
echo Creating session...
tmux new -d -s $session

# Starting server
tmux send-keys -t $session "cd server && npm start" ENTER

# Spliting terminal window, creating a new pane for client
tmux split-window -h

# Starting client
tmux send-keys -t $session "cd client && npm start" ENTER

# Attaching session
echo Attaching session...
tmux a -t $session
