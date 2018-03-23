import sinon from 'sinon'
import FirebaseDao from '../../../../src/utils/FirebaseDao'
import firebase from 'firebase'

describe('Firebase', () => {

  const sandbox = sinon.sandbox.create();
  const refStub = sandbox.stub();
  const onceStub = sandbox.stub();
  const thenStub = sandbox.stub();
  beforeEach(() => {

    sandbox.stub(firebase, 'initializeApp');

    const databaseStub = sandbox.stub(firebase, 'database');
    databaseStub.returns({ref: refStub});
  });

  //Todo: 비동기 상황인데 timeout 없이 처리하는 방법 확인 필요.
  it('readBooks를 호출 시 callback함수를 실행한다', () => {
    refStub.withArgs('books/').returns({once: onceStub});
    onceStub.withArgs('value').returns({then: thenStub});
    thenStub.returns(Promise.resolve());


    const fakedFun = sandbox.spy();
    const fb = new FirebaseDao();
    fb.readBooks(fakedFun);

    setTimeout(() => {
      sinon.assert.calledOnce(fakedFun);
    }, 3000);

  });



  afterEach(() => {
    sandbox.restore()
  })


})
