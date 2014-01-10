TROVE
=====

Trove is a local repository for remote files.

### Installation
````
npm install trove -g
````

### Usage


This is add a item name mit-license referencing this gist url.

````
trove add mit-license https://gist.github.com/desmondmorris/8346808/raw/421eed3d52f9d256679cd3259473ac72e0875bc7/mit-license
````

Later, I can download it and name "LICENSE", like this:

````
trove get mit-license LICENSE
````

I can see all of the items in the trove like this:

````
trove list
````
