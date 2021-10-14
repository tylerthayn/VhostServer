
nssm install ttscloud "D:/NodeJs/node.exe"
nssm set ttscloud AppParameters "D:/ttscloud/daemon/Server.js"
nssm set ttscloud DisplayName ttscloud.net
nssm set ttscloud AppDirectory "D:/ttscloud"
nssm set ttscloud AppStdout "D:/ttscloud/logs/log"
nssm set ttscloud AppStderr "D:/ttscloud/logs/error"

