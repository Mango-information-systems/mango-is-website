(function(c,b,a,d){Foundation.libs.tooltip={name:"tooltip",version:"5.5.2",settings:{additional_inheritable_classes:[],tooltip_class:".tooltip",append_to:"body",touch_close_text:"Tap To Close",disable_for_touch:false,hover_delay:200,show_on:"all",tip_template:function(e,f){return'<span data-selector="'+e+'" id="'+e+'" class="'+Foundation.libs.tooltip.settings.tooltip_class.substring(1)+'" role="tooltip">'+f+'<span class="nub"></span></span>'}},cache:{},init:function(f,g,e){Foundation.inherit(this,"random_str");this.bindings(g,e)},should_show:function(g,f){var e=c.extend({},this.settings,this.data_options(g));if(e.show_on==="all"){return true}else{if(this.small()&&e.show_on==="small"){return true}else{if(this.medium()&&e.show_on==="medium"){return true}else{if(this.large()&&e.show_on==="large"){return true}}}}return false},medium:function(){return matchMedia(Foundation.media_queries.medium).matches},large:function(){return matchMedia(Foundation.media_queries.large).matches},events:function(e){var g=this,h=g.S;g.create(this.S(e));function i(k,l,j){if(k.timer){return}if(j){k.timer=null;g.showTip(l)}else{k.timer=setTimeout(function(){k.timer=null;g.showTip(l)}.bind(k),g.settings.hover_delay)}}function f(j,k){if(j.timer){clearTimeout(j.timer);j.timer=null}g.hide(k)}c(this.scope).off(".tooltip").on("mouseenter.fndtn.tooltip mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip","["+this.attr_name()+"]",function(m){var l=h(this),k=c.extend({},g.settings,g.data_options(l)),j=false;if(Modernizr.touch&&/touchstart|MSPointerDown/i.test(m.type)&&h(m.target).is("a")){return false}if(/mouse/i.test(m.type)&&g.ie_touch(m)){return false}if(l.hasClass("open")){if(Modernizr.touch&&/touchstart|MSPointerDown/i.test(m.type)){m.preventDefault()}g.hide(l)}else{if(k.disable_for_touch&&Modernizr.touch&&/touchstart|MSPointerDown/i.test(m.type)){return}else{if(!k.disable_for_touch&&Modernizr.touch&&/touchstart|MSPointerDown/i.test(m.type)){m.preventDefault();h(k.tooltip_class+".open").hide();j=true;if(c(".open["+g.attr_name()+"]").length>0){var n=h(c(".open["+g.attr_name()+"]")[0]);g.hide(n)}}}if(/enter|over/i.test(m.type)){i(this,l)}else{if(m.type==="mouseout"||m.type==="mouseleave"){f(this,l)}else{i(this,l,true)}}}}).on("mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip","["+this.attr_name()+"].open",function(j){if(/mouse/i.test(j.type)&&g.ie_touch(j)){return false}if(c(this).data("tooltip-open-event-type")=="touch"&&j.type=="mouseleave"){return}else{if(c(this).data("tooltip-open-event-type")=="mouse"&&/MSPointerDown|touchstart/i.test(j.type)){g.convert_to_touch(c(this))}else{f(this,c(this))}}}).on("DOMNodeRemoved DOMAttrModified","["+this.attr_name()+"]:not(a)",function(j){f(this,h(this))})},ie_touch:function(f){return false},showTip:function(e){var f=this.getTip(e);if(this.should_show(e,f)){return this.show(e)}return},getTip:function(f){var e=this.selector(f),g=c.extend({},this.settings,this.data_options(f)),h=null;if(e){h=this.S('span[data-selector="'+e+'"]'+g.tooltip_class)}return(typeof h==="object")?h:false},selector:function(e){var f=e.attr(this.attr_name())||e.attr("data-selector");if(typeof f!="string"){f=this.random_str(6);e.attr("data-selector",f).attr("aria-describedby",f)}return f},create:function(e){var g=this,i=c.extend({},this.settings,this.data_options(e)),f=this.settings.tip_template;if(typeof i.tip_template==="string"&&b.hasOwnProperty(i.tip_template)){f=b[i.tip_template]}var j=c(f(this.selector(e),c("<div></div>").html(e.attr("title")).html())),h=this.inheritable_classes(e);j.addClass(h).appendTo(i.append_to);if(Modernizr.touch){j.append('<span class="tap-to-close">'+i.touch_close_text+"</span>");j.on("touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip",function(k){g.hide(e)})}e.removeAttr("title").attr("title","")},reposition:function(j,m,h){var e,n,l,i,g,k;m.css("visibility","hidden").show();e=j.data("width");n=m.children(".nub");l=n.outerHeight();i=n.outerHeight();if(this.small()){m.css({width:"100%"})}else{m.css({width:(e)?e:"auto"})}k=function(t,s,p,o,r,q){return t.css({top:(s)?s:"auto",bottom:(o)?o:"auto",left:(r)?r:"auto",right:(p)?p:"auto"}).end()};k(m,(j.offset().top+j.outerHeight()+10),"auto","auto",j.offset().left);if(this.small()){k(m,(j.offset().top+j.outerHeight()+10),"auto","auto",12.5,c(this.scope).width());m.addClass("tip-override");k(n,-l,"auto","auto",j.offset().left)}else{var f=j.offset().left;if(Foundation.rtl){n.addClass("rtl");f=j.offset().left+j.outerWidth()-m.outerWidth()}k(m,(j.offset().top+j.outerHeight()+10),"auto","auto",f);if(n.attr("style")){n.removeAttr("style")}m.removeClass("tip-override");if(h&&h.indexOf("tip-top")>-1){if(Foundation.rtl){n.addClass("rtl")}k(m,(j.offset().top-m.outerHeight()),"auto","auto",f).removeClass("tip-override")}else{if(h&&h.indexOf("tip-left")>-1){k(m,(j.offset().top+(j.outerHeight()/2)-(m.outerHeight()/2)),"auto","auto",(j.offset().left-m.outerWidth()-l)).removeClass("tip-override");n.removeClass("rtl")}else{if(h&&h.indexOf("tip-right")>-1){k(m,(j.offset().top+(j.outerHeight()/2)-(m.outerHeight()/2)),"auto","auto",(j.offset().left+j.outerWidth()+l)).removeClass("tip-override");n.removeClass("rtl")}}}}m.css("visibility","visible").hide()},small:function(){return matchMedia(Foundation.media_queries.small).matches&&!matchMedia(Foundation.media_queries.medium).matches},inheritable_classes:function(e){var h=c.extend({},this.settings,this.data_options(e)),i=["tip-top","tip-left","tip-bottom","tip-right","radius","round"].concat(h.additional_inheritable_classes),g=e.attr("class"),f=g?c.map(g.split(" "),function(k,j){if(c.inArray(k,i)!==-1){return k}}).join(" "):"";return c.trim(f)},convert_to_touch:function(e){var f=this,h=f.getTip(e),g=c.extend({},f.settings,f.data_options(e));if(h.find(".tap-to-close").length===0){h.append('<span class="tap-to-close">'+g.touch_close_text+"</span>");h.on("click.fndtn.tooltip.tapclose touchstart.fndtn.tooltip.tapclose MSPointerDown.fndtn.tooltip.tapclose",function(i){f.hide(e)})}e.data("tooltip-open-event-type","touch")},show:function(e){var f=this.getTip(e);if(e.data("tooltip-open-event-type")=="touch"){this.convert_to_touch(e)}this.reposition(e,f,e.attr("class"));e.addClass("open");f.fadeIn(150)},hide:function(e){var f=this.getTip(e);f.fadeOut(150,function(){f.find(".tap-to-close").remove();f.off("click.fndtn.tooltip.tapclose MSPointerDown.fndtn.tapclose");e.removeClass("open")})},off:function(){var e=this;this.S(this.scope).off(".fndtn.tooltip");this.S(this.settings.tooltip_class).each(function(f){c("["+e.attr_name()+"]").eq(f).attr("title",c(this).text())}).remove()},reflow:function(){}}}(jQuery,window,window.document));