<template>
    <div class="container">
       <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Responsive Hover Table</h3>

                <div class="card-tools">
                 <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                     Add user
                </button>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in users.data" :key="user.id">
                      <td>{{user.id}}</td>
                      <td>{{user.name}}</td>
                      <td>{{user.email}}</td>
                      <td><span class="tag tag-success">Approved</span></td>
                      <td>
                          <a href="" class="btn btn-success" >
                              <i class="fa fa-edit blue"> </i>
                          </a>
                           <a href="" class="ml-3 btn btn-danger" @click.prevent="deleteU(user.id)" >
                              <i class="fa fa-trash rod"> </i>
                          </a>

                      </td>
                    </tr>
                  </tbody>


                </table>

              </div>
              <!-- /.card-body -->
              <div class="card-footer">
                  <div class="d-flex justify-content-center">
                    <pagination :data="users" @pagination-change-page="loadUser" ></pagination>
                </div>
              </div>
            </div>
            <!-- /.card -->
          </div>
        </div>
        <!-- Button trigger modal -->


<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">

        <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
       <form action="" method="" @submit.prevent="login()">
            <div class="modal-body">
                <div class="card">
                    <div class="card-header"><h5>Add new User</h5></div>
                    <div class="card-body">
                    <div class="form-group">
                            <input v-model="form.name" type="text" class="form-control" placeholder="name">
                            <div v-if="form.errors.has('name')" v-html="form.errors.get('name')" />
                    </div>
                    <div class="form-group">
                            <input v-model="form.email" type="text" class="form-control" placeholder="email">
                            <div v-if="form.errors.has('email')" v-html="form.errors.get('email')" />
                    </div>
                    <div class="form-group">
                            <input v-model="form.password" type="text" class="form-control" placeholder="password">
                            <div v-if="form.errors.has('password')" v-html="form.errors.get('password')" />
                    </div>
                    <div class="form-group">
                            <input v-model="form.password_confirmation" type="text" class="form-control" placeholder="password_confirmation">
                            <div v-if="form.errors.has('password_confirmation')" v-html="form.errors.get('password_confirmation')" />
                    </div>

                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                <button type="Submit" class="btn btn-primary">Add user</button>
            </div>
            </form>

    </div>

  </div>
</div>
    </div>
</template>

<script>import axios from "axios";


    export default {
        data(){
         return  { form: new Form({
                name: '',
                email:'',
                password: '',
                password_confirmation: '',
                }),
                 users :{}
                }

        },

        methods:{
            deleteU(id){
Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {
  if (result.isConfirmed) {
   this.form.delete('api/user/'+id).then(response =>{
 Swal.fire(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    )
                         })
  }
})








            },

         async login () {
               await this.form.post('api/user');
              await $('#exampleModal').modal('hide')
                    this.$toast.success({
                        title:'Creation Complete',
                        message:'User create Successfully'
                    })
                },
            // loadUser(){
             //   axios.head('api/user').then(response=>{
              //      this.users=response.data;
               // })
           // },
            loadUser(page){
                if (typeof page === "undefined") {
                  page = 1;
             }
                axios.get('/api/user?page='+ page).then(response=>{
                    this.users=response.data;
                })
            },

            //getResults(page) {
               // if (typeof page === "undefined") {
              ///  page = 1;
              ///   }
           //  this.axios
            //.get("http://localhost:8000/api/Company?page=" + page)
           /// .then(response => {
           // this.company_name = response.data;
           /// console.log(company_name);
       //});
   // }
        },
        created() {
            this.loadUser();
           setInterval(()=> this.loadUser(),5000)
        },
    }
</script>
