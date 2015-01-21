//Factory
myApp.factory('Applications', ['$resource',function($resource){
  return $resource('/applications.json', {},{
    query: { method: 'GET', isArray: true },
    create: { method: 'POST' }
  })
}]);

myApp.factory('Application', ['$resource', function($resource){
  return $resource('/applications/:id.json', {}, {
    show: { method: 'GET' },
    update: { method: 'PUT', params: {id: '@id'} },
    delete: { method: 'DELETE', params: {id: '@id'} }
  });
}]);