<template>
  <div id="container">
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="As a student" name="student">
        <div v-if="courses.length">
          <el-col
              :span="7"
              :offset="1"
              v-for="course in courses"
              :key="course.courseId"
          >
            <CardView :course="course" :identity="activeName"/>
          </el-col>
        </div>
        <div v-else>
          <h2>
            You have no bookings. Try to book one in All Courses tab
          </h2>
          <el-link type="primary" @click="() => this.$router.push(`/allcourse`)">
              All courses
          </el-link>
        </div>
      </el-tab-pane>
      <el-tab-pane label="As a tutor" name="tutor">
        <div v-if="tutorCourses.length">
          <el-col
              :span="7"
              :offset="1"
              v-for="course in tutorCourses"
              :key="course.courseId"
          >
            <CardView :course="course" :identity="activeName"/>
          </el-col>
        </div>
        <div v-else>
          <h2>You haven't registered as a tutor for any courses now.</h2>
          <el-link type="primary" @click="() => this.$router.push(`/register`)"
          >Go register as a tutor
          </el-link
          >
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CardView from "../utils/CardView";

export default {
  name: "MyCourse",
  data() {
    return {
      activeName: "student",
      courses: [],
      tutorCourses: [],
    };
  },
  components: {
    CardView,
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios.get("http://localhost:8888/course/student/booked", {
        params: {
          sid: this.$store.getters.getUser.sid
        }
      }).then((res) => {
        this.courses = res.data
      }).catch((err) => {
        this.$message({
          message: `${err}`,
          type: "error"
        })
      })
      this.$axios.get("http://localhost:8888/course/tutor/booked", {
        params: {
          tutorId: this.$store.getters.getUser.sid
        }
      }).then((res) => {
        this.tutorCourses = res.data
      }).catch((err) => {
        this.$message({
          message: `${err}`,
          type: "error"
        })
      })
    }
  },
};
</script>

<style scoped>
#container {
  padding: 20px;
}

.el-col {
  margin-left: 30px;
  margin-bottom: 30px;
}
</style>