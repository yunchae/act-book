import App from '../../../src/App.vue'

import {mount, shallow} from 'vue-test-utils'

// const createAppMount = mount(App);
// const createAppShallow = shallow(App);

describe('Test Case App Vue', () => {


  it('bookRequest 버튼 클릭시 해당 엘리먼트의 클래스 속성값이 active가 되는지 확인한다.', () => {
    //1.button 객체를 생성한다.
    const button = shallow(App).find('#btnBookRequest');

    //2. 버튼의 pathname 속성 값을 넣어준다.
    button.element.pathname = '/bookrequest';

    //3. 버튼의 클릭이벤트를 발생한다.
    button.trigger('click');

    //4. 버튼의 속성값 class 값을 확인한다.
    expect(button.attributes().class).toBe('active')
  })

})
