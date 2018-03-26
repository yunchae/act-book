import {mount, shallow} from 'vue-test-utils'
import api from '../../../src/api'
import BookRequest from '../../../src/components/BookRequest.vue'
import TestCase from '../../../src/assets/resources.js'
import sinon from 'sinon';
import flushPromises from 'flush-promises'

describe('Test Case BookRequest Vue', ()=>{

  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  })

  it('Text Input에 검색어를 입력하고 버튼을 클릭했을 때 검색어를 이용해 searchBook Api를 호출하는지 확인', async()=>{

    //given
    const wrapper = mount(BookRequest)
    const stubSearchBook = sandbox.stub(api, "searchBook");

    stubSearchBook.withArgs('java').callsFake(()=>{

      return new Promise((resolve, reject) => {
        resolve(TestCase.TEST_CASE.BOOK_SEARCH_RESULT)
      });
    })

    wrapper.vm.api = {};
    wrapper.vm.api.searchBook = stubSearchBook;

    wrapper.vm.searchInputTitle = 'java'

    //when
    const searchButton = wrapper.find('#searchButton')
    searchButton.trigger('click')

    //then
    await flushPromises()

    expect(wrapper.vm.tableData).toEqual(TestCase.TEST_CASE.BOOK_SEARCH_TABLE_RESULT);

    // expect(wrapper.vm.resultData).toEqual(TestCase.TEST_CASE.BOOK_SEARCH_FINAL_RESULT);

  })

  // it('API 검색결과 resultData값을 tableData의 제목, 저자, 출판사 ISBN 형태로 가공한다.', ()=>{
  //
  //   const wrapper = shallow(BookRequest)
  //
  //   wrapper.vm.convertToFinalResult(TestCase.TEST_CASE.BOOK_SEARCH_RESULT.data)
  //
  //   expect(wrapper.vm.tableData).toEqual(TestCase.TEST_CASE.BOOK_SEARCH_FINAL_RESULT);
  // })

  it('테이블에 상태컬럼값이 빈값일 때 상태컬럼에 버튼이 렌더링된다', async()=>{
    //given
    const wrapper = mount(BookRequest)
    const stubSearchBook = sandbox.stub(api, "searchBook");

    stubSearchBook.withArgs('java').callsFake(()=>{

      return new Promise((resolve, reject) => {
        resolve(TestCase.TEST_CASE.BOOK_SEARCH_RESULT)
      });
    })

    wrapper.vm.api = {};
    wrapper.vm.api.searchBook = stubSearchBook;

    wrapper.vm.searchInputTitle = 'java'

    const searchButton = wrapper.find('#searchButton')
    searchButton.trigger('click')

    await flushPromises()

    wrapper.vm.tableData[0].status = ''
    wrapper.vm.tableData[1].status = '보유중'
    wrapper.vm.tableData[2].status = '신청중'

    wrapper.vm.update();

    expect(wrapper.contains('<button isbn="row-0">신청</button>').to.equal(true);
    expect(wrapper.contains('<p>보유중</p>').to.equal(true);
    expect(wrapper.contains('<p>신청중</p>').to.equal(true);



  })

  afterEach(() => {
    sandbox.restore();
  })

})

