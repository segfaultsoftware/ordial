this["JST"] = this["JST"] || {};

this["JST"]["src/templates/critterGuts.template.html"] = function(obj) {
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