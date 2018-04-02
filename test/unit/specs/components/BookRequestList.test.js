import BookRequestList from '../../../../src/components/BookRequestList';
import * as sinon from "sinon";
import {shallow, mount} from 'vue-test-utils';
import FirebaseDao from '../../../../src/utils/FirebaseDao'
//import { expect } from 'chai';

describe("BookRequestList", ()=> {

  let sandbox ;

  beforeEach(()=>{
    sandbox = sinon.sandbox.create();
  })

  afterEach(()=>{
    sandbox.restore();

  })

  it('should call readBooksByFilter when components is created', ()=> {
    let readBooksByFilterStub =sandbox.spy(BookRequestList.methods, "readBooksByFilter");
    shallow(BookRequestList);
    sinon.assert.calledOnce(readBooksByFilterStub);
  })

  it('should set tableData when component is created', ()=>{
    let readAllRequestedBooksStub = sandbox.stub(FirebaseDao.prototype, "readAllRequestedBooks")

    let result = {};
    readAllRequestedBooksStub.callsFake((a,callback) => {
      callback(result);
    });

    let wrapper = shallow(BookRequestList)
    expect(wrapper.vm.tableData).toEqual(result);
  })

  it('select 박스에서 상태값을 변경한다', () => {
    let wrapper = mount(BookRequestList)

    wrapper.vm.tableData = [{"no" : 1, "isbn" : "1234567890", "status" : "신청중"}]

    sandbox.stub(FirebaseDao.prototype, "updateBook").callsFake((isbn, status) => {
      return Promise.resolve();
    })

    let eventSpy = {"target" : {"value" : "보유"} };

    wrapper.vm.statusChanged(1, "1234567890", eventSpy);

    expect(wrapper.vm.tableData[0].status).toBe("보유")
  })

})
