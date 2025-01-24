<template>
    <div class="app-list-view">
        <Header
            @show-dialog="show"
            @filter-items-filters="handleFilterChange"
            :hasSearchField="false"
            :hasFilters="true"
            :selectedFilters="selectedFilters"
        />
        <column-with-items
            v-if="taskStatuses.length > 0" 
            :items="filteredTasks"
            @delete-task="deleteTask"
            @edit-item="editItem"
            :statuses="taskStatuses"
        />
        <ItemPopup
            v-if="showPopup"
            @close-dialog="close"
            @task-added="onTaskAdded"
            @task-updated="onTaskUpdated"
            :receivedData="itemId"
            :tasks="tasks"
        />
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import ColumnWithItems from '../components/ColumnWithItems.vue'
  import Header from '../components/Header.vue'
  import ItemPopup from '../components/ItemPopup.vue'

  export default {
    name: 'ListView',
    components: {
      ColumnWithItems,
      Header,
      ItemPopup
    },
    data() {
      return {
        tasks: [],
        loading: true, 
        error: null,
        showPopup: false,
        filteredTasks: JSON.parse(localStorage.getItem("filteredTasks")) || [],
        itemId: null,
        taskStatuses: [],
        selectedFilters: localStorage.getItem("listViewFilters") || "",
      };
    },
    methods: {
        async fetchTasks() {
            try {
                const response = await axios.get('http://localhost:3000/tasks');
                this.tasks = response.data; 
                // Apply filters after loading tasks
                this.applyFilters(); 
            } catch (error) {
                console.error('Error fetching tasks:', error);
                this.error = 'There was an error fetching tasks.'; 
            } finally {
                this.loading = false;
            }
        },
        close() {
            this.showPopup = false;
            this.itemId = null;
        },
        show() {
            this.showPopup = true;
        },
        onTaskAdded(newTask) {
            this.tasks.push(newTask);
            console.log("New task added:", newTask);
            // Reapply filters after adding a task
            this.applyFilters(); 
            this.itemId = null;
        },
        onTaskUpdated(newTask) {
            this.tasks = this.tasks.map((t) => t.id === newTask.id ? newTask : t);
            // Reapply filters after updating a task
            this.applyFilters(); 
            console.log("New task is updated:", newTask);
        },

        async deleteTask(taskId) {
            try {
                // Delete from server
                await axios.delete(`http://localhost:3000/tasks/${taskId}`);

                // Remove from local array
                this.tasks = this.tasks.filter((task) => task.id !== taskId);
                // Reapply filters after deleting a task
                this.applyFilters(); 

                alert("Task deleted successfully!");
            } catch (error) {
                console.error("Error deleting task:", error);
            }
        },
        editItem(taskId) {
            this.showPopup = true;
            this.itemId = taskId;
        },
        async fetchStatuses() {
            try {
                const response = await axios.get("http://localhost:3000/task_types"); 
                this.taskStatuses = response.data;
            } catch (error) {
                console.error("Error fetching statuses:", error);
            }
        },

        handleFilterChange(selectedFilter) {
            // Update the selected filter
            this.selectedFilters = selectedFilter; 
            // Save to localStorage
            localStorage.setItem("listViewFilters", selectedFilter); 
            // Apply the new filter
            this.applyFilters(); 
        },
        applyFilters() {
            // Apply the filter to the tasks
            if (!this.selectedFilters) {
                // Show all tasks if no filter is applied
                this.filteredTasks = this.tasks; 
            } else {
                this.filteredTasks = this.tasks.filter(
                (task) => task.type_code.toLowerCase() === this.selectedFilters
                );
            }
            // Save filtered tasks to localStorage
            localStorage.setItem("filteredTasks", JSON.stringify(this.filteredTasks));
        },
    },
    beforeMount() {
        this.fetchTasks(); 
    },
    mounted() {
        
        this.fetchStatuses();
    },
  };
  </script>