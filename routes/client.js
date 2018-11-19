var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:game', function(req, res, next) {
	var game = req.params.game;
	var gameScript = 'client' + game.charAt(0).toUpperCase() + game.slice(1) + '.js';
	res.render('client', {gameScript});
});

module.exports = router;
