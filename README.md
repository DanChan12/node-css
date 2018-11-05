
## install dependencies
```sh
$ npm install 
```

# watch compile less and scss
```sh
$ npm run auto
```

# watch compile less
```sh
$ npm run less
```

# watch compile scss
```sh
$ npm run scss
```

# now compile less and sass
```sh
$ npm run now
```

# now compile less
```sh
$ npm run less-now
```

# now compile scss
```sh
$ npm run scss-now
```

# config.json
```sh
{
    "mode":"watch",		/* 'watch' or 'now' */
    "compile":"all",	/* 'all' or 'less' or 'scss' */
    "outputStyle":".wxss",	/* '.css' or '.wxss' or you want */
    "path":"../"		/* compile path */
}
```
