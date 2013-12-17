(function() {

  require.config({
    baseUrl: '/js/',
    paths: {
      socket: '/socket.io/socket.io',
      bsend: '/libs/bsend',
      jquery: '/libs/jquery/jquery-1.9.1',
      jqueryUi: '/libs/jquery/jquery-ui-1.10.3.custom',
      jqueryTinySort : '/libs/jquery/jquery.tinysort',
      underscore: '/libs/backbone/underscore',
      backbone: '/libs/backbone/backbone',
      bb: '/libs/bb.extend',
      text: '/libs/requirejs/text',
      async: '/libs/requirejs/async',
      goog: '/libs/requirejs/goog',
      propertyParser: '/libs/requirejs/propertyParser',
      depend: '/libs/requirejs/depend',
      font: '/libs/requirejs/font',
      noext: '/libs/requirejs/noext',
      modernizr: '/libs/modernizr',
      swfobject: '/libs/swfobject',
      ga: '/libs/ga',
      waitUntil: '/libs/waitUntilExists',
      i: '/i',
      views: '/js/views',
    },
    shim: {
      backbone: {
        deps: ['underscore', 'jquery']
      },
      jqueryTinySort: {
        deps: ['jquery']
      },
      jqueryUi: {
        deps: ['jquery']
      },
    }
  });


require(['socket', 'jquery', 'underscore', 'backbone', 'views/appView', 'router', 'vm', 'ga', 'i/client/c', 'i/instance/c', 'i/profile/c', 'bsend', 'waitUntil', 'modernizr'], function(io, $, _, backbone, AppView, Router, Vm, _ga, Clients, Instances, Profiles, Bsend) {
    var ready;
   $("html head").append('<meta name="viewport" content="width=device-width, initial-scale=0.75, minimum-scale=0.75, maximum-scale=1.0, user-scalable=yes">');



     var me, so, touch, ga;
      ga = _ga.Apply();
      so = io.connect();
      touch = Modernizr.touch ? true : false;
      me = {
        width: window.innerWidth,
        height: window.innerHeight,
        touch: touch,
        timezone:-(new Date()).getTimezoneOffset()/120
      };
      so.emit('connect', Bsend.je(me), function(err, data) {

        if (err) 
          return console.log('Unable to connect.');
        
        return ready(Bsend.jd(data), so,ga);
      });

    return ready = function(data, so,ga) {
                  window.___ = data.i;
                  window.__l = data.loggedIn.loggedIn;
      var checkVisablity, clients, instances, profiles;
      checkVisablity = true;
      if (_.isString(document.webkitVisibilityState)) {
        if (document.webkitVisibilityState === 'prerender') {
          checkVisablity = false;
        } else if (document.webkitVisibilityState === 'preview') {
          checkVisablity = false;
        }
      }
      clients = new Clients(null, {
        s: so
      });
      instances = new Instances(null, {
        s: so
      });
      profiles = new Profiles(null, {
        s: so
      });
      


      return instances.fetch({
                success: function() {
      return clients.fetch({
        success: function() {
          return profiles.fetch({
            success: function() {
                  var p;
                  p = profiles.length > 0 ? profiles.first() : null;

                  return Router.initialize({
                    ___: {
                      view: Vm.create({}, 'AppView', AppView),
                      vm: Vm,
                      so: so,
                      u: data.loggedIn,
                      conf: data.conf,
                      c: clients.first(),
                      i: instances.first(),
                      p: p,
                      api: data.api,
                      ga: ga
                    }
                  })
               
            },error:function  (err, err2) {
             console.log('error profiles',err,err2)
            },data: {'_id': clients.first().get('profile')}});
        },error:function  (err, err2) {
          console.log('error clients',err,err2)
        },data: {'_id': instances.first().get('client')}});
       },error:function  (err, err2) {
          console.log('error instances',err,err2)
      },data: {'_id': data.i}});
    };
  });

}).call(this);
