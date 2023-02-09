# Setup requirements

## Docker installation

### Arch based

1. Install docker and docker-compose via pacman

```sh
sudo pacman -S docker docker-compose
```

### Debian based

For debian, install docker engine as described in the [docker docs page](https://docs.docker.com/engine/install/debian/#install-using-the-repository)

1. Set up the repository

```sh
sudo apt-get update
```

```sh
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```

```sh
sudo mkdir -m 0755 -p /etc/apt/keyrings
```

```sh
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

```sh
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

2. Install docker engine

```sh
sudo apt-get update && sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### Extra

In order to **avoid calling sudo** every time docker is executed, run the following steps:

1. Create the docker group (it might already exist, if so skip this step):

```sh
sudo groupadd docker
```

2. Add the current user (most likely, yours) to the docker group:

```sh
sudo usermod -aG docker $USER
```

3. Restart or log to take effect

---

## Node installation

### Arch based

```sh
sudo pacman -S nodejs npm
```

### Debian based

```sh
curl -fsSL https://deb.nodesource.com/setup_current.x | bash - &&\
apt-get install -y nodejs
```
[Link](https://github.com/nodesource/distributions/blob/master/README.md#debinstall)

---

## Tmux installation (optional)

1. Install tmux:

Arch distros:
```sh
pacman -S nodejs npm
```

Debian distros:
```sh
sudo apt-get update && sudo apt-get install tmux
```

macOS:
```sh
brew install tmux
```

2. Enable tmux mouse scroll (optional)

```sh
echo "set -g mouse on" >> ~/.tmux.conf && tmux source-file ~/.tmux.conf
```
