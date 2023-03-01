# If docker daemon is off, turns it on.
startDocker() {
    if [ $(systemctl is-active docker) != "active" ];
    then
        sudo systemctl start docker.service containerd.service
        echo Starting docker...
    else
        echo Docker is active!
    fi
}

# Creates Airflow user and composes services.
setupAirflow() {
    cd airflow/ && echo -e "AIRFLOW_UID=$(id -u)" > .env && docker compose up
}

startDocker
setupAirflow
