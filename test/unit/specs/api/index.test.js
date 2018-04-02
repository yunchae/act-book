import api from '../../../../src/api'
import sinon from 'sinon';
import axios from 'axios'

describe('Test Case Api call', ()=>{
    const sandbox = sinon.sandbox.create();
    const createStub = sandbox.spy(axios,'create');
    const getStub = sandbox.spy(axios,'get');

    beforeEach(()=> {

       // getStub.withArgs("https://act-books-api.zz.am/books?title=java").returns(Promise.resolve())

    })

    it('api.js 에서 get 을 제대로 호출하는지 테스트', (done)=>{

      api.searchBook('java')

      done();



    })
    afterEach(() => {
        sandbox.restore();
      })

  })
