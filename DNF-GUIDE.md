# 📦 DNF Package Manager - Complete Guide for AlmaLinux 9.7

## What is DNF?

**DNF** (Dandified YUM) is the native package manager for AlmaLinux/RHEL/Fedora.
- ✅ Pre-installed on your system
- ✅ Optimized for AlmaLinux 9.7
- ✅ Better security than Homebrew
- ✅ System integration (SELinux, systemd)
- ✅ Official Red Hat repositories + EPEL

---

## 🎯 Popular Development Packages Available

### **Programming Languages:**

| Language | Package | Version | Install Command |
|----------|---------|---------|-----------------|
| **Node.js** | `nodejs` | 18.x LTS | `dnf install nodejs npm` |
| **Python** | `python3` | 3.9+ | `dnf install python3 python3-pip` |
| **Go** | `golang` | 1.19+ | `dnf install golang` |
| **Rust** | `rust` | Latest | `dnf install rust cargo` |
| **Ruby** | `ruby` | 3.0+ | `dnf install ruby rubygems` |
| **PHP** | `php` | 8.0+ | `dnf install php php-cli php-mbstring` |
| **Java** | `java-17-openjdk` | OpenJDK 17 | `dnf install java-17-openjdk` |
| **Perl** | `perl` | 5.30+ | `dnf install perl perl-core` |

### **Databases:**

| Database | Package | Install Command |
|----------|---------|-----------------|
| **PostgreSQL** | `postgresql` | `dnf install postgresql postgresql-server` |
| **MySQL** | `mysql` | `dnf install mysql mysql-server` |
| **MariaDB** | `mariadb` | `dnf install mariadb mariadb-server` |
| **Redis** | `redis` | `dnf install redis` |
| **MongoDB** | `mongodb-org` | (via MongoDB repo) |
| **SQLite** | `sqlite` | `dnf install sqlite` |

### **Web Servers:**

| Server | Package | Install Command |
|--------|---------|-----------------|
| **Nginx** | `nginx` | `dnf install nginx` |
| **Apache** | `httpd` | `dnf install httpd` |
| **Caddy** | `caddy` | (via COPR repo) |

### **DevOps Tools:**

| Tool | Package | Install Command |
|------|---------|-----------------|
| **Git** | `git` | `dnf install git` |
| **Docker** | `docker` | `dnf install docker docker-compose` |
| **Podman** | `podman` | `dnf install podman` (Docker alternative) |
| **Kubernetes** | `kubernetes` | `dnf install kubelet kubeadm kubectl` |
| **Ansible** | `ansible` | `dnf install ansible` |
| **Terraform** | `terraform` | (via HashiCorp repo) |
| **Helm** | `helm` | (via Kubernetes repo) |

### **Development Tools:**

| Tool | Package | Install Command |
|------|---------|-----------------|
| **GCC** | `gcc` | `dnf install gcc gcc-c++ make` |
| **CMake** | `cmake` | `dnf install cmake` |
| **Vim** | `vim` | `dnf install vim-enhanced` |
| **Neovim** | `neovim` | `dnf install neovim` |
| **Emacs** | `emacs` | `dnf install emacs` |
| **VS Code** | `code` | (via Microsoft repo) |
| **Sublime Text** | `sublime-text` | (via COPR repo) |
| **jq** | `jq` | `dnf install jq` (JSON processor) |
| **curl** | `curl` | `dnf install curl` |
| **wget** | `wget` | `dnf install wget` |

### **Media & Graphics:**

| Tool | Package | Install Command |
|------|---------|-----------------|
| **ImageMagick** | `ImageMagick` | `dnf install ImageMagick` |
| **FFmpeg** | `ffmpeg` | `dnf install ffmpeg` |
| **GIMP** | `gimp` | `dnf install gimp` |

### **Networking:**

| Tool | Package | Install Command |
|------|---------|-----------------|
| **Nmap** | `nmap` | `dnf install nmap` |
| **Wireshark** | `wireshark` | `dnf install wireshark` |
| **Netcat** | `nmap-ncat` | `dnf install nmap-ncat` |
| **TCPDump** | `tcpdump` | `dnf install tcpdump` |

---

## 🚀 Quick Install Examples

### **Install Node.js + npm:**
```bash
sudo dnf install nodejs npm
node --version  # Check version
npm --version
```

### **Install Python + pip:**
```bash
sudo dnf install python3 python3-pip
python3 --version
pip3 --version
```

