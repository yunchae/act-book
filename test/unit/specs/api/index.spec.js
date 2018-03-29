import api from '../../../../src/api'
import sinon from 'sinon';
import axios from 'axios'

describe('Test Case Api call', ()=>{

  it('api.js 에서 get 을 제대로 호출하는지 테스트', async()=>{

    sinon.spy(axios, 'get');
    api.searchBook('java');

    expect(axios.get.withArgs('https://act-books-api.zz.am/books?title=java').calledOnce).toBe(true);

    axios.get.restore();
  })
})

