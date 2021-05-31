// import chai from 'chai';

// import chaiHttp from 'chai-http';

// import app from 'src/app';
// import { challengeTestData, authTestData } from '@__test__/data/';

// // assertion style
// const { expect } = chai;
// chai.use(chaiHttp);

// describe('CRUD Challenge Test Suite', () => {
//   describe('Create Challenge Test Suite', async () => {
//     const { title, question, prepareCode, srcDoc } =
//       challengeTestData.challengeTest;

//     it('Return status code 201 on successfully', async () => {
//       const cookie = await global.register(authTestData.userTest);
//       const res = await chai
//         .request(app)
//         .post(`/${global.apiVersion}/challenge`)
//         .send({ title, question, prepareCode, srcDoc })
//         .set('Cookie', cookie);

//       expect(res.status).to.equal(201);
//       expect(res.body.data).to.have.property('challenge');
//       expect(res.body.data.challenge).to.have.property('_id');
//       expect(res.body.data.challenge).to.have.property('title');
//       expect(res.body.data.challenge).to.have.property('question');
//       expect(res.body.data.challenge).to.have.property('prepareCode');
//       expect(res.body.data.challenge).to.have.property('srcDoc');
//     });

//     it('Return status code 400 on missing title', async () => {
//       const cookie = await global.register(authTestData.userTest);
//       const res = await chai
//         .request(app)
//         .post(`/${global.apiVersion}/challenge`)
//         .send({ question, prepareCode, srcDoc })
//         .set('Cookie', cookie);

//       expect(res.status).to.equal(400);
//     });

//     it('Return status code 400 on missing question', async () => {
//       const cookie = await global.register(authTestData.userTest);
//       const res = await chai
//         .request(app)
//         .post(`/${global.apiVersion}/challenge`)
//         .send({ title, prepareCode, srcDoc })
//         .set('Cookie', cookie);

//       expect(res.status).to.equal(400);
//     });

//     it('Return status code 400 on missing prepareCode', async () => {
//       const cookie = await global.register(authTestData.userTest);
//       const res = await chai
//         .request(app)
//         .post(`/${global.apiVersion}/challenge`)
//         .send({ question, title, srcDoc })
//         .set('Cookie', cookie);

//       expect(res.status).to.equal(400);
//     });

//     it('Return status code 400 on missing srcDoc', async () => {
//       const cookie = await global.register(authTestData.userTest);
//       const res = await chai
//         .request(app)
//         .post(`/${global.apiVersion}/challenge`)
//         .send({ question, title, prepareCode })
//         .set('Cookie', cookie);

//       expect(res.status).to.equal(400);
//     });
//   });
//   describe('Delete Challenge Test Suite', () => {
//     const { title, question, prepareCode, srcDoc } =
//       challengeTestData.challengeTest;
//     it('Return status code 200 on successfully', async () => {
//       const create = await chai
//         .request(app)
//         .post(`/${global.apiVersion}/challenge`)
//         .send({ title, question, prepareCode, srcDoc });

//       const { challenge } = create.body.data;
//       expect(challenge).to.be.a('object');

//       const deleteRes = await chai
//         .request(app)
//         .delete(`/${global.apiVersion}/challenge/${challenge._id}`);

//       expect(deleteRes.status).to.equals(200);
//       expect(deleteRes.body).to.have.property('message');

//       const getRes = await chai
//         .request(app)
//         .get(`/${global.apiVersion}/challenge?id=${challenge._id}`);
//       expect(getRes.status).to.equals(200);
//       expect(getRes.body.data.challenge.length).to.equals(0);
//     });
//   });

//   describe('Get Challenge Test Suite', () => {
//     it('Return status code 200 on successfully request', async () => {
//       const { title, question, prepareCode, srcDoc } =
//         challengeTestData.challengeTest;

//       const createRes = await chai
//         .request(app)
//         .post(`/${global.apiVersion}/challenge`)
//         .send({ title, question, prepareCode, srcDoc });

//       const { challenge } = createRes.body.data;

//       const getRes = await chai
//         .request(app)
//         .get(`/${global.apiVersion}/challenge?id=${challenge._id}`);

//       expect(getRes.status).to.equal(200);
//       expect(getRes.body.data.challenge).to.be.a('array');
//     });
//   });
// });
