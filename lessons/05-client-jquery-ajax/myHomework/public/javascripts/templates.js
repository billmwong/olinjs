(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['tableRowTemplate.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "    <td><input class=\"outStockBtn\" type=\"button\" value=\"Out of Stock\"></td>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "    <td><input class=\"inStockBtn\" type=\"button\" value=\"Back in Stock\"></td>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<tr id=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\n  <td>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</td>\n  <td>"
    + alias4(((helper = (helper = helpers.price || (depth0 != null ? depth0.price : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"price","hash":{},"data":data}) : helper)))
    + "</td>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.inStock : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "  <td><input class=\"editBtn\" type=\"button\" value=\"Edit\"></td>\n</tr>";
},"useData":true});
})();