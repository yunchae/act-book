import BookRequestList from '../../../../src/components/BookRequestList';
import * as sinon from "sinon";
import {shallow, mount, createLocalVue} from 'vue-test-utils';
import Vue from 'vue'
import FirebaseDao from '../../../../src/utils/FirebaseDao'

import api from '../../../../src/api/index'
import TestCase from "../../../../src/assets/resources";
//import { expect } from 'chai';

describe("BookRequestList", ()=> {

  let sandbox ;

  beforeEach(()=>{
    sandbox = sinon.sandbox.create();

  })

  afterEach(()=>{
    sandbox.restore();

  })

  it('컴포넌트가 처믕 생성될 때, 테이블 데이터 호출', ()=> {

    let readAllRequestedBooksStub = sandbox.stub(FirebaseDao.prototype, "readAllRequestedBooks")
    let result = [];
    readAllRequestedBooksStub.callsFake((a, b, callback) => {
      callback(result);
    });

    // fireStore set
    let fireStore = new FirebaseDao()
    const wrapper = shallow(BookRequestList,{
      mocks: {
        fireStore
      }
    });

    expect(wrapper.vm.tableData).toEqual(result);
  })


  it('select 박스에서 상태값을 변경한다', () => {
    let fireStore = new FirebaseDao()
    const wrapper = shallow(BookRequestList,{
      mocks: {
        fireStore
      }
    });

    wrapper.vm.tableData = [{"no" : 1, "isbn" : "1234567890", "status" : "신청중"}]

    sandbox.stub(FirebaseDao.prototype, "updateBook").callsFake((isbn, status) => {
      return Promise.resolve();
    })

    let eventSpy = {"target" : {"value" : "보유"} };

    wrapper.vm.statusChanged(1, "1234567890", eventSpy);

    expect(wrapper.vm.tableData[0].status).toBe("보유")
  })

})
