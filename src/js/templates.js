define(['hogan'], function (Hogan) {
  var templates = {};
  templates["TabEditView"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<section>");_.b("\n" + i);_.b("	<h3>");_.b(_.v(_.f("name",c,p,0)));_.b(">/h3>");_.b("\n" + i);_.b("	<p>Some Text</p>");_.b("\n" + i);_.b("</section>");_.b("\n");return _.fl();;});
  return templates;
});
