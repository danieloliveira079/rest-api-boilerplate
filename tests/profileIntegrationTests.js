var should = require('should'),
    request = require('supertest'),
    app = require('../app.js'),
    mongoose = require('mongoose'),
    Profile = mongoose.model('Profile'),
    agent = request.agent(app);

describe('Profile CRUD Test ', function(){
    it('Should allow a profile to be posted and return a ready and _id', function(done){
        var profilePost = {nome:'Daniel de Oliveira', email: 'daniel.oliveira@gmail.com', dataNascimento: new Date()};

        agent.post('/api/profiles')
          .send(profilePost)
          .expect(200)
          .end(function(err, results){
              results.body.ready.should.equal(false);
              results.body.should.have.property('_id');
              done();
          })
    })

    afterEach(function(done){
        Profile.remove().exec();
        done();
    })
})
