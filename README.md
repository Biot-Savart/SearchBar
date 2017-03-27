# SearchBar

Users are able to switch between their project groups from the global search navigation. 

It provides an overview of the groups in relation to their global projects.


# Implementation

```js
    <div class="input-group">
        <span class="input-group-addon" id="basic-addon1"><i class="glyphicon glyphicon-search"></i></span>
            <input id="searchText" placeholder="Search..." type="text" class="form-control" autofocus/>  
    </div>

    <li id="search"></li>    

    SearchBar.initSearch('#search', projectData); 
```

# Prerequisites

* jQuery
* Bootstrap
