import sinon from 'sinon'
import BookList from '../../../../src/components/BookList.vue'
import FirebaseDao from '../../../../src/utils/FirebaseDao'
import {shallow, mount} from 'vue-test-utils';

describe('BooList test', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();

  });

  afterEach(() => {
    sandbox.restore()
  })

  it('BookList화면이 뜨면 tableData에 DB에서 호출한 books 정보가 들어가 있다', () => {

    let result = [
      { no: 1, title: "자바의 정석", author: "20", publisher:"시나공", publishing_date:"2018", status:"신청중" },
      { no: 2, title: "자바의 정석", author: "20", publisher:"시나공", publishing_date:"2018", status:"신청중" },
      { no: 3, title: "자바의 정석", author: "20", publisher:"시나공", publishing_date:"2018", status:"신청중" },
      { no: 4, title: "자바의 정석", author: "20", publisher:"시나공", publishing_date:"2018", status:"신청중" },
      { no: 5, title: "자바의 정석", author: "20", publisher:"시나공", publishing_date:"2018", status:"신청중" },
      { no: 6, title: "자바의 정석", author: "20", publisher:"시나공", publishing_date:"2018", status:"신청중" },
      { no: 7, title: "자바의 정석", author: "20", publisher:"시나공", publishing_date:"2018", status:"신청중" },
      { no: 8, title: "자바의 정석", author: "20", publisher:"시나공", publishing_date:"2018", status:"신청중" },
      { no: 9, title: "자바의 정석", author: "20", publisher:"시나공", publishing_date:"2018", status:"신청중" },
      { no: 10, title: "자바의 정석", author: "20", publisher:"시나공", publishing_date:"2018", status:"신청중" },
      { no: 11, title: "자바의 정석", author: "20", publisher:"시나공", publishing_date:"2018", status:"신청중" },
      { no: 12, title: "자바의 정석", author: "20", publisher:"시나공", publishing_date:"2018", status:"신청중" },
      { no: 13, title: "자바의 정석", author: "20", publisher:"시나공", publishing_date:"2018", status:"신청중" }
    ];

    let readAllBooksBy = sandbox.stub(FirebaseDao.prototype, "readAllBooksBy")

    readAllBooksBy.callsFake((callback)=> {
      callback(result)
    })

    // fireStore set
    let fireStore = new FirebaseDao()
    const wrapper = shallow(BookList,{
      mocks: {
        fireStore
      }
    });

    expect(wrapper.vm.tableData).toEqual(result);
  })


  it('보유 라디오 버튼을 클릭하면 보유중인 책 목록만 가져오는 함수가 호출된다', () => {

    let result = [
      { no: 1, title: "자바의 정석", author: "20", publisher:"시나공", publishedDate:"2018", status:"보유" },
      { no: 2, title: "자바의 정석", author: "20", publisher:"시나공", publishedDate:"2018", status:"보유" },
      { no: 3, title: "자바의 정석", author: "20", publisher:"시나공", publishedDate:"2018", status:"보유" }
    ];

    let readAllBooksBy = sandbox.stub(FirebaseDao.prototype, "readAllBooksBy")

    readAllBooksBy.callsFake((callback)=> {
      callback(result)
    })

    let fireStore = new FirebaseDao()
    const wrapper = shallow(BookList,{
      mocks: {
        fireStore
      }
    });

    wrapper.find('input[value="전체"]').trigger('click')
    expect(wrapper.vm.tableData).toEqual(result);

  })

});
