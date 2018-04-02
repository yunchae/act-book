import sinon from 'sinon'
import BookList from '../../../../src/components/BookList.vue'
import FirebaseDao from '../../../../src/utils/FirebaseDao'
import {shallow, mount} from 'vue-test-utils';
// import expect from 'chai'

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


    sandbox.stub(FirebaseDao.prototype, 'readBooks').callsFake((a,b,callback) => {

      callback(result);
    });

    // callback 함수가 this.tableData에 값을 넣어주기
    const wrapper = shallow(BookList);

    expect(wrapper.vm.tableData).toEqual(result);


  })

  it('BookList화면이 뜨면 readBooksByFilter 함수가 호출된다.', () => {
    const readBooksByFilterSpy = sandbox.spy(BookList.methods, "readBooksByFilter");
    const vm = mount(BookList);

    sinon.assert.calledOnce(readBooksByFilterSpy);

  })

  it('BookList 화면이 뜨면 readBooksByFilter의  firebasedao.readbooks가 호출된다.', () => {
    const FirebaseDaoStub = sandbox.spy(FirebaseDao.prototype, 'readBooks');

    const vm = mount(BookList);

    sinon.assert.calledOnce(FirebaseDaoStub);
  })


  it('보유 라디오 버튼을 클릭하면 보유중인 책 목록만 가져오는 함수가 호출된다', () => {
    const wrapper = shallow(BookList);

    // 전체를 클릭하면
    // getBookFiltered를 호출하고
    // this.tableData ???

   //const getBookFilteredStub = sandbox.stub();

    let result = [
      { no: 1, title: "자바의 정석", author: "20", publisher:"시나공", publishedDate:"2018", status:"신청중" },
      { no: 2, title: "자바의 정석", author: "20", publisher:"시나공", publishedDate:"2018", status:"신청중" },
      { no: 3, title: "자바의 정석", author: "20", publisher:"시나공", publishedDate:"2018", status:"신청중" }
    ];

    const callbackStub = sinon.stub();

    //Todo: calledOnce로 변경할 필요 있음.
    sandbox.stub(FirebaseDao.prototype, 'readBooks').callsFake((a,b,callback) => {
      callback(result);
    })

    //wrapper.setMethods({getBookFiltered: getBookFilter edStub})

    wrapper.find('input[value="전체"]').trigger('click')
    //expect(wrapper.vm.getBookFiltered.called).toBe(true)
    //expect(getBookFilteredStub.called).toBe(true)
    expect(wrapper.vm.tableData).toEqual(result);

  })

  //Todo: setTableData 함수도 테스트 추가 필요.

});
