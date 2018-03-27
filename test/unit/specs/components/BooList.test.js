import sinon from 'sinon'
import BookList from '../../../../src/components/BookList.vue'
import FirebaseDao from '../../../../src/utils/FirebaseDao'
import {shallow} from 'vue-test-utils';

describe('BooList test', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();

  });

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

    sandbox.stub(FirebaseDao.prototype, 'readBooks').callsFake((callback) => {

      callback(result);
    });

    // callback 함수가 this.tableData에 값을 넣어주기
    const wrapper = shallow(BookList);

    expect(wrapper.vm.tableData).toEqual(result);


  })

});
