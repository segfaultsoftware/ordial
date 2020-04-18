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
__p += '\n    <label for="hide-junk-dna-checkbox">Hide junk dna</label>\n    <input id="hide-junk-dna-checkbox" type="checkbox" ';
 if(singletonContext.configuration.hideJunkDna){ ;
__p += '\n    checked\n  ';
 } ;
__p += '\n    />\n</div>\n';

}
return __p
};

this["JST"]["src/viewTemplates/saveControls.template.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="button save-button">Save...</div>\n<div class="button load-button">Load...</div>\n<textarea class="load-text"></textarea>';

}
return __p
};

this["JST"]["src/viewTemplates/scenarioSelection.template.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="scenario-selection">\n    <div class="inner">\n        <h2>Select Scenario</h2>\n        ';
 for(let i = 0; i< scenarios.length; i++) { ;
__p += '\n            <input type="radio" id="' +
((__t = ( scenarios[i].id )) == null ? '' : __t) +
'" name="scenario-group"/>\n            <label class="scenario" for="' +
((__t = ( scenarios[i].id )) == null ? '' : __t) +
'">\n                <img src="/images/' +
((__t = ( scenarios[i].id )) == null ? '' : __t) +
'.png"/>\n            </label>\n        ';
 } ;
__p += '\n    </div>\n</div>';

}
return __p
};