import {shallow, mount} from 'vue-test-utils'
import BookRequestList from '../../../../src/components/BookRequestList'
import sinon from 'sinon'
import FirebaseDao from '../../../../src/utils/FirebaseDao'


describe('Test Case BookRequestList Vue', () =>{
  let sandBox

  beforeEach( ()=>{
    sandBox = sinon.sandbox.create();
  })

  afterEach( ()=>{
    sandBox.restore()
  })

  it('신청내역 화면이 생성되면 현재까지 신청된 도서 목록을 DB에서 내용을 조회해 온다.', () =>{
    const testTableData = [
      {author:"윤성우",createdDate:"2018-04-28T01:10:04.318Z",image:"http://bookthumb.phinf.naver.net/cover/122/362/12236206.jpg?type=m1&udate=20171016",isbn:"8996094071 9788996094074",link:"http://book.naver.com/bookdb/book_detail.php?bid=12236206",no:1,publishedDate:"2017-07-05",publisher:"오렌지1",status:"신청중",title:"윤성우의 Java 프로그래밍",updatedDate:"2018-03-29T08:40:11.940Z"},
      {author:"황기태",createdDate:"2018-05-28T01:10:04.318Z",image:"http://bookthumb.phinf.naver.net/cover/122/362/12236206.jpg?type=m1&udate=20171016",isbn:"8996094072 9788996094074",link:"http://book.naver.com/bookdb/book_detail.php?bid=12236206",no:1,publishedDate:"2017-07-05",publisher:"미디어",status:"보유",title:"윤성우의 열혈 프로그래밍",updatedDate:"2018-03-29T08:40:11.940Z"},
      {author:"남궁성",createdDate:"2018-06-28T01:10:04.318Z",image:"http://bookthumb.phinf.naver.net/cover/122/362/12236206.jpg?type=m1&udate=20171016",isbn:"8996094073 9788996094074",link:"http://book.naver.com/bookdb/book_detail.php?bid=12236206",no:1,publishedDate:"2017-07-05",publisher:"미디어",status:"취소",title: "열혈 Java 프로그래밍",updatedDate:"2018-03-29T08:40:11.940Z"}
    ]

    sandBox.stub(FirebaseDao.prototype, 'readAllRequestedBooks').callsFake((a, callback)=>{
      return callback(testTableData)
    })

    const wrapper = shallow(BookRequestList)

    expect(wrapper.vm.tableData).toEqual(testTableData)
  })


  it('검색어를 입력하고 검색버튼을 클릭하면 검색어를 이용해 리스트를 조회한다.', () =>{
    const testTableData = [
      {author:"윤성우",createdDate:"2018-04-28T01:10:04.318Z",image:"http://bookthumb.phinf.naver.net/cover/122/362/12236206.jpg?type=m1&udate=20171016",isbn:"8996094071 9788996094074",link:"http://book.naver.com/bookdb/book_detail.php?bid=12236206",no:1,publishedDate:"2017-07-05",publisher:"오렌지1",status:"신청중",title:"윤성우의 Java 프로그래밍",updatedDate:"2018-03-29T08:40:11.940Z"},
      {author:"황기태",createdDate:"2018-05-28T01:10:04.318Z",image:"http://bookthumb.phinf.naver.net/cover/122/362/12236206.jpg?type=m1&udate=20171016",isbn:"8996094072 9788996094074",link:"http://book.naver.com/bookdb/book_detail.php?bid=12236206",no:1,publishedDate:"2017-07-05",publisher:"미디어",status:"보유",title:"윤성우의 열혈 프로그래밍",updatedDate:"2018-03-29T08:40:11.940Z"},
      {author:"남궁성",createdDate:"2018-06-28T01:10:04.318Z",image:"http://bookthumb.phinf.naver.net/cover/122/362/12236206.jpg?type=m1&udate=20171016",isbn:"8996094073 9788996094074",link:"http://book.naver.com/bookdb/book_detail.php?bid=12236206",no:1,publishedDate:"2017-07-05",publisher:"미디어",status:"취소",title: "열혈 Java 프로그래밍",updatedDate:"2018-03-29T08:40:11.940Z"}
    ]

    sandBox.stub(FirebaseDao.prototype, 'readAllRequestedBooks').callsFake((a, callback)=>{
      return callback(testTableData)
    })

    const wrapper  = shallow(BookRequestList)

    const btn = wrapper.find('#btnGetList')

    btn.trigger('click')


    expect(wrapper.vm.tableData).toEqual(testTableData)
  })

  it('상태 콤보박스에서 상태를 바꾸면 상태가 업데이트 된다.', ()=>{
    const testTableData = [
      {author:"윤성우",createdDate:"2018-04-28T01:10:04.318Z",image:"http://bookthumb.phinf.naver.net/cover/122/362/12236206.jpg?type=m1&udate=20171016",isbn:"8996094071 9788996094074",link:"http://book.naver.com/bookdb/book_detail.php?bid=12236206",no:1,publishedDate:"2017-07-05",publisher:"오렌지1",status:"신청중",title:"윤성우의 Java 프로그래밍",updatedDate:"2018-03-29T08:40:11.940Z"},
      {author:"황기태",createdDate:"2018-05-28T01:10:04.318Z",image:"http://bookthumb.phinf.naver.net/cover/122/362/12236206.jpg?type=m1&udate=20171016",isbn:"8996094072 9788996094074",link:"http://book.naver.com/bookdb/book_detail.php?bid=12236206",no:1,publishedDate:"2017-07-05",publisher:"미디어",status:"보유",title:"윤성우의 열혈 프로그래밍",updatedDate:"2018-03-29T08:40:11.940Z"},
      {author:"남궁성",createdDate:"2018-06-28T01:10:04.318Z",image:"http://bookthumb.phinf.naver.net/cover/122/362/12236206.jpg?type=m1&udate=20171016",isbn:"8996094073 9788996094074",link:"http://book.naver.com/bookdb/book_detail.php?bid=12236206",no:1,publishedDate:"2017-07-05",publisher:"미디어",status:"취소",title: "열혈 Java 프로그래밍",updatedDate:"2018-03-29T08:40:11.940Z"}
    ]

    const spyUpdateBoook = sinon.spy(FirebaseDao.prototype, 'updateBook')

    const wrapper = shallow(BookRequestList)

    const event = {
      target: {
        value: '보유'
      }
    }

    wrapper.vm.statusChanged(testTableData[2].isbn, event)

    sinon.assert.calledOnce(spyUpdateBoook)

  })

  it('검색어 인풋 박스에서 검색어를 입력하고 엔터키를 누르면 검색 서비스를 호출한다.', ()=>{
    const spyReadAllRequestedBooks = sinon.spy(FirebaseDao.prototype, 'readAllRequestedBooks')

    const wrapper = mount(BookRequestList)
    const inputTextSearch = wrapper.find('#txtSearch')

    inputTextSearch.trigger('keyup', {key: 'Enter'})

    sinon.assert.callCount(spyReadAllRequestedBooks, 2)
  })

})
