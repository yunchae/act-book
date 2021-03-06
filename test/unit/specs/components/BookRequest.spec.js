import {mount, shallow} from 'vue-test-utils'
import api from '../../../../src/api/index'
import FirebaseDao from '../../../../src/utils/FirebaseDao'
import BookRequest from '../../../../src/components/BookRequest.vue'
import TestCase from '../../../../src/assets/resources.js'
import sinon from 'sinon';
import flushPromises from 'flush-promises'
import 'vue-popperjs/dist/css/vue-popper.css'


describe('Test Case BookRequest Vue', ()=>{

  let sandbox = sinon.sandbox.create();

  beforeEach(() => {
  })

  it('Text Input에 검색어를 입력하고 버튼을 클릭했을 때 검색어를 이용해 searchBook Api를 호출하는지 확인', async()=>{

    //given

    //api의 searchBook() 함수 스텁 만들기
    const stubSearchBook = sandbox.stub(api, "searchBook"); // api.searchBook stub 세팅
    stubSearchBook.withArgs('java').callsFake((callback)=>{         // searchBook stub (input -> output 정의 )
      return new Promise((resolve) => {
        resolve(TestCase.TEST_CASE.BOOK_SEARCH_RESULT)
      });
    })

    const stubReadAllBooksForCheckIFWeHave = sandbox.stub(FirebaseDao.prototype, 'readAllBooksBy');
    stubReadAllBooksForCheckIFWeHave.callsFake((callback)=> {
      return callback(TestCase.TEST_CASE.BOOK_HAVE_LIST)
    })

    let fireStore = new FirebaseDao()
    const wrapper = shallow(BookRequest,{
      mocks: {
        fireStore
      }
    });

    //firebase 의 readAllBokks()함수 스텁 만들기
    wrapper.vm.api = {};   // BookRequest Wrapper api property 를 선언 및 초기화
    wrapper.vm.api.searchBook = stubSearchBook; // BookRequest Wrapper api 객체의 property로

    wrapper.vm.searchInputTitle = 'java' // 검색어 input data 'java'로 셋

    //when
    const searchButton = wrapper.find('#searchButton')
    searchButton.trigger('click')

    //then
    await flushPromises()

    expect(wrapper.vm.tableData).toEqual(TestCase.TEST_CASE.BOOK_SEARCH_TABLE_RESULT);

  })

  it('requestBook(신청버튼 클릭이벤트) 메서드에서 해당 데이터의 status값이 신청중으로 변경된다', ()=>{
    //Given
    // wrapper mount
    const wrapper  = mount(BookRequest)
    const stub$swal = sandbox.stub();

    stub$swal.callsFake((result)=> {         // $swal stub (input -> output 정의 )
      result.value = 'nyc';
      return new Promise((resolve) => {
        resolve(result)
      })

      wrapper.vm.$swal = stub$swal;
      sandbox.stub(FirebaseDao.prototype, 'insertBook');

      //조회가 된 상태
      wrapper.vm.tableData = TestCase.TEST_CASE.BOOK_SEARCH_TABLE_RESULT;

      //When
      // 메서드가 호출 클릭했을 때
      wrapper.vm.requestBook(TestCase.TEST_CASE.BOOK_SEARCH_TABLE_RESULT[3])

      //Then
      expect(wrapper.vm.tableData).toEqual(TestCase.TEST_CASE.BOOK_REQUESTED_TABLE_RESULT)

    })
  })

  it('책 제목에서 <b>, </b> 태그 제거', () =>{
    const wrapper = shallow(BookRequest)
    expect(wrapper.vm.removeBTag(TestCase.TEST_CASE.BOOK_SEARCH_TABLE_RESULT[1].title))
      .toEqual(TestCase.TEST_CASE.BOOK_REQUESTED_TABLE_ROW.title)

  })

  it('PublishedDate의 포맷을 yyyymmdd를 yyyy-mm-dd 타입으로 변경', ()=>{
    const wrapper = shallow(BookRequest)
    expect(wrapper.vm.changeDateFormat('20171010'))
      .toEqual('2017-10-10')

  })

  afterEach(() => {
    // sandbox.restore();
  })

})

