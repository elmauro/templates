//Factory
myApp.factory('Columns', ['$resource',function($resource){
  return $resource('/columns.json', {},{
    query: { method: 'GET', isArray: true },
    create: { method: 'POST' }
  })
}]);

myApp.factory('Column', ['$resource', function($resource){
  return $resource('/columns/:id.json', {}, {
    show: { method: 'GET' },
    update: { method: 'PUT', params: {id: '@id'} },
    delete: { method: 'DELETE', params: {id: '@id'} }
  });
}]);