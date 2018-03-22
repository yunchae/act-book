import {mount, shallow} from 'vue-test-utils'
import BookList from '../../../../src/components/BookList'

describe('BookList 기능 테스트', () => {
  it('BookList 객체가 있는지 확인한다', () => {
    expect(shallow(BookList).isVueInstance()).toBe(true);
  })

})
