const chai = require("chai");
const chaiHttp = require("chai-http");
const { app, server } = require("../app");

chai.use(chaiHttp);
chai.should();

describe("People", function () {
  after(() => {
    server.close();
  });
  describe("post /api/v1/people", () => {
    it("should not create a people entry without a name", (done) => {
      chai
        .request(app)
        .post("/api/v1/people")
        .send({ age: 10 })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.eql({ error: "Please provide name and age" });
          done();
        });
    });
    it("should create a people entry with valid input", (done) => {
      chai
        .request(app)
        .post("/api/v1/people")
        .send({name:'Mau', age: 10 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.contain({ msg: "A person entry was added" });
          this.Index = res.body.Index
          done();
        });
    });
  });
  describe("get /api/v1/people", () => {
    it(`should return an array of person entries of length 1`, (done) => {
      chai
      .request(app)
      .get("/api/v1/people")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.people.length.should.be.eql(this.Index);
        done();
      });
    });
  });
  describe("get /apl/v1/people/:id", () => {
    it("should return the entry corresponding to the last person added.", (done) => {
      chai
      .request(app)
      .get("/api/v1/people/1")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.eql({person:{name:'Mau', age: 10 }});
        done();
      });
    });
    it("should return an error if the index is >= the length of the array", (done) => {
            // your code goes here
                  chai
        .request(app)
        .get("/api/v1/people/2")
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.eql({ error: "The index is out of range" });
          done();
        });

    });
  });
});
