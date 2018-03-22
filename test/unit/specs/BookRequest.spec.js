jest.mock('axios',()=>({
  get: jest.fn()
}))

import {mount, shallow} from 'vue-test-utils'
import axios from 'axios'
import BookRequest from '../../../src/components/BookRequest.vue'


describe('Test Case BookRequest Vue', ()=>{
  it('Text Input에 검색어를 입력하고 버튼을 클릭했을 때 검색어를 이용해 axios를 호출하는지 확인', ()=>{
    const wrapper = shallow(BookRequest)

    wrapper.vm.searchBookList('java')
    expect(axio.get).toBeCalledWith('https://openapi.naver.com/v1/search/book.json?d_titl=java')


  })

  it('axios 결과 값에 제목, 저자, 출판사 ISBN 항목이 포함돼 있는지 확인', ()=>{

  })

  it('그리드에 axios 결과값이 바인딩돼 있는지 확인', ()=>{

  })

})