### **Install Docker:**
```bash
sudo dnf install docker docker-compose
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER  # Add your user to docker group
```

### **Install Git:**
```bash
sudo dnf install git
git --version
```

### **Install Development Tools Group:**
```bash
sudo dnf group install "Development Tools"
# Includes: gcc, make, git, and more
```

---

## 🔍 Searching for Packages

### **Search by name:**
```bash
dnf search nodejs
dnf search python
dnf search docker
```

### **Search by description:**
```bash
dnf search --showduplicates "web server"
dnf search --showduplicates "database"
```

### **List available versions:**
```bash
dnf list --showduplicates nodejs
dnf list --showduplicates python3
```

### **Get package info:**
```bash
dnf info nodejs
dnf info git
```

---

## 📋 Common DNF Commands

| Command | Description |
|---------|-------------|
| `dnf install <package>` | Install a package |
| `dnf remove <package>` | Remove a package |
| `dnf update` | Update all packages |
| `dnf update <package>` | Update specific package |
| `dnf search <term>` | Search for packages |
| `dnf info <package>` | Show package info |
| `dnf list installed` | List installed packages |
| `dnf history` | Show transaction history |
| `dnf history undo <id>` | Undo a transaction |
| `dnf clean all` | Clean cache |
| `dnf grouplist` | List package groups |
| `dnf group install <group>` | Install a group |

---

## 🎁 Enable Additional Repositories

### **EPEL (Extra Packages for Enterprise Linux):**
Already enabled! Provides 10,000+ additional packages.

```bash
# Check if enabled
dnf repolist | grep epel
```

### **RPM Fusion (Multimedia, Proprietary Software):**
```bash
# Free repository
sudo dnf install https://mirrors.rpmfusion.org/free/el/rpmfusion-free-release-9.noarch.rpm

# Non-free repository
sudo dnf install https://mirrors.rpmfusion.org/nonfree/el/rpmfusion-nonfree-release-9.noarch.rpm
```

After enabling RPM Fusion, you get access to:
- Steam
- NVIDIA drivers
- VLC media player
- Skype
- Spotify
- And more!

---

## 🆚 DNF vs Homebrew on AlmaLinux

| Feature | DNF | Homebrew |
|---------|-----|----------|
| **Pre-installed** | ✅ Yes | ❌ No |
| **System Integration** | ✅ Perfect | ⚠️ Limited |
| **Security (SELinux)** | ✅ Full support | ❌ No |
| **Updates** | ✅ System-wide | ⚠️ Separate |
| **Package Count** | ~10,000+ (w/ EPEL) | ~10,000+ |
| **Stability** | ✅ Enterprise-grade | ⚠️ Bleeding edge |
| **Dependencies** | ✅ System libs | 📦 Bundled |
| **Root Required** | ✅ Yes (sudo) | ❌ No |

---

## 💡 Recommendations for Your Setup

Based on your current projects (AI Newsletter, Research Automation):

### **Already Installed:**
- ✅ Node.js v22.22.0
- ✅ Git
- ✅ OpenClaw

### **Might Be Useful:**

**1. Docker (for containerized apps):**
```bash
sudo dnf install docker docker-compose
sudo systemctl start docker
sudo systemctl enable docker
```

**2. Redis (for caching/sessions):**
```bash
sudo dnf install redis
sudo systemctl start redis
sudo systemctl enable redis
```

**3. PostgreSQL (for databases):**
```bash
sudo dnf install postgresql postgresql-server
sudo postgresql-setup --initdb
sudo systemctl start postgresql
```

**4. Nginx (for web serving):**
```bash
sudo dnf install nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

**5. Development Tools:**
```bash
sudo dnf group install "Development Tools"
```

**6. Useful Utilities:**
```bash
sudo dnf install jq curl wget vim-enhanced neovim htop tmux
```

---

## 🔗 Useful Resources

- **AlmaLinux Package Search:** https://repo.almalinux.org/
- **EPEL Packages:** https://dl.fedoraproject.org/pub/epel/
- **RPM Fusion:** https://rpmfusion.org/
- **DNF Documentation:** https://dnf.readthedocs.io/

---

## ❓ What Do You Want to Install?

Tell me what tool/package you need, and I'll:
1. Check if it's available via DNF
2. Provide the exact install command
3. Set it up for you!

**Just say:** "Install [package name]" and I'll handle it! 🚀
