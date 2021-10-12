
nssm install ttscloud "D:/NodeJs/node.exe"
nssm set ttscloud AppParameters "D:/ttscloud.net/daemon/Server.js"
nssm set ttscloud DisplayName ttscloud.net
nssm set ttscloud AppDirectory "D:/ttscloud.net"


