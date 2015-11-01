var should = require('should'),
    sinon = require('sinon');

describe('Profile Controller Tests:', function(){
  describe('Post', function(){
      it('should not allow an empty name on post', function(){
          var Profile = function(profile){this.save = function(){};};

          var req = {
            body : {
              email: 'dummy@gmail.com'
            }
          }

          var res = {
              status: sinon.spy(),
              send: sinon.spy()
            };

          var profileController = require('../controllers/profileController')(Profile);
          profileController.post(req, res);

          res.status.calledWith(400).should.equal(true, 'Bad Status' + res.status.args[0][0]);
          res.send.calledWith('Campo Nome é requerido').should.equal(true);
      });
  });

  describe('Post', function(){
      it('should not allow an empty email on post', function(){
          var Profile = function(profile){this.save = function(){};};

          var req = {
            body : {
              nome: 'Dummy'
            }
          }

          var res = {
              status: sinon.spy(),
              send: sinon.spy()
            };

          var profileController = require('../controllers/profileController')(Profile);
          profileController.post(req, res);

          res.status.calledWith(400).should.equal(true, 'Bad Status' + res.status.args[0][0]);
          res.send.calledWith('Campo Email é requerido').should.equal(true);
      });
  });

  describe('Post', function(){
      it('should not allow an empty dataNascimento on post', function(){
          var Profile = function(profile){this.save = function(){};};

          var req = {
            body : {
              nome: 'Dummy',
              email: 'dummy@gmail.com'
            }
          }

          var res = {
              status: sinon.spy(),
              send: sinon.spy()
            };

          var profileController = require('../controllers/profileController')(Profile);
          profileController.post(req, res);

          res.status.calledWith(400).should.equal(true, 'Bad Status' + res.status.args[0][0]);
          res.send.calledWith('Campo Data de Nascimento é requerido').should.equal(true);
      });
  });
});
