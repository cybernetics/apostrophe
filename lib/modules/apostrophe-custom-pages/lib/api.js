module.exports = function(self, options) {
  // Returns a MongoDB projection object to be used when querying
  // for this type if all that is needed is a title for display
  // in an autocomplete menu. Since this is a page, we are including
  // the slug as well.
  var superGetAutocompleteProjection = self.getAutocompleteProjection;
  self.getAutocompleteProjection = function(query) {
    var projection = superGetAutocompleteProjection(query);
    projection.slug = 1;
    return projection;
  };

  // Returns a string to represent the given `doc` in an
  // autocomplete menu. `doc` will contain only the fields returned
  // by `getAutocompleteProjection`. `query.field` will contain
  // the schema field definition for the join the user is attempting
  // to match titles from. The default behavior is to return
  // the `title` property, but since this is a page we are including
  // the slug as well.
  self.getAutocompleteTitle = function(doc, query) {
    return doc.title + ' (' + doc.slug + ')';
  };
};
