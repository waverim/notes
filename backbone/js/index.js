/**
  * index.js
  */

(function () {
	//url head
	var $url = 'http://localhost:8080/HPSPC/mobile/';

	//index 主页
	var IndexView = Backbone.View.extend({
		template:  _.template( $("#indexTemplate").html()),
		initialize: function(){
			this.render();
		},
		render: function() {
			this.$el.html( this.template );
		},
		events: {
			"click a#search": "toSearch"
		},
		toSearch: function () {
			var search_view = new SearchView({ el: $("#content") });
		}
	});

	var index_view = new IndexView({ el: $("#content") });

	//search 搜索页
	var SearchView = Backbone.View.extend({
		initialize: function(){
			this.render();
		},
		render: function() {
			var $this = this;

			$.ajax({
				type: 'GET',
				url: $url + 'findType',
				dataType: 'jsonp',
				jsonp: 'jsoncallback',
				jsonpCallback: 'callback',
				success: function (data) {
					console.log(data);

					var variables = {
						length: data.types.length,
						type: data.types
					};

					var template = _.template( $("#searchTemplate").html(), variables);
					$this.$el.html( template );
				},
				error: function () {
					console.log('Error get json, in search.html');
				}
			});
		},
		events: {
			"click div.go-back": "goBack"
		},
		goBack: function () {
			var index_view = new IndexView({ el: $("#content") });
		}
	});
})();
