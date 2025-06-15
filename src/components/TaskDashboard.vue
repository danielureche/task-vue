<!--
  TaskDashboard.vue

  Description:
  This is the main dashboard component of the task management system.
  It displays statistics about tasks, lists tasks by status, and provides
  modals for adding, editing, and deleting tasks.

  Features:
  - Shows total, completed, pending, and progress percentage of tasks.
  - Fetches task data from TaskService on mount.
  - Supports toggling task completion status.
  - Allows creation, editing, and deletion of tasks using modal dialogs.
  - Uses i18n for all text content.
  - Displays toast notifications for success/error feedback using vue-sonner.

  Components:
  - StatsCard: Displays task statistics (total, completed, pending, progress).
  - TaskSection: Renders the task list and triggers actions (edit, delete, toggle).
  - TaskModal: Modal used to add or edit a task.
  - DeleteConfirmationModal: Modal to confirm task deletion.

  Emits:
  - toggle-task (via TaskSection)
  - add-task (via TaskSection)
  - edit-task (via TaskSection)
  - delete-task (via TaskSection)

-->

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <!-- Statistics Summary Cards -->
      <StatsCard
        :title="$t('stats_card.total')"
        :value="totalTasks"
        icon="clipboard-document-list"
        color="blue"
      />
      <StatsCard
        :title="$t('stats_card.completed')"
        :value="completedTasks"
        icon="check-icon"
        color="green"
      />
      <StatsCard
        :title="$t('stats_card.pending')"
        :value="pendingTasks"
        icon="clock-icon"
        color="yellow"
      />
      <StatsCard
        :title="$t('stats_card.progress')"
        :value="`${progressPercentage}%`"
        icon="chart-pie"
        color="purple"
      />
    </div>

    <!-- Task List Section -->
    <TaskSection
      :tasks="myTasks"
      :is-loading="isLoading"
      @toggle-task="toggleTask"
      @add-task="openAddTaskModal"
      @edit-task="openEditTaskModal"
      @delete-task="openDeleteConfirmation"
    />

    <!-- Task Creation/Edition Modal -->
    <TaskModal
      v-if="showTaskModal"
      :task="selectedTask"
      @close="closeTaskModal"
      @add-task="addTask"
      @update-task="updateTask"
    />

    <!-- Task Deletion Confirmation Modal -->
    <DeleteConfirmationModal
      v-if="showDeleteModal"
      :task="taskToDelete"
      @cancel="closeDeleteModal"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script>
import StatsCard from "@/components/ui/StatsCard.vue";
import TaskSection from "@/components/tasks/TaskSection.vue";
import TaskModal from "@/components/tasks/TaskModal.vue";
import DeleteConfirmationModal from "@/components/tasks/DeleteConfirmationModal.vue";
import TaskService from "@/services/TaskService";
import { showSuccess, showError } from "@/plugins/toast";

export default {
  name: "TaskDashboard",
  components: {
    StatsCard,
    TaskSection,
    TaskModal,
    DeleteConfirmationModal,
  },
  data() {
    return {
      isLoading: false,
      showTaskModal: false,
      showDeleteModal: false,
      selectedTask: null,
      taskToDelete: null,
      myTasks: [],
    };
  },
  mounted() {
    this.fetchTasks();
  },
  computed: {
    /** Total number of tasks */
    totalTasks() {
      return this.myTasks.length;
    },
    /** Tasks marked as completed */
    completedTasks() {
      return this.myTasks.filter((task) => task.status === "completed").length;
    },
    /** Tasks marked as pending */
    pendingTasks() {
      return this.myTasks.filter((task) => task.status === "pending").length;
    },
    /** Calculated percentage of completed tasks */
    progressPercentage() {
      if (this.totalTasks === 0) return 0;
      return Math.round((this.completedTasks / this.totalTasks) * 100);
    },
  },

  methods: {
    /**
     * Toggle the status of a task between 'pending' and 'completed'.
     */
    async toggleTask(taskId) {
      const task = this.myTasks.find((t) => t.id === taskId);
      if (!task) return;

      const newStatus = task.status === "completed" ? "pending" : "completed";
      const updatedTask = await TaskService.updateTask(task.id, {
        ...task,
        status: newStatus,
      });

      const index = this.myTasks.findIndex((t) => t.id === taskId);
      if (index !== -1) {
        this.myTasks.splice(index, 1, updatedTask);
      }
    },

    /**
     * Fetch all tasks from the API and store them locally.
     */
    async fetchTasks() {
      try {
        this.isLoading = true;
        this.myTasks = await TaskService.getAllTasks();
      } catch (error) {
        showError(this.$t("messages.errors.get_tasks"));
      } finally {
        this.isLoading = false;
      }
    },

    openAddTaskModal() {
      this.selectedTask = null;
      this.showTaskModal = true;
    },

    openEditTaskModal(task) {
      this.selectedTask = task;
      this.showTaskModal = true;
    },

    closeTaskModal() {
      this.showTaskModal = false;
      this.selectedTask = null;
    },

    /**
     * Handle creation of a new task via TaskModal.
     */
    async addTask(taskData) {
      try {
        const newTask = await TaskService.createTask(taskData);
        this.myTasks.push(newTask);
        this.closeTaskModal();
        showSuccess(this.$t("messages.success.add_task"));
      } catch (error) {
        showError(error.message || this.$t("messages.errors.add_task"));
      }
    },

    /**
     * Handle task update logic from the TaskModal.
     */
    async updateTask(updatedTask) {
      try {
        const task = await TaskService.updateTask(updatedTask.id, updatedTask);
        const index = this.myTasks.findIndex((t) => t.id === task.id);
        if (index !== -1) this.myTasks.splice(index, 1, task);
        this.closeTaskModal();
        showSuccess(this.$t("messages.success.update_task"));
      } catch (error) {
        showError(error.message || this.$t("messages.errors.update_task"));
      }
    },

    openDeleteConfirmation(task) {
      this.taskToDelete = task;
      this.showDeleteModal = true;
    },

    closeDeleteModal() {
      this.showDeleteModal = false;
      this.taskToDelete = null;
    },

    /**
     * Handle confirmation of task deletion.
     */
    async confirmDelete() {
      if (this.taskToDelete) {
        try {
          await TaskService.deleteTask(this.taskToDelete.id);
          const index = this.myTasks.findIndex(
            (t) => t.id === this.taskToDelete.id
          );
          if (index !== -1) {
            this.myTasks.splice(index, 1);
          }
          showSuccess(this.$t("messages.success.delete_task"));
        } catch (error) {
          showError(error.message || this.$t("messages.errors.delete_task"));
        }
      }
      this.closeDeleteModal();
    },
  },
};
</script>
