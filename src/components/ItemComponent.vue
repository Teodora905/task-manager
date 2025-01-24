<template>
    <div 
      class="item"
      :class="`item-type-${$props.item.type_code}`"
    >
      <div class="item-title">{{ $props.item.title }}</div>
      <div class="item-description">{{ $props.item.body }}</div>
      <div class="item-status">{{ taskStatusLabel.label }}</div>
      <div class="action-items">
        <div 
          class="button green"
          @click="editItem($props.item.id)"
        >Edit
        </div>
        <div 
          class="button black"
          @click="deleteTask($props.item.id)"
        >Delete</div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'ItemComponent',
    props: {
      itemTitle: {
        type: String,
        required: false,
      },
      itemDescription: {
        type: String,
      },
      itemStatus: {
        type: String,
      },
      item: {
        type: Object,
        required: false,
      },
      statuses: {
        type: Array,
        default: [],
      },
    },
    data() {
      return {
        taskStatusLabel: '',
      }
    },
    methods: {
      deleteTask(taskId) {
        this.$emit("delete-task", taskId)
      },
      editItem(taskId) {
        this.$emit("edit-item", taskId)
      },
      getStatusLabel() {
        this.taskStatusLabel = this.statuses.find(status => status.code === this.$props.item.type_code);
      }
    },
    beforeMount() {

    },
    created() {
      this.getStatusLabel();
    },
  }
</script>



<style scoped lang="scss">
  .item {
    min-height: 100px;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
  }

  .item-type-todo {
    background-color: rgba(238, 238, 238, 0.5);
  }

  .item-type-inprogress {
    background-color: rgba(206,234,214, 0.5);
  }

  .item-type-completed {
    background-color: rgba(204,204,204, 0.5);;
  }

  .action-items {
    display: flex;
    justify-content: flex-end;
  }

  .button {
    width: 40px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 5px;
    color: #FFFFFF;
    border-radius: 10px;
    cursor: pointer;
    font-size: 10px;
  }

  .green {
    background-color: green;
  }

  .black {
    background-color: black;
  }
  .item-title {
    font-size: 20px;
    font-weight: 700;;
  }
  .item-status {
    font-size: 12px;
  }
</style>
