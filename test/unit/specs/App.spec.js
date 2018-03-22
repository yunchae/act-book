import App from '../../../src/App.vue'
import {mount, shallow} from 'vue-test-utils'

// const createAppMount = mount(App);
// const createAppShallow = shallow(App);

describe('Test Case App Vue', () => {
  it('App vue 객체가 있는지 확인한다', () => {
    expect(shallow(App).isVueInstance()).toBe(true);

    // const Constructor = Vue.extend(HelloWorld)
    // const vm = new Constructor().$mount()
    // expect(vm.$el.querySelector('.hello h1').textContent)
    //   .toEqual('Welcome to Your Vue.js App')
  })

  it('목록조회 버튼 클릭시 selectNav가 호출 되는지 확인한다.', () => {

    const wrapper = shallow(App); // shallow 컴포너트를 생성한다

    const stub = jest.fn(); // jest mock function을 생성한다

    wrapper.setMethods({selectNav : stub}); //wrapper 컴포넌트의 selectNav 함수를 stub으로 업데이트한다
    wrapper.find('#btnBookList').trigger('click'); //btnBookList id를 가진 엘리먼트를 찾아 클릭 이벤트를 실행한다

    expect(stub).toBeCalled(); //selectNav를 호출하고 업데이트된 stub이 실행된다. stub이 실제로 호출된 셈

  })

  it('도서신청 버튼 클릭시 selectNav가 호출 되는지 확인한다.', () => {

    const wrapper = shallow(App)

    const stub = jest.fn();

    wrapper.setMethods({selectNav : stub});
    wrapper.find('#btnBookRequest').trigger('click');

    expect(stub).toBeCalled();
  })

  it('selectNav method를 호출 시 해당 url path에 해당하는 변수 셋팅이 되는지 확인한다.', () => {
    //1. route path가 들어간 이벤트 객체를 만듦
    const e = { target : {
      pathname : '/bookrequest'
    }};

    //2. Wrapper를 생성하고
    const wrapper = shallow(App)

    //3. selectNav 메서드를 호출 && 템플릿 부분 rerendering
    wrapper.vm.selectNav(e)
    wrapper.update();

    //4. selectNav 를 실행시 해당 element의 클래스 값이 active로 바뀌었는지 확인
    expect(wrapper.find('#btnBookRequest').attributes().class).toBe('active')
  })
})
