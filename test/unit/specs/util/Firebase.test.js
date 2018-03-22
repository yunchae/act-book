import sinon from 'sinon';
import firebase from 'firebase';
import FirebaseDao, { readBooks2 } from '../../../../src/utils/FirebaseDao';
//import { mount } from 'vue-test-utils'

describe('FirebaseDao Util', () => {

  const sandbox = sinon.sandbox.create();
  const refStub = sandbox.stub();
  const onceStub = sandbox.stub();
  const thenStub = sandbox.stub();
  //const wrapper = mount(FirebaseDao);

  beforeEach(() => {

    sandbox.stub(firebase, 'initializeApp');
    const databaseStub = sandbox.stub(firebase, 'database');

    databaseStub.returns({ ref: refStub });

  });

  it('readBooks 호출 시 firebase database에서 books를 받아온다.', (done) => {
    refStub.withArgs('books/').returns({ once: onceStub });
    onceStub.withArgs('value').returns({ then: thenStub });
    // thenStub.returns(Promise.resolve());
    thenStub.returns(Promise.resolve());

    // readBooks2();
    //
    // const fb = new FirebaseDao();
    // console.log(fb.readBooks());
    //
    // var results = fb.readBooks();
    readBooks2();
    // console.log('>>>>>>>>'+ readBooks2());
    //Todo: 데이터를 읽어서 건수와 내용을 비교하는 항목 추가 필요.

    sinon.assert.calledOnce(refStub);
    sinon.assert.calledOnce(onceStub);
    sinon.assert.calledOnce(thenStub);

    done();

  } )

  afterEach(() => {
    sandbox.restore();
  })


})



