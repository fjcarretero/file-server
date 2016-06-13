/*
* @package jsDAV
* @subpackage DAV
* @copyright Copyright(c) 2011 Ajax.org B.V. <info AT ajax.org>
* @author Mike de Boer <info AT mikedeboer DOT nl>
* @license http://github.com/mikedeboer/jsDAV/blob/master/LICENSE MIT License
*/
"use strict";
var jsDAV = require("jsDAV");
var crypto = require('crypto');
var fs = require('fs');

function random (howMany, chars) {
    chars = chars 
        || "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
    var rnd = crypto.randomBytes(howMany)
        , value = new Array(howMany)
        , len = chars.length;

    for (var i = 0; i < howMany; i++) {
        value[i] = chars[rnd[i] % len]
    };

    return value.join('');
}

console.log("Estoy!");

fs.writeFile(__dirname + "/htdigest", "admin:madrid:" + random(10), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
    
    jsDAV.debugMode = true;
    var jsDAV_Locks_Backend_FS = require("jsDAV/lib/DAV/plugins/locks/fs");
    var jsDAV_Auth_Backend_File = require("jsDAV/lib/DAV/plugins/auth/file");
    jsDAV.createServer({
      node: __dirname + "/../test/assets",
      locksBackend: jsDAV_Locks_Backend_FS.new(__dirname + "/../test/assets"),
      authBackend: jsDAV_Auth_Backend_File.new(__dirname + "/htdigest")
    }, 8000, "0.0.0.0");
}); 
