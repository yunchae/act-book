import BookRequestList from '../../../../src/components/BookRequestList';
import * as sinon from "sinon";
import {shallow} from 'vue-test-utils';
import FirebaseDao from '../../../../src/utils/FirebaseDao'

describe("BookRequestList", ()=> {

  let sandbox ;

  beforeEach(()=>{
    sandbox = sinon.sandbox.create();

  })

  afterEach(()=>{
    sandbox.restore();

  })

  it('컴포넌트가 처믕 생성될 때, 테이블 데이터 호출', ()=> {

    let readAllRequestedBooksStub = sandbox.stub(FirebaseDao.prototype, "readAllBooksBy")
    let result = [];
    readAllRequestedBooksStub.callsFake((callback) => {
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

  it('보유 라디오 버튼을 클릭하면 보유중인 책 목록만 가져오는 함수가 호출된다', () => {

    let result = [
      { no: 1, title: "자바의 정석", author: "20", publisher:"시나공", publishedDate:"2018-01-01", createdDate:"2018-01-01",applier:"hannic",status:"보유" },
      { no: 2, title: "자바의 정석", author: "20", publisher:"시나공", publishedDate:"2018-01-01", createdDate:"2018-01-01",applier:"hannic",status:"보유" },
      { no: 3, title: "자바의 정석", author: "20", publisher:"시나공", publishedDate:"2018-01-01", createdDate:"2018-01-01",applier:"hannic",status:"보유" }
    ];

    let readAllBooksBy = sandbox.stub(FirebaseDao.prototype, "readAllBooksBy")

    readAllBooksBy.callsFake((callback)=> {
      callback(result)
    })

    let fireStore = new FirebaseDao()
    const wrapper = shallow(BookRequestList,{
      mocks: {
        fireStore
      }
    });

    wrapper.find('input[value="전체"]').trigger('click')
    expect(wrapper.vm.tableData).toEqual(result);

  })



})
