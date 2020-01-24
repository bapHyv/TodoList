## Todo list web application

I have developped this todo list web application with [React](https://reactjs.org/) to practice the main concept of the library (rendering elements, components and props, state and life cycle, handling events, lists and keys, forms)

### If you pull this project...

After installing the dependencies, you have to modify couple lines of code in the json-server package.

In the **node_modules/json-server/lib/server/router/plural.js** replace :

resource = db.get(name).removeById(req.params.id).value(); // Remove dependents documents
const removable = db._.getRemovable(db.getState(), opts);
removable.forEach(item => {
db.get(item.name).removeById(item.id).value();
});

**by:**

req.params.id.split(',').filter(id => id !== '' || id !== undefined || id !== null).forEach(id => {
			
  resource = db.get(name).removeById(id).value(); // Remove dependents documents
  const removable = db._.getRemovable(db.getState(), opts);
  removable.forEach(item => {
	db.get(item.name).removeById(item.id).value();
  });

});

It will allow the package to get **multi-id-delete feature** since it needed in the application.