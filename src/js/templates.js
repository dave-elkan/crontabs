define(['hogan'], function(Hogan) {
	var partials = {};
	var templates = {};
	
		partials["CronView"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<label for=\"expression-");_.b(_.v(_.f("cid",c,p,0)));_.b("\">Expression <span class=\"aui-icon icon-required\"> required</span></label>");_.b("\n" + i);_.b("<input class=\"text\" type=\"text\" value=\"");_.b(_.v(_.f("expression",c,p,0)));_.b("\" name=\"expression\" id=\"expression-");_.b(_.v(_.f("cid",c,p,0)));_.b("\">");_.b("\n" + i);_.b("<div class=\"error hidden\"></div>");_.b("\n" + i);_.b("<select name=\"operation-");_.b(_.v(_.f("cid",c,p,0)));_.b("\" class=\"select\">");_.b("\n" + i);if(_.s(_.f("operations",c,p,1),c,p,0,301,346,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("	<option value=\"");_.b(_.v(_.f("id",c,p,0)));_.b("\">");_.b(_.v(_.f("name",c,p,0)));_.b("</option>");_.b("\n");});c.pop();}_.b("</select>");_.b("\n" + i);if(_.s(_.f("removable",c,p,1),c,p,0,386,565,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("	<button class=\"aui-button remove-cron\" data-cid=\"");_.b(_.v(_.f("cid",c,p,0)));_.b("\"><a class=\"aui-icon aui-icon-small aui-iconfont-remove\" href=\"\" data-cid=\"");_.b(_.v(_.f("cid",c,p,0)));_.b("\">Remove Cron</a> Remove Cron</button>");_.b("\n");});c.pop();}return _.fl();;});
		partials["TabCollectionView"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<fieldset id=\"tabs\"></fieldset>");_.b("\n" + i);_.b("<form class=\"aui\">");_.b("\n" + i);_.b("	<div class=\"buttons-container\">");_.b("\n" + i);_.b("		<div class=\"buttons\">");_.b("\n" + i);_.b("			<button class=\"aui-button aui-button-primary save\"><a class=\"aui-icon aui-icon-small aui-iconfont-success\" href=\"\">Save</a> Save</button>");_.b("\n" + i);_.b("			<button class=\"aui-button add\"><a class=\"aui-icon aui-icon-small aui-iconfont-add\" href=\"\">Add</a> Add Tab</button>");_.b("\n" + i);_.b("		</div>");_.b("\n" + i);_.b("	</div>");_.b("\n" + i);_.b("</form>");_.b("\n");return _.fl();;});
		partials["TabView"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<fieldset data-tab-cid=");_.b(_.v(_.f("cid",c,p,0)));_.b(">");_.b("\n" + i);_.b("	<div class=\"field-group\">");_.b("\n" + i);_.b("		<label for=\"url-");_.b(_.v(_.f("cid",c,p,0)));_.b("\">URL <span class=\"aui-icon icon-required\"> required</span></label>");_.b("\n" + i);_.b("		<input class=\"text long-field url\" id=\"url-");_.b(_.v(_.f("cid",c,p,0)));_.b("\" type=\"text\" name=\"url\" value=\"");_.b(_.v(_.f("url",c,p,0)));_.b("\" />");_.b("\n" + i);_.b("        <div class=\"error hidden\"></div>");_.b("\n" + i);_.b("	</div>");_.b("\n" + i);_.b("	<div class=\"crons\"></div>");_.b("\n" + i);_.b("	<div class=\"buttons-container\">");_.b("\n" + i);_.b("		<div class=\"buttons\">");_.b("\n" + i);_.b("			<button class=\"aui-button add-cron\"><a class=\"aui-icon aui-icon-small aui-iconfont-add\" href=\"\">Add</a> Add Cron</button>");_.b("\n" + i);_.b("\n" + i);if(_.s(_.f("removable",c,p,1),c,p,0,521,691,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("			<button class=\"aui-button remove\" data-cid=\"");_.b(_.v(_.f("cid",c,p,0)));_.b("\"><a class=\"aui-icon aui-icon-small aui-iconfont-remove\" href=\"\" data-cid=\"");_.b(_.v(_.f("cid",c,p,0)));_.b("\">Remove</a> Remove Tab</button>");_.b("\n");});c.pop();}_.b("		</div>");_.b("\n" + i);_.b("	</div>");_.b("\n" + i);_.b("</fieldset>");_.b("\n");return _.fl();;});
	
	for (var id in partials) {
		templates[id] = (function(id) {
			return function(context) {
				return partials[id].render(context, partials);
			}
		})(id);
	}

	return templates;
});
