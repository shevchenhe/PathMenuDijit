define(["dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin",
	"dojo/text!./templates/pathmenu.html", "dojo/on", "dojo/dom", "dojo/dom-style", "dojo/_base/lang", "dojo/dom-class", "dojo/query", "dojo/_base/array",
	"dojo/domReady!"], function(declare, _WidgetBase, _TemplatedMixin, pathmenutemplate, on, dom, domstyle, lang, domclass, query, array) {
	return declare([_WidgetBase, _TemplatedMixin], {
		templateString: pathmenutemplate,
		options: {
			radius: 200,
			stratAngle: 0,
			displayAngle: 90,
			clickButtonClass: "fm_btntoggle",
			itemClass: ".fm_list>*",
			activeClass: "fm_active",
			deactiveClass: "fm_off",
			clickButtonEffect: "fm_rotate"
		},
		constructor: function(option, srcRefNode) {
			declare.safeMixin(this.options, option);
			this.domNode = srcRefNode;
		},
		startup:function(){
			this._init();
		},
		_init: function() {
			var that = this;
			this.items = query(this.options.itemClass);
			this.itmeslength = this.items.length;
			this.clickbutton = query(this.options.clickButtonClass);
			this.angle = this.options.displayAngle / (this.itmeslength - 1);
			this.delaytime = 1 / (this.itmeslength - 1);
			this.itemangle=[];
			this.xPosition=[];
			this.yPosition=[];
			this._initPathMenu();
		},
		_initPathMenu: function() {
			var that = this;
			array.forEach(this.items, function(item, i) {
				that.itemangle[i] = (that.options.stratAngle + that.angle * i) * Math.PI / 180.0;
				that.xPosition[i] = (that.options.radius * Math.sin(that.itemangle[i]));
				that.yPosition[i] = (that.options.radius * Math.cos(that.itemangle[i]));
				var j = i;
				if (i < (that.itmeslength / 2)) {
					j = that.itmeslength - 1 - i;
				};
				var rotateVal = 90 - (that.options.stratAngle + that.angle * j);
				domstyle.set(item, {
					'-webkit-transform': 'rotate(' + rotateVal + 'deg)',
					'-moz-transform': 'rotate(' + rotateVal + 'deg)',
					'-ms-transform': 'rotate(' + rotateVal + 'deg)',
					'-o-transform': 'rotate(' + rotateVal + 'deg)',
					'transform': 'rotate(' + rotateVal + 'deg)'
				});

			});
		},
		_ToggleMenu: function() {
			var that = this;
			//var clickbutton=dom.byId("clickbutton");
			var clickbutton=this.myclickbutton;
			if (!domclass.contains(that.pathmenu, that.options.activeClass)) {//开启
				array.forEach(that.items, function(item, i) {
					domstyle.set(item, {
						left: that.xPosition[i]+"px",
						top: (-that.yPosition[i])+"px"
					});
				});
				domclass.remove(that.pathmenu, that.options.deactiveClass);
				domclass.add(that.pathmenu, that.options.activeClass);
				domclass.add(clickbutton, that.options.clickButtonEffect);
			} else {//关闭
				array.forEach(that.items, function(item, i) {
					array.forEach(that.items, function(item, i) {
						domstyle.set(item, {
							left: "0px",
							top: "0px"
						});
					});
					domclass.remove(that.pathmenu, that.options.activeClass);
					domclass.add(that.pathmenu, that.options.deactiveClass);
					domclass.remove(clickbutton, that.options.clickButtonEffect);
				});
			}
		}
	})
	});