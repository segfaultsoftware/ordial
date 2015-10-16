this["JST"] = this["JST"] || {};

this["JST"]["src/viewTemplates/critterGuts.template.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="critter-guts">\n  ';
 if(typeof vitals !== "undefined") { ;
__p += '\n    <label>Mana</label>\n    <span class="critter-mana">' +
((__t = ( vitals.mana )) == null ? '' : __t) +
'</span>\n  ';
 } else { ;
__p += '\n    <div class="message">(no critter selected)</div>\n  ';
 } ;
__p += '\n</div>\n';

}
return __p
};

this["JST"]["src/viewTemplates/tiles/critter.template.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="critter ' +
((__t = (direction.toLowerCase())) == null ? '' : __t) +
' ' +
((__t = (color)) == null ? '' : __t) +
'"></div>\n';

}
return __p
};

this["JST"]["src/viewTemplates/tiles/resource.template.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="resource"></div>\n';

}
return __p
};

this["JST"]["src/viewTemplates/tiles/rock.template.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="rock"></div>\n';

}
return __p
};

this["JST"]["src/viewTemplates/tiles/tile.template.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '';

}
return __p
};

this["JST"]["src/viewTemplates/world.template.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<table>\n  ';
 for(var row = 0; row < height; row++) { ;
__p += '\n    <tr>\n      ';
 for(var col = 0; col < width; col++) { ;
__p += '\n        <td>\n          <div class="tile" dat="def" id="thing-' +
((__t = (row)) == null ? '' : __t) +
'-' +
((__t = (col)) == null ? '' : __t) +
'"></div>\n        </td>\n      ';
 } ;
__p += '\n    </tr>\n  ';
 } ;
__p += '\n</table>\n';

}
return __p
};