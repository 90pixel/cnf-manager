# cnf-manager
Create config files from templates easily.

* [Installation](#installation)
* [Usage](#usage)
    * [Customize Filename](#customize-filename)
* [Custom Templates](#custom-templates)
* [Author](#author)
* [License](#license)

# Installation

You need to install [Node.js](https://nodejs.org/en/download/) first, then install the tool globally using this command:
```bash
npm install -g 90pixel/cnf-manager
```

# Usage

This command will create a nginx.conf file in current directory.
```bash
cnf-manager create nginx.conf
```

## Customize Filename

This command will create a mysite.conf file in current directory.
```bash
cnf-manager create nginx.conf mysite.conf
```

# Custom Templates

> Simply copy the custom templates to the **.cnf-manager** folder in your user directory or create a new one.

E.g.
```bash
nano ~/.cnf-manager/apache.conf
```

```txt
<VirtualHost *: 80>
   
  ServerAdmin {{serveradmin}}
  ServerName {{domain}}
  ServerAlias www.{{domain}}
  
  DocumentRoot {{root}}
  
  ErrorLog ${APACHE_LOG_DIR}/error.log
  CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```
Then save it. Now you can create new templates using apache.conf template.

```bash
cnf-manager create apache.conf
```

## Author
[Muhep Atasoy](https://github.com/muhep06)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
