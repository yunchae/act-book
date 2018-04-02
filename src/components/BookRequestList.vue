<template>

  <div id="bookList">

    <div class="btn-group" style="margin-bottom: 10px">
      <div class="col-lg-6" style="float: right; padding-right: 0px">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Search" id="txtSearch" v-model="keyword" @keyup.enter="readBooksByFilter"/>
          <div class="input-group-btn">
            <button class="btn btn-primary" type="submit" @click="readBooksByFilter">
              <span class="glyphicon glyphicon-search"></span>
            </button>
          </div>
        </div>
      </div>
      <!--</div>-->
    </div>

    <v-client-table :data="tableData" :columns="columns" :options="options" >
      <div slot="title" slot-scope="props" style="text-align:left;">
          <a v-bind:href="props.row.link"  target="_blank" v-html="props.row.title">
          </a>
      </div>

      <div slot="createdDate" slot-scope="props">{{ props.row.createdDate.substring(0,10)}}</div>

      <div slot="status" slot-scope="props">
        <select  v-model="props.row.status" @change="statusChanged(props.row.no, props.row.isbn, $event)">
          <option>신청중</option>
          <option>보유</option>
          <option>취소</option>
        </select>
      </div>
    </v-client-table>


    <div class="table-responsive">
      <table class="col-sm-12 table-bordered table-striped table-condensed cf">
        <thead class="cf">
        <tr>
          <th>      </th>
          <th>Monday</th>
          <th>Tuesday</th>
          <th>Wednesday</th>
          <th>Thursday</th>
          <th>Friday</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td data-title="      ">07:45 |1| 08:35</td>
          <td data-title="Monday">Lesson</td>
          <td data-title="Tuesday">Lesson</td>
          <td data-title="Wednesday">Lesson</td>
          <td data-title="Thursday">Lesson</td>
          <td data-title="Friday">Lesson</td>
        </tr>
        <tr>
          <td data-title="      ">08:35 |2| 09:25</td>
          <td data-title="Monday">Lesson</td>
          <td data-title="Tuesday">Lesson</td>
          <td data-title="Wednesday">Lesson</td>
          <td data-title="Thursday">Lesson</td>
          <td data-title="Friday">Lesson</td>
        </tr>
        <tr>
          <td data-title="      ">09:30 |3| 10:20</td>
          <td data-title="Monday">Lesson</td>
          <td data-title="Tuesday">Lesson</td>
          <td data-title="Wednesday">Lesson</td>
          <td data-title="Thursday">Lesson</td>
          <td data-title="Friday">Lesson</td>
        </tr>
        <tr>
          <td data-title="      ">10:35 |4| 11:25</td>
          <td data-title="Monday">Lesson</td>
          <td data-title="Tuesday">Lesson</td>
          <td data-title="Wednesday">Lesson</td>
          <td data-title="Thursday">Lesson</td>

          <td data-title="Friday">Lesson</td>
        </tr>
        <tr>
          <td data-title="      ">11:30 |5| 12:20</td>
          <td data-title="Monday">Lesson</td>
          <td data-title="Tuesday">Lesson</td>
          <td data-title="Wednesday">Lesson</td>
          <td data-title="Thursday">Lesson</td>
          <td data-title="Friday">Lesson</td>
        </tr>
        <tr>
          <td data-title="      ">12:20 |6| 13:10</td>
          <td data-title="Monday">Lesson</td>
          <td data-title="Tuesday">Lesson</td>
          <td data-title="Wednesday">Lesson</td>
          <td data-title="Thursday">Lesson</td>
          <td data-title="Friday">Lesson</td>
        </tr>
        <tr>
          <td data-title="      ">13:10 |7| 14:00</td>
          <td data-title="Monday">Lesson</td>
          <td data-title="Tuesday">Lesson</td>
          <td data-title="Wednesday">Lesson</td>
          <td data-title="Thursday">Lesson</td>
          <td data-title="Friday">Lesson</td>
        </tr>
        <tr>
          <td data-title="      ">14:00 |8| 14:50</td>
          <td data-title="Monday">Lesson</td>
          <td data-title="Tuesday">Lesson</td>
          <td data-title="Wednesday">Lesson</td>
          <td data-title="Thursday">Lesson</td>
          <td data-title="Friday">Lesson</td>
        </tr>
        <tr>
          <td data-title="      ">15:00 |9| 15:50</td>
          <td data-title="Monday">Lesson</td>
          <td data-title="Tuesday">Lesson</td>
          <td data-title="Wednesday">Lesson</td>
          <td data-title="Thursday">Lesson</td>
          <td data-title="Friday">Lesson</td>
        </tr>
        <tr>
          <td data-title="      ">15:55 |10| 16:45	</td>
          <td data-title="Monday">Lesson</td>
          <td data-title="Tuesday">Lesson</td>
          <td data-title="Wednesday">Lesson</td>
          <td data-title="Thursday">Lesson</td>
          <td data-title="Friday">Lesson</td>
        </tr>
        <tr>
          <td data-title="      ">16:50 |11| 17:40	</td>
          <td data-title="Monday">Lesson</td>
          <td data-title="Tuesday">Lesson</td>
          <td data-title="Wednesday">Lesson</td>
          <td data-title="Thursday">Lesson</td>
          <td data-title="Friday">Lesson</td>
        </tr>
        <tr>
          <td data-title="      ">17:40 |12| 18:30	</td>
          <td data-title="Monday">Lesson</td>
          <td data-title="Tuesday">Lesson</td>
          <td data-title="Wednesday">Lesson</td>
          <td data-title="Thursday">Lesson</td>
          <td data-title="Friday">Lesson</td>
        </tr>
        <tr>
          <td data-title="      ">18:55 |13| 19:40	</td>
          <td data-title="Monday">Lesson</td>
          <td data-title="Tuesday">Lesson</td>
          <td data-title="Wednesday">Lesson</td>
          <td data-title="Thursday">Lesson</td>
          <td data-title="Friday">Lesson</td>
        </tr>
        <tr>
          <td data-title="      ">19:40 |14| 20:25	</td>
          <td data-title="Monday">Lesson</td>
          <td data-title="Tuesday">Lesson</td>
          <td data-title="Wednesday">Lesson</td>
          <td data-title="Thursday">Lesson</td>
          <td data-title="Friday">Lesson</td>
        </tr>
        <tr>
          <td data-title="      ">20:30 |15| 21:15	</td>
          <td data-title="Monday">Lesson</td>
          <td data-title="Tuesday">Lesson</td>
          <td data-title="Wednesday">Lesson</td>
          <td data-title="Thursday">Lesson</td>
          <td data-title="Friday">Lesson</td>
        </tr>
        <tr>
          <td data-title="      ">21:15 |16| 22:00	</td>
          <td data-title="Monday">Lesson</td>
          <td data-title="Tuesday">Lesson</td>
          <td data-title="Wednesday">Lesson</td>
          <td data-title="Thursday">Lesson</td>
          <td data-title="Friday">Lesson</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import FirebaseDao from '../utils/FirebaseDao'
  const fb = new FirebaseDao();
  export default {
    name: 'BookRequestList',
    data: function () {
      return {
        keyword: '',
        tableData: [],
        columns: ['no', 'title', 'author', 'publisher', 'publishedDate', 'createdDate','status'],
        options: {
          headings: {
            no: 'No.',
            title: "제목",
            author: "저자",
            publisher: "출판사",
            publishedDate: "출판일",
            createdDate: "신청일",
            status: "상태"
          },
          sortable: ['title', 'publishedDate', 'status'],
          filterable: false, // 필터 사용 여부 또는 필터 적용할 컬럼 설정
          perPage: 10, // 한페이지에 보여줄 리스트 개수 (초기값)
          perPageValues: [10, 20, 30, 40, 50], // 한페이지에 보여줄 리스트 개수를 설정하는 값 리스트
        }
      }
    },
    created: function () {
      this.readBooksByFilter();
    },
    methods: {
      statusChanged: function(rowNo, isbn, e){
        let selectedStatus = e.target.value;
        fb.updateBook(isbn, selectedStatus);
        this.tableData[rowNo-1].status = selectedStatus;
      },
      readBooksByFilter: function(){
        console.log('keyword: ',this.keyword);
        fb.readAllRequestedBooks(this.keyword, this.setTableData);
      },
      setTableData: function(value){
        this.tableData = value;
      }

    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  @media only screen and (max-width: 800px) {
    /* Force table to not be like tables anymore */
    .table-responsive table,
    .table-responsive thead,
    .table-responsive tbody,
    .table-responsive th,
    .table-responsive td,
    .table-responsive tr {
      display: block;
    }

    /* Hide table headers (but not display: none;, for accessibility) */
    .table-responsive thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }

    .table-responsive tr { border: 1px solid #ccc; }

    .table-responsive td {
      /* Behave like a "row" */
      border: none;
      border-bottom: 1px solid #eee;
      position: relative;
      padding-left: 50%;
      white-space: normal;
      text-align:left;
    }

    .table-responsive td:before {
      /* Now like a table header */
      position: absolute;
      /* Top/left values mimic padding */
      top: 6px;
      left: 6px;
      width: 45%;
      padding-right: 10px;
      white-space: nowrap;
      text-align:left;
      font-weight: bold;
    }

    /*
    Label the data
    */
    .table-responsive td:before { content: attr(data-title); }
  }
</style>
