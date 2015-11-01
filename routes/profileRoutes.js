var express = require('express');

var routes = function(Profile){

var profileRouter = express.Router();

var profileController = require('../controllers/profileController')(Profile);

profileRouter.route('/')
    .post(profileController.post)
    .get(profileController.get);

//middleware to inject ProfileById
profileRouter.use('/:profileId', function(req, res, next){
    Profile.findById(req.params.profileId, function(err, profile){
      if (err) {
        res.status(500).send(err);
      } else if (profile) {
        req.profile = profile;
        next();
      } else {
        res.status(404).send('Profile não encontrado');
      }
    });
});

profileRouter.route('/:profileId')
        .get(function(req, res){
            var returnProfile = req.profile.toJSON();

            returnProfile.links = {};
            var newLink =  'http://' + req.headers.host + '/api/profiles/?name=' + returnProfile.name;
            returnProfile.links.FilterThisByName = newLink.replace(' ','%20');

            res.json(returnProfile);
        })
        .put(function(req, res){
            req.profile.nome = req.body.nome;
            req.profile.email = req.body.email;
            req.profile.ready = req.body.ready;

            req.profile.save(function(err){
              if (err) {
                res.status(500).send(err);
              } else {
                res.json(req.profile);
              }
            });
        })
        .patch(function(req, res){
            if (req.body._id) {
              delete req.body._id;
            }

            for (var p in req.body) {
                req.profile[p] = req.body[p];
            }

            req.profile.save(function(err){
              if (err) {
                res.status(500).send(err);
              } else {
                res.json(req.profile);
              }
            });
        })
        .delete(function(req, res){
            req.profile.remove(function(err){
              if (err) {
                res.status(500).send(err);
              } else {
                res.status(204).send('Profile Deletado');
              }
            });
        });

    return profileRouter;
};

module.exports = routes;
