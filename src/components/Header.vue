<template>
  <div class="header">
    <div 
      class="create-new-task"
      @click="$emit('show-dialog')"
    ></div>
    <template v-if="hasSearchField">
      <input 
        class="search-input"
        v-model="searchQuery" 
        type="text" 
        placeholder="Search tasks" 
        @input="filterTasks"
      />
    </template>
    <template v-if="hasFilters">
      <select
        class="search-input"
        id="status_type" 
        v-model="statusType"
        @change="filterTasksByFilter"
      >
          <option value="">All</option>
          <option value="todo">TO-DO</option>
          <option value="inprogress">In progress</option>
          <option value="completed">Completed</option>
      </select>
    </template>
  </div>
    
</template>

<script>
import { onBeforeMount } from 'vue';

  export default {
    name: 'Header',
    props: {
      hasSearchField: {
        type: Boolean,
        default: true
      },
      hasFilters: {
        type: Boolean,
        default: false
      },
      selectedFilters: {
        type: String,
        default: '',
      }
    },
    data() {
      return {
        searchQuery: "",
        statusType: "",
      }
    },
    computed() {
     
      
    },
    methods: {
      filterTasks() {
        this.$emit('filter-items', this.searchQuery);
        
      },
      filterTasksByFilter() {
        this.$emit('filter-items-filters', this.statusType);
        
      },
      
    },
    beforeMount() {
      if(this.$props.selectedFilters == 'undefined') {
        this.statusType = '';
      } else {
        this.statusType = this.$props.selectedFilters;
      }
      
    }
  }
</script>

<style scoped lang="scss">
  .header {
    grid-column: span 3;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 20px 10px;
  }

  .create-new-task:after {
    content: "+";
    font-size: 45px;
    display: flex;
    position: relative;
    top: -3px;
    color: #FFFFFF;
  }

  .create-new-task:hover:after {
    content: "New task";
    font-size: 11px;
  }

  .create-new-task {
    content: "+";
    width: 50px;
    height: 50px;
    background-color: green;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .create-new-task:hover {
    content: "Create a new task";
  }

  .search-input {
    height: 30px;
    width: 250px;
    margin-left: auto;
    border: 1px solid #ccc;
  }
</style>
