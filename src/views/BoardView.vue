<template>
    <div class="app-board-view">

        <Header
            @show-dialog="show('new task')"
            @filter-items="FilterItems"
        />
    
        <column-with-items 
            v-if="taskStatuses.length > 0"
            :items="todoTasks"
            @delete-task="deleteTask"
            @edit-item="editItem"
            headerTitle="TO-DO"
            :statuses="taskStatuses"
        
        />
        <column-with-items 
            v-if="taskStatuses.length > 0"
            :items="inprogressTasks"
            @delete-task="deleteTask"
            @edit-item="editItem"
            headerTitle="In progress"
            :statuses="taskStatuses"
        />
        <column-with-items
            v-if="taskStatuses.length > 0" 
            :items="completedTasks"
            @delete-task="deleteTask"
            @edit-item="editItem"
            headerTitle="DONE"
            :statuses="taskStatuses"
        />
        <ItemPopup
            v-if="showPopup"
            @close-dialog="close"
            @task-added="onTaskAdded"
            @task-updated="onTaskUpdated"
            :receivedData="itemId"
            :tasks="tasks"
            :popupTitle="popupTitle"
        />
    </div>
    
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import ColumnWithItems from '../components/ColumnWithItems.vue'
  import Header from '../components/Header.vue'
  import ItemPopup from '../components/ItemPopup.vue'
  
export default {
    components: {
      ColumnWithItems,
      Header,
      ItemPopup
    },
    data() {
      return {
        tasks: [], // Array to store fetched data
        loading: true, // Track loading state
        error: null, // Track any error that occurs
        todoTasks: [],
        completedTasks: [],
        inprogressTasks: [],
        showPopup: false,
        filteredTasks: [],
        itemId: null,
        popupTitle: '',
        taskStatuses: [],
      };
    },
    methods: {
        // Fetch tasks using axios
        async fetchTasks() {
            this.loading = true; // Set loading to true when the request starts
            try {
            const response = await axios.get('http://localhost:3000/tasks');
            this.tasks = response.data; // Set the tasks array with fetched data
            } catch (error) {
            console.error('Error fetching tasks:', error);
            this.error = 'There was an error fetching tasks.'; // Set error message
            } finally {
            this.loading = false; // Set loading to false after the request completes
            
            }
        },
        getFilteredItems() {
            this.todoTasks = this.tasks.filter(({ type_code }) => type_code === "todo");
            this.completedTasks = this.tasks.filter(({ type_code }) => type_code === "completed");
            this.inprogressTasks = this.tasks.filter(({ type_code }) => type_code === "inprogress");
            
        },
        FilterItems(text) {
  
            this.filteredTasks = this.tasks.filter(task => 
            task.title.toLowerCase().includes(text.toLowerCase()) ||
            task.body.toLowerCase().includes(text.toLowerCase())
            );
  
            this.todoTasks = this.filteredTasks.filter(({ type_code }) => type_code === "todo");
            this.completedTasks = this.filteredTasks.filter(({ type_code }) => type_code === "completed");
            this.inprogressTasks = this.filteredTasks.filter(({ type_code }) => type_code === "inprogress");
        },
        close() {
            this.showPopup = false;
            this.itemId = null;
        },
        show(title) {
            console.log('title', title)
            if(title == 'new task') {
                this.popupTitle = "Create new task" 
            } else {
                this.popupTitle = "Edit task"
            }
            this.showPopup = true;
        },
        onTaskAdded(newTask) {
            this.tasks.push(newTask);
            this.getFilteredItems();
            console.log("New task added:", newTask);
            this.itemId = null;
        },
        onTaskUpdated(newTask) {
            this.tasks = this.tasks.map((t) => t.id === newTask.id ? newTask : t);
            this.getFilteredItems();
            console.log("New task is updated:", newTask);
        },
      
        async deleteTask(taskId) {
            try {
            // Delete from server
            await axios.delete(`http://localhost:3000/tasks/${taskId}`);
    
            // Remove from local array
            this.tasks = this.tasks.filter((task) => task.id !== taskId);
            this.getFilteredItems();
    
            alert("Task deleted successfully!");
            } catch (error) {
            console.error("Error deleting task:", error);
            }
        },
        editItem(taskId) {
            console.log('taskId', taskId);
            this.showPopup = true;
            this.itemId = taskId;
        },
        async fetchStatuses() {
            try {
                const response = await axios.get("http://localhost:3000/task_types"); // Example URL
                this.taskStatuses = response.data; // Assign fetched statuses to the data property
            } catch (error) {
                console.error("Error fetching statuses:", error);
            }
        },
    }, 
    beforeMount() {
      this.fetchTasks().then(() => {
        this.getFilteredItems();
      });
      
    },
    mounted() {
        this.fetchStatuses();
    },
    created() {
    
    }
}
  </script>
  <style scoped>
  
  </style>
  