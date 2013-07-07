var _ = require('underscore');
var snippets = require('apostrophe-snippets');

module.exports = products;

function products (options, callback) {
  return new products.Products(options, callback);
}

products.Products = function(options, callback) {
  var self = this;
  _.defaults(options, {
    instance: 'product',
    name: options.name || 'products',
    label: options.name || 'Products',
    icon: options.icon || 'products',
    menuName: 'productsMenu'
  });

  options.modules = (options.modules || []).concat([ { dir: __dirname, name: 'products'} ]);

  // Find our templates before the snippet templates (a chain of overrides)
  options.dirs = (options.dirs || []).concat([ __dirname ]);

  // Call the base class constructor. Don't pass the callback, we want to invoke it
  // ourselves after constructing more stuff
  snippets.Snippets.call(this, options, null);

  function appendExtraFields(data, snippet, callback) {
    snippet.price = self._apos.sanitizeString(data.price, snippet.price);

    // areas
    self.convertFields.push({ type: 'area', name: 'photos' });
    
    return callback(null);
  }

  self.beforeInsert = function(req, data, snippet, callback) {
    appendExtraFields(data, snippet, callback);
  };

  self.beforeUpdate = function(req, data, snippet, callback) {
    appendExtraFields(data, snippet, callback);
  };


  if (self.manager) {
    self.pushAsset('template', 'paymentSettings', { when: 'user' });
  }


  if (callback) {
    // Invoke callback on next tick so that the products object
    // is returned first and can be assigned to a variable for
    // use in whatever our callback is invoking
    process.nextTick(function() { return callback(null); });
  }
}