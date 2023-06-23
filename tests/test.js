const chai = require("chai");
const chaiHttp = require("chai-http");
const { app, server } = require("../app");

chai.use(chaiHttp);
chai.should();

describe("People", () => {
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
          res.body.should.be.eql({ error: "Please enter a name." });
          done();
      });
    });
    it("should create a people entry with valid input", (done) => {
      // your code goes here
      chai
        .request(app)
        .post("/api/v1/people")
        .send({ name: 'anne', age: -2 })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.eql({ error: "Please enter a vaid input." });
          done();
        });
    });
  });
  describe("get /api/v1/people", () => {
    it(`should return an array of person entries of length ${this.lastIndex + 1}`, (done) => {
           // your code goes here
      chai
        .request(app)
        .post("/api/v1/people")
        .send({ name: 'anne', age: 20 }, { name: 'jane', age: 30 }, { name: 'andrew', age: 40 })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.eql({ error: "Please enter a person." });
          done();
        });
    });
  });
  describe("get /apl/v1/people/:id", () => {
    it("should return the entry corresponding to the last person added.", (done) => {
      // your code goes here
      chai
        .request(app)
        .post("/api/v1/people/:id")
        .send({ name: 'anne', age: 10 })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.eql({ error: "Please enter a name." });
          done();
      });
    });
    it("should return an error if the index is >= the length of the array", (done) => {
            // your code goes here
            chai
        .request(app)
        .post("/api/v1/people/:id")
        .send({ id: 4 })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.eql({ error: "Please enter a name." });
          done();
      });
    });
  });
});
