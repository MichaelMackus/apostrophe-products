function Products(options) {
  var self = this;
  AposSnippets.call(self, options);

  function findExtraFields($el, data, callback) {
    data.price = $el.find('[name="price"]').val();
    data.photos = self.getSingletonJSON($el, 'photos');

    callback();
  }

  self.afterPopulatingEditor = function($el, snippet, callback) {
    $el.find('[name="price"]').val(snippet.price);
    self.enableSingleton($el, 'photos', snippet.areas.photos, 'slideshow', {}, function() {
      return callback();
    });
  };

  self.beforeInsert = function($el, data, callback) {
    findExtraFields($el, data, callback);
  };

  self.beforeUpdate = function($el, data, callback) {
    findExtraFields($el, data, callback);
  };

  // MANAGER SETTINGS
  if (self.manager) {
    $('body').on('click', '.edit-payment-settings', function() {
      self.launchPaymentSettings();
      return false;
    });

    self.launchPaymentSettings = function() {
      var self = this;
      AposSnippets.call(self, options);

      var $el = apos.modalFromTemplate('.products-payment-settings', {
        save: function(callback) {
          self.log('save');
          return self.insertOrUpdate($el, 'insert', {}, callback);
        },
        init: function(callback) {
          self.log('init');
          // $el.find('[name=published]').val(1);
          return self.populateEditor($el, { areas: {} }, callback);
        },
        next: function() {
          self.log('next');
          // self.launchNew();
        }
      });

      self.log = function(message) {
        console.log("Payment Settings: "+message);
      };

      self.insertOrUpdate = function(element, type, data, callback) {
        alert('Updated');
      };
    }
  }
}
