import sinon from 'sinon'
import FirebaseDao from '../../../../src/utils/FirebaseDao'
import firebase from 'firebase'
import flushPromises from 'flush-promises';

describe('Firebase', () => {

  const sandbox = sinon.sandbox.create();
  const refStub = sandbox.stub();
  const orderByChildStub = sandbox.stub();
  const equalToStub = sandbox.stub();
  const onceStub = sandbox.stub();
  let fb;

  beforeEach(() => {
    sandbox.stub(firebase, 'initializeApp');

    const databaseStub = sandbox.stub(firebase, 'database');
    databaseStub.returns({ref: refStub});
    refStub.withArgs('books/').returns({orderByChild: orderByChildStub});

    fb = new FirebaseDao();
  });

  it('should call firebase api and callback when readAllBooksBy is called with 전체 filter.',async()=> {
    let result = [];
    let callbackParam = sandbox.spy();
    orderByChildStub.withArgs('status').returns({once: onceStub});
    onceStub.withArgs('value').returns(Promise.resolve(result));

    fb.readAllBooksBy(callbackParam,'전체');
    await flushPromises();

    sinon.assert.calledOnce(callbackParam);
    sinon.assert.callCount(equalToStub,0);

  })

  it('should call firebase api with equalTo and callback when readAllBooksBy is called without 전체 filter.', async() => {
    let result =[];
    let callbackParam=sandbox.spy();
    orderByChildStub.withArgs('status').returns({equalTo: equalToStub});
    equalToStub.withArgs('보유').returns({once: onceStub});
    onceStub.withArgs('value').returns(Promise.resolve(result));

    fb.readAllBooksBy(callbackParam, '보유');
    await  flushPromises();

    sinon.assert.calledOnce(callbackParam);
    sinon.assert.calledOnce(equalToStub);
  })

  it('should return true when status of book is not 취소.', ()=>{
    let book ={};
    book.status= '보유'

    expect(fb.isNotCanceledBook(book)).toBe(true);
  })

  it('should return true when book title contains searchKeyword', () => {
    let searchKeyword = '자바'
    let book = {'title' : '자바의 정석'}
    expect(fb.isKeywordValidated(searchKeyword, book)).toBe(true)

    searchKeyword = '파이썬'
    expect(fb.isKeywordValidated(searchKeyword, book)).toBe(false)
  })

  afterEach(() => {
    sandbox.restore()
  })

})
