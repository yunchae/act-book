import sinon from 'sinon'
import FirebaseDao from '../../../../src/utils/FirebaseDao'
import firebase from 'firebase'
import flushPromises from 'flush-promises';

describe('Firebase', () => {

  const sandbox = sinon.sandbox.create();
  const refStub = sandbox.stub();
  const orderByChildStub = sandbox.stub();
  const onceStub = sandbox.stub();
  const thenStub = sandbox.stub();
  beforeEach(() => {

    sandbox.stub(firebase, 'initializeApp');

    const databaseStub = sandbox.stub(firebase, 'database');
    databaseStub.returns({ref: refStub});
  });

  //Todo: 비동기 상황인데 timeout 없이 처리하는 방법 확인 필요.
  it('readBooks를 호출 시 callback함수를 실행한다', async() => {

    const fakedFun = sandbox.spy();
    var fn1 = function(){
      return {"status": "보유", "title" : "타이틀"}
    }
    var fn2 = function(status, title, no){
      return {"status": "취소", "title" : "타이틀"}
    }
    let result = [{val: fn1}, {val: fn2}]

    refStub.withArgs('books/').returns({orderByChild: orderByChildStub});
    orderByChildStub.withArgs('status').returns({once: onceStub});
    onceStub.withArgs('value').returns({then: thenStub});
    thenStub.callsFake((snapshotFunction)=>{
      snapshotFunction(result);

    });



    // const fakedFun = sandbox.spy();
    const fb = new FirebaseDao();

    fb.readAllBooksBy(fakedFun, '전체', '', true);
    await flushPromises()

     //expect(fakedFun.calledOnce).toBe(true);
    sinon.assert.calledOnce(fakedFun);
  });



  afterEach(() => {
    sandbox.restore()
  })


})
