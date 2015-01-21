//Factory
myApp.factory('Tables', ['$resource',function($resource){
  return $resource('/tables.json', {},{
    query: { method: 'GET', isArray: true },
    create: { method: 'POST' }
  })
}]);

myApp.factory('Table', ['$resource', function($resource){
  return $resource('/tables/:id.json', {}, {
    show: { method: 'GET' },
    update: { method: 'PUT', params: {id: '@id'} },
    delete: { method: 'DELETE', params: {id: '@id'} }
  });
}]);