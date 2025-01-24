<template>
    <div class="popup">
      <div class="popup-content">
        <div> Title</div>
        <input
          id="taskName"
          type="text"
          v-model="taskName"
          required
          placeholder="Enter task name"
        ></input>
        <div>Description</div>
        <textarea
          id="taskDescription"
          type="text"
          v-model="taskDescription"
          required
        />
        <div>Status</div>
        <select
          id="type" 
          v-model="type" 
          required
        >
          <option value="todo">Not Started</option>
          <option value="inprogress">In progress</option>
          <option value="completed">Completed</option>
        </select>
        <div class="buttons-container">
          <div 
            class="button green"
            @click="addTask"
          
          >Save</div>
          <div 
            class="button black"
            @click="$emit('close-dialog')"
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: 'ItemPopup',
    props: {
      receivedData: {
        type: [String, Number],
        default: '',
      },
      tasks: {
        type: Array,
        default: [],
      },
      popupTitle: {
        type: String,
        default: 'Edit task'
      },
    },
    data() {
      return {
        taskName: "",
        taskDescription: "",
        type: "todo",
        taskId: "",
        task: {},
      };
    },
    methods: {
      closeDialog() {
        this.$emit('close', false);
      },
      async addTask() {
        if (this.taskName && !this.$props.receivedData) {
          const uniqueId = Date.now().toString();

          const newTask = {
            id: uniqueId,
            title: this.taskName,
            body: this.taskDescription,
            type_code: this.type,
          };

          try {
            await axios.post("http://localhost:3000/tasks", newTask);
            this.$emit("task-added", newTask);
            this.$emit('close-dialog');
            this.taskName = "";
            this.taskDescription = "";
            this.type = "todo";
            alert("Task added successfully!");
          } catch (error) {
            console.error("Error adding task:", error);
          }
        } else if (this.$props.receivedData) {
          this.updateTask();
        }
      },
      async updateTask() {
        const updatedTask = {
          id: this.task.id,
          title: this.taskName,
          body: this.taskDescription,
          type_code:this.type,
        };

        try {
          await axios.put(`http://localhost:3000/tasks/${this.task.id}`, updatedTask);

          this.$emit("task-updated", updatedTask);
          this.$emit('close-dialog');
          this.taskName = "";
          this.taskDescription = "";
          this.type = "todo";
        } catch (error) {
          console.error('Error updating task:', error);
        }
      },
    },
    beforeMount() {
      this.task = {};
      if (this.$props.receivedData) {
        this.task = this.$props.tasks.find(task => task.id === this.$props.receivedData);
        this.taskName = this.task.title;
        this.taskDescription = this.task.body;
        this.type = this.task.type_code;
      }
      
    }
  }
  
</script>

<style scoped lang="scss">
  .popup {
    width: 100%;
    height: 100vh;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  .popup-content {
    width: 500px;
    height: 500px;
    background-color: #FFF;
    display: flex;
    flex-direction: column;
    padding: 20px;
    z-index: 1001;
  }
  .title {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .button {
    width: 70px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 10px;
    color: #FFFFFF;
    border-radius: 10px;
    cursor: pointer;
  }

  .green {
    background-color: green;
  }

  .black {
    background-color: black;
  }

  .buttons-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }


</style>
