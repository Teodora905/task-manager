<template>
    <div class="column">
      <div class="column-header">
          {{ $props.headerTitle }}
      </div>
      <template 
        v-for="item in items"
        :key="item.id"
      >
        
        <ItemComponent
          :item="item"
          @delete-task="onDeleteTask(item.id)"
          @edit-item="editItem(item.id)"
          :statuses="statuses"
          
        />
      </template>
      
    </div>
</template>

<script>
  import ItemComponent from './ItemComponent.vue';
  
  export default {
    name: 'ColumnWithItems',
    components: {
      ItemComponent
    },
    props: {
      items: {
        type: Array,
        required: false
      },
      headerTitle: {
        type: String,
        default: '',
      },
      statuses: {
        type: Array,
        default: [],
      },
    },
    methods: {
      onDeleteTask(taskId) {
        this.$emit("delete-task", taskId);
      },
      editItem(taskId) {
        this.$emit("edit-item", taskId);
      },
    },
    beforeMount() {
    },
  }
</script>



<style scoped lang="scss">
  .column {
    height: 100%;
    border-right: 1px dashed #EEEEEE;
  }

  .column:last-child {
    border-right: 0;
  }

  .column-header {
    text-align: center;;
  }
</style>
