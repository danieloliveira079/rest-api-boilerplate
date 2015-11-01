var profileController = function(Profile){
      var post = function(req, res){
          var profile = new Profile(req.body);

          if (!req.body.nome) {
              res.status(400);
              res.send('Campo Nome é requerido');
          } else if (!req.body.email) {
              res.status(400);
              res.send('Campo Email é requerido');
          } else if (!req.body.dataNascimento) {
              res.status(400);
              res.send('Campo Data de Nascimento é requerido');
          }
           else {
              profile.save();
              res.status(201);
              res.send(profile);
          }
      };

      var get = function(req, res){
          var query = {};
          if (req.query.nome) {
            query.nome = req.query.nome;
          }

          Profile.find(query, function(err, profiles){
            if (err) {
              res.status(500).send(err);
            } else {
              var returnProfiles = [];
              profiles.forEach(function(element, index, array){
                  var newProfile = element.toJSON();
                  newProfile.links = {};
                  newProfile.links.self = 'http://' + req.headers.host + '/api/profiles/' + newProfile._id;
                  returnProfiles.push(newProfile);
              });

              res.json(returnProfiles);
            }
          });
      };

      return {
          post : post,
          get : get
      };
};

module.exports = profileController;
