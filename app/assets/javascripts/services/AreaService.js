//Factory
myApp.factory('Areas', ['$resource',function($resource){
  return $resource('/areas.json', {},{
    query: { method: 'GET', isArray: true },
    create: { method: 'POST' }
  })
}]);

myApp.factory('Area', ['$resource', function($resource){
  return $resource('/areas/:id.json', {}, {
    show: { method: 'GET' },
    update: { method: 'PUT', params: {id: '@id'} },
    delete: { method: 'DELETE', params: {id: '@id'} }
  });
}]);